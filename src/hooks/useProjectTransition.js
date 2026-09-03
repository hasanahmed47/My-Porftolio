import {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";

export const ROUTE_TRANSITION_DURATION =
  500;

let transitionValue =
  false;

export const isTransitioning = {
  get value() {
    return transitionValue;
  },
};

export function useProjectTransition(
  projectId
) {
  const [
    transitioning,
    setTransitioning,
  ] = useState(false);

  const previousProjectIdRef =
    useRef(projectId);

  const timeoutRef =
    useRef(null);

  useLayoutEffect(() => {
    if (
      typeof projectId ===
      "undefined"
    ) {
      return;
    }

    const previousProjectId =
      previousProjectIdRef.current;

    const entering =
      previousProjectId ===
        null &&
      projectId !== null;

    const leaving =
      previousProjectId !==
        null &&
      projectId === null;

    previousProjectIdRef.current =
      projectId;

    /*
     * Project -> Project:
     *
     * Do NOT run the route transition.
     * This preserves the behavior that
     * is already working for Next Project.
     */
    if (
      !entering &&
      !leaving
    ) {
      return;
    }

    if (
      timeoutRef.current !==
      null
    ) {
      window.clearTimeout(
        timeoutRef.current
      );

      timeoutRef.current =
        null;
    }

    /*
     * IMPORTANT:
     *
     * useLayoutEffect runs before the browser
     * paints the route change.
     *
     * That prevents the one-frame flicker
     * that was happening with useEffect().
     */
    transitionValue =
      true;

    setTransitioning(
      true
    );

    /*
     * Stamp the project id on <html> immediately
     * so the CSS background rule for that project
     * is active before the first paint.
     *
     * This sits below z-index 47 (the curtain) so
     * it never blocks the slide animation, but it
     * ensures there is no white <body> visible when
     * the curtain finishes lifting on dark projects.
     *
     * On entering: set the incoming project id.
     * On leaving:  clear it once the transition ends
     *              so the home-page styles resume.
     */
    if (entering && projectId) {
      document.documentElement.setAttribute(
        "data-project",
        projectId
      );
    }

    timeoutRef.current =
      window.setTimeout(
        () => {
          transitionValue =
            false;

          setTransitioning(
            false
          );

          timeoutRef.current =
            null;

          if (leaving) {
            document.documentElement.removeAttribute(
              "data-project"
            );
          }
        },
        ROUTE_TRANSITION_DURATION
      );
  }, [
    projectId,
  ]);

  useEffect(() => {
    return () => {
      if (
        timeoutRef.current !==
        null
      ) {
        window.clearTimeout(
          timeoutRef.current
        );

        timeoutRef.current =
          null;
      }

      transitionValue =
        false;
    };
  }, []);

  return {
    isTransitioning:
      transitioning,
  };
}

export default useProjectTransition;
