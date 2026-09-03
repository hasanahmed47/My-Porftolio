import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";

import Header from "./components/Header.jsx";
import Cursor from "./components/Cursor.jsx";

import {
  useHowler,
} from "./hooks/useHowler";

import useMusic from "./hooks/useMusic";
import useClickSound from "./hooks/useClickSound";

import {
  usePreloader,
  hidePreloader,
} from "./hooks/usePreloader";

import Home from "./features/home/components/Home.jsx";
import HeaderHome from "./components/HeaderHome.jsx";

import Project from "./features/projects/components/Project.jsx";
import ProjectBackground from "./features/projects/components/ProjectBackground.jsx";

import {
  useRouteObserver,
} from "./hooks/useRouteObserver";

import {
  useProjectTransition,
} from "./hooks/useProjectTransition";

import {
  useScroll,
} from "./hooks/useScroll";

import "./App.css";

function App() {
  useHowler();
  useMusic();
  useClickSound();

  const {
    done: preloaderDone,
    visible: preloaderVisible,
  } = usePreloader();

  const {
    projectId,
    recentProjectId,
  } = useRouteObserver();

  const {
    isTransitioning,
  } =
    useProjectTransition(
      projectId
    );

  /*
   * Match the original Vue:
   *
   * projectVisible =
   * projectId !== null &&
   * !isTransitioning
   */
  const projectVisible =
    projectId !== null &&
    !isTransitioning;

  useScroll(
    isTransitioning
  );

  /*
   * Keep the current home scroll position,
   * but do not change the route animation
   * itself.
   */
  const homeScrollRef = useRef(
    typeof window !== "undefined"
      ? window.scrollY
      : 0
  );

  const prevProjectIdRef =
    useRef(projectId);

  if (
    projectId !== null &&
    prevProjectIdRef.current === null
  ) {
    if (typeof window !== "undefined") {
      homeScrollRef.current =
        window.scrollY;
    }
  }
  prevProjectIdRef.current = projectId;

  useLayoutEffect(() => {
    if (
      projectId === null &&
      homeScrollRef.current > 0
    ) {
      window.scrollTo(
        0,
        homeScrollRef.current
      );
    }
  }, [
    projectId,
  ]);

  useEffect(() => {
    if (!preloaderDone) {
      return;
    }

    hidePreloader(300);
  }, [
    preloaderDone,
  ]);

  return (
    <>
      <Header />

      <HeaderHome />

      <ProjectBackground
        projectId={
          projectId
        }
        recentProjectId={
          recentProjectId
        }
        isTransitioning={
          isTransitioning
        }
      />

      <div
        className={[
          "react-home-wrapper",

          projectId !== null
            ? "react-home-wrapper-hidden"
            : "",

          isTransitioning
            ? "react-home-wrapper-transitioning"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          top:
            projectId !== null
              ? `-${homeScrollRef.current}px`
              : "",

          "--scroll-y":
            `${homeScrollRef.current}px`,
        }}
      >
        <Home
          projectId={
            projectId
          }
          projectVisible={
            projectVisible
          }
          isTransitioning={
            isTransitioning
          }
          preloaderVisible={
            preloaderVisible
          }
        />
      </div>

      <div
        className={[
          "react-project-wrapper",

          projectVisible
            ? "react-project-wrapper-visible"
            : "",

          isTransitioning
            ? "react-project-wrapper-transitioning"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Project
          projectId={
            projectId
          }
          recentProjectId={
            recentProjectId
          }
          projectVisible={
            projectVisible
          }
          isTransitioning={
            isTransitioning
          }
        />
      </div>

      <Cursor />
    </>
  );
}

export default App;