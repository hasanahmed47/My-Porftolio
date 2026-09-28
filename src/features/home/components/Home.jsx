import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import Layout from "../../../components/Layout.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Projects from "./Projects.jsx";
import Contact from "./Contact.jsx";
import Footer from "../../../components/Footer.jsx";
import ScrollIcon from "../../../components/ScrollIcon.jsx";

import {
  three,
} from "../../../three";

import {
  animations,
  transitions,
} from "../../../animations";

import {
  animations as avatarAnimations,
} from "../../../three/objects/avatar/animations";

import {
  raycast,
} from "../../../three/utils/raycast";

import {
  renderer,
} from "../../../three/core/renderer";

import "./Home.css";

function Home({
  projectId,
  projectVisible,
  isTransitioning,
  preloaderVisible,
}) {
  const introRef =
    useRef(null);

  const stickyObserverRef =
    useRef(null);

  const threeCanvasRef =
    useRef(null);

  const aboutSpacerRef =
    useRef(null);

  const contactRef =
    useRef(null);

  const threeInitializedRef =
    useRef(false);

  const hoveringObject3DRef =
    useRef(false);

  const [
    scrolledPastIntro,
    setScrolledPastIntro,
  ] = useState(false);

  const [
    projectsLoaded,
    setProjectsLoaded,
  ] = useState(false);

  const [
    contactBottom,
    setContactBottom,
  ] = useState(0);

  const currentProjectId =
    projectId ?? null;

  const currentProjectVisible =
    Boolean(
      projectVisible
    );

  const currentTransitioning =
    Boolean(
      isTransitioning
    );

  const currentPreloaderVisible =
    Boolean(
      preloaderVisible
    );

  const isStickyVisible =
    scrolledPastIntro ||
    !projectsLoaded;

  const updateContactBottomOffset =
    useCallback(() => {
      if (!contactRef.current) {
        return;
      }

      const bounding =
        contactRef.current.getBoundingClientRect();

      const documentBottom =
        document.documentElement
          .scrollHeight;

      const elementBottom =
        bounding.bottom +
        window.scrollY;

      setContactBottom(
        documentBottom -
          elementBottom
      );
    }, []);

  const handleProjectsLoaded =
    useCallback(() => {
      setProjectsLoaded(
        true
      );
    }, []);

  useEffect(() => {
    if (!introRef.current) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          setScrolledPastIntro(
            entries[0]
              ?.isIntersecting ??
              false
          );
        }
      );

    observer.observe(
      introRef.current
    );

    stickyObserverRef.current =
      observer;

    return () => {
      observer.disconnect();

      stickyObserverRef.current =
        null;
    };
  }, []);

  useEffect(() => {
    if (
      !threeCanvasRef.current ||
      threeInitializedRef.current
    ) {
      return;
    }

    three.init(
      threeCanvasRef.current
    );

    threeInitializedRef.current =
      true;

    return () => {
      three.destroy();

      threeInitializedRef.current =
        false;
    };
  }, []);

  useEffect(() => {
    const updateCursor =
      () => {
        const isTouch =
          window.matchMedia(
            "(pointer: coarse)"
          ).matches ||
          "ontouchstart" in
            window ||
          navigator.maxTouchPoints >
            0;

        if (isTouch) {
          return;
        }

        const hoveringBox =
          raycast.getHoveringBox();

        const shouldBePointer =
          Boolean(
            hoveringBox
          );

        if (
          shouldBePointer !==
          hoveringObject3DRef.current
        ) {
          hoveringObject3DRef.current =
            shouldBePointer;

          document.documentElement.style.cursor =
            shouldBePointer
              ? "pointer"
              : "";
        }
      };

    gsap.ticker.add(
      updateCursor
    );

    return () => {
      gsap.ticker.remove(
        updateCursor
      );

      document.documentElement.style.cursor =
        "";
    };
  }, []);

  useEffect(() => {
    if (
      !contactRef.current ||
      currentPreloaderVisible
    ) {
      return;
    }

    const resizeObserver =
      new ResizeObserver(
        updateContactBottomOffset
      );

    resizeObserver.observe(
      contactRef.current
    );

    updateContactBottomOffset();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    currentPreloaderVisible,
    updateContactBottomOffset,
  ]);

  useEffect(() => {
    renderer.setIsActive(
      !currentProjectVisible
    );

    if (
      !currentProjectVisible
    ) {
      updateContactBottomOffset();
    }
  }, [
    currentProjectVisible,
    updateContactBottomOffset,
  ]);

  useEffect(() => {
    if (!currentTransitioning) {
      updateContactBottomOffset();
    }
  }, [
    currentTransitioning,
    updateContactBottomOffset,
  ]);

  // When the user returns from a project page:
  // 1. The wakeUp ScrollTrigger was spent while they scrolled
  //    inside the project (scroll is shared, URL guard blocked wakeUp
  //    but the one-shot trigger is consumed and will never fire again).
  // 2. We need to: reset sleeping state, reset isAwake flag, and
  //    rebuild the contact ScrollTriggers so wakeUp fires correctly
  //    the next time the user scrolls into the contact section.
  // We watch projectId (not projectVisible) so we act only when the
  // full exit is done and the scroll has been restored by useLayoutEffect.
  const prevProjectIdRef = useRef(currentProjectId);
  useEffect(() => {
    const wasOnProject = prevProjectIdRef.current !== null;
    prevProjectIdRef.current = currentProjectId;

    // Only handle the project → home transition
    if (wasOnProject && currentProjectId === null && contactRef.current) {
      // rAF ensures the browser has processed the restored scroll
      // position before we build the new ScrollTrigger, so GSAP
      // evaluates it against the real scroll, not stale values.
      requestAnimationFrame(() => {
        avatarAnimations.resetContactState();
        transitions.contact.destroy();
        transitions.contact.setup(contactRef.current);
      });
    }
  }, [currentProjectId]);

  useEffect(() => {
    if (
      !projectsLoaded ||
      !threeInitializedRef.current ||
      currentPreloaderVisible
    ) {
      return;
    }

    animations.init();

    return () => {
      animations.destroy();
    };
  }, [
    projectsLoaded,
    currentPreloaderVisible,
  ]);

  useEffect(() => {
    return () => {
      animations.destroy();

      document.documentElement.style.cursor =
        "";
    };
  }, []);

  const homeClassName = [
    "home-wrapper",

    currentProjectId !== null &&
    currentTransitioning
      ? "home-wrapper-out"
      : "",

    currentProjectId === null &&
    currentTransitioning
      ? "home-wrapper-in"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={homeClassName}
    >
      <ScrollIcon />

      <Layout>
        <div
          ref={introRef}
          className="intro-wrapper"
        >
          <div
            className={[
              "intro-sticky",
              isStickyVisible
                ? "intro-sticky-visible"
                : "",
            ].join(" ")}
            style={{
              "--contact-bottom":
                `${contactBottom}px`,
            }}
          >
            <canvas
              ref={
                threeCanvasRef
              }
              className={[
                "three-canvas",
                !isStickyVisible
                  ? "three-canvas-contact"
                  : "",
              ].join(" ")}
            />

            <div
              className={
                !isStickyVisible
                  ? "intro-about-hidden"
                  : ""
              }
            >
              <About
                spacerRef={
                  aboutSpacerRef
                }
              />
            </div>
          </div>

          <Hero
            className="intro-hero"
          />

          <div className="intro-wrapper-spacer" />

          <div
            ref={
              aboutSpacerRef
            }
            id="about"
            className="about-spacer"
          />
        </div>

        <Projects
          id="projects"
          onLoaded={
            handleProjectsLoaded
          }
        />

        <div
          ref={contactRef}
          className="home-contact"
        >
          {projectsLoaded && (
            <Contact />
          )}
        </div>

        <Footer
          withSocial={false}
        />
      </Layout>
    </div>
  );
}

export default Home;
