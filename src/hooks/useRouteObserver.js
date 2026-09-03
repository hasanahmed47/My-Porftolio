import {
  useEffect,
  useSyncExternalStore,
} from "react";

const listeners = new Set();

let currentPath =
  typeof window !== "undefined"
    ? window.location.pathname
    : "/";

function getProjectId(pathname) {
  if (typeof pathname !== "string") {
    return null;
  }

  const match = pathname.match(
    /^\/project\/([^/]+)$/
  );

  return match ? match[1] : null;
}

let currentProjectId =
  getProjectId(currentPath);

let currentRecentProjectId =
  currentProjectId;

let snapshot = {
  path: currentPath,
  projectId: currentProjectId,
  recentProjectId:
    currentRecentProjectId,
};

let historyPatched = false;

function emit() {
  snapshot = {
    path: currentPath,
    projectId: currentProjectId,
    recentProjectId:
      currentRecentProjectId,
  };

  listeners.forEach((listener) => {
    listener();
  });
}

function updateRoute() {
  if (typeof window === "undefined") {
    return;
  }

  const newPath =
    window.location.pathname;

  const newProjectId =
    getProjectId(newPath);

  const newRecentProjectId =
    newProjectId ??
    currentRecentProjectId;

  if (
    newPath === currentPath &&
    newProjectId === currentProjectId &&
    newRecentProjectId ===
      currentRecentProjectId
  ) {
    return;
  }

  currentPath = newPath;
  currentProjectId = newProjectId;
  currentRecentProjectId =
    newRecentProjectId;

  emit();
}

function patchHistory() {
  if (
    historyPatched ||
    typeof window === "undefined"
  ) {
    return;
  }

  historyPatched = true;

  const originalPushState =
    window.history.pushState;

  const originalReplaceState =
    window.history.replaceState;

  window.history.pushState =
    function (...args) {
      originalPushState.apply(
        window.history,
        args
      );

      window.dispatchEvent(
        new Event("route-change")
      );
    };

  window.history.replaceState =
    function (...args) {
      originalReplaceState.apply(
        window.history,
        args
      );

      window.dispatchEvent(
        new Event("route-change")
      );
    };
}

function subscribe(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return snapshot;
}

let observerCount = 0;

export function useRouteObserver() {
  useEffect(() => {
    patchHistory();

    updateRoute();

    observerCount++;

    if (observerCount === 1) {
      window.addEventListener(
        "popstate",
        updateRoute
      );

      window.addEventListener(
        "route-change",
        updateRoute
      );
    }

    return () => {
      observerCount--;

      if (observerCount === 0) {
        window.removeEventListener(
          "popstate",
          updateRoute
        );

        window.removeEventListener(
          "route-change",
          updateRoute
        );
      }
    };
  }, []);

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

export function isProjectRoute(
  pathname
) {
  return (
    getProjectId(pathname) !== null
  );
}

export function getRouteState() {
  return snapshot;
}

/*
 * Compatibility export for non-React
 * modules that need to know whether
 * a project route is currently active.
 */
export const projectVisible = {
  get value() {
    return currentProjectId !== null;
  },
};