
import {
  useEffect,
  useSyncExternalStore,
} from "react";

import {
  resources,
} from "../utils/resources";

const listeners = new Set();

let progress = 0;
let percent = 0;
let done = false;
let visible = true;

let initialized = false;
let cleanupResources = null;

let snapshot = {
  progress,
  percent,
  done,
  visible,
};

function updateSnapshot() {
  snapshot = {
    progress,
    percent,
    done,
    visible,
  };
}

function emit() {
  updateSnapshot();

  listeners.forEach(
    (listener) => {
      listener();
    }
  );
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

function setupPreloader() {
  if (initialized) {
    return;
  }

  initialized = true;

  const handleProgress = (
    value
  ) => {
    const safeValue =
      Math.min(
        1,
        Math.max(
          0,
          Number(value) || 0
        )
      );

    progress = Math.min(
      1,
      0.25 +
        safeValue * 0.75
    );

    percent = Math.round(
      progress * 100
    );

    if (progress >= 0.999) {
      progress = 1;
      percent = 100;
      done = true;
    }

    emit();
  };

  resources.on(
    "progress",
    handleProgress
  );

  cleanupResources =
    () => {
      if (
        typeof resources.off ===
        "function"
      ) {
        resources.off(
          "progress",
          handleProgress
        );
      }

      cleanupResources =
        null;

      initialized = false;
    };
}

export function usePreloader() {
  useEffect(() => {
    setupPreloader();

    return () => {
      cleanupResources?.();
    };
  }, []);

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

export function hidePreloader(
  delay = 300
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  window.setTimeout(() => {
    document.body.classList.remove(
      "is-loading"
    );

    const preloader =
      document.querySelector(
        ".preloader"
      );

    if (preloader) {
      preloader.classList.add(
        "preloader-hidden"
      );
    }

    visible = false;

    emit();
  }, delay);
}

export function getPreloaderState() {
  return snapshot;
}
