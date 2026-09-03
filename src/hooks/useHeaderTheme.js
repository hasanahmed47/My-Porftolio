import {
  useEffect,
  useState,
} from "react";

import {
  lenis,
} from "./useScroll";

import {
  sizes,
} from "../utils/sizes";

function getAboutElement() {
  if (
    typeof document ===
    "undefined"
  ) {
    return null;
  }

  return document.querySelector(
    "#about"
  );
}

function useHeaderTheme({
  onUpdate,
} = {}) {
  const [
    isDarkTheme,
    setIsDarkTheme,
  ] = useState(false);

  const [
    hasScrolledIntoView,
    setHasScrolledIntoView,
  ] = useState(false);

  useEffect(() => {
    let aboutElement =
      getAboutElement();

    let lenisInstance =
      null;

    let retryTimer =
      null;

    const handleScroll =
      () => {
        if (
          !aboutElement ||
          !document.body.contains(
            aboutElement
          )
        ) {
          aboutElement =
            getAboutElement();
        }

        if (
          !aboutElement
        ) {
          return;
        }

        const bounding =
          aboutElement.getBoundingClientRect();

        const isLandscape =
          sizes?.isLandscape ??
          window.matchMedia(
            "(orientation: landscape)"
          ).matches;

        const viewportHeight =
          sizes?.height ||
          window.innerHeight;

        const scrolledIntoView =
          bounding.top -
            (isLandscape
              ? viewportHeight *
                0.225
              : 0) <
          0;

        const scrolledPast =
          bounding.bottom - 36 <
          0;

        setHasScrolledIntoView(
          scrolledIntoView
        );

        setIsDarkTheme(
          scrolledIntoView &&
            !scrolledPast
        );

        onUpdate?.(
          aboutElement,
          bounding,
          scrolledIntoView
        );
      };

    const attachLenis =
      () => {
        const instance =
          lenis?.value;

        if (
          !instance
        ) {
          retryTimer =
            window.setTimeout(
              attachLenis,
              100
            );

          return;
        }

        if (
          lenisInstance ===
          instance
        ) {
          return;
        }

        if (
          lenisInstance
        ) {
          lenisInstance.off(
            "scroll",
            handleScroll
          );
        }

        lenisInstance =
          instance;

        lenisInstance.on(
          "scroll",
          handleScroll
        );

        handleScroll();
      };

    attachLenis();

    const resizeHandler =
      () => {
        aboutElement =
          getAboutElement();

        handleScroll();
      };

    window.addEventListener(
      "resize",
      resizeHandler
    );

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () => {
      if (
        retryTimer
      ) {
        clearTimeout(
          retryTimer
        );
      }

      if (
        lenisInstance
      ) {
        lenisInstance.off(
          "scroll",
          handleScroll
        );
      }

      window.removeEventListener(
        "resize",
        resizeHandler
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [
    onUpdate,
  ]);

  return {
    isDarkTheme,
    hasScrolledIntoView,
  };
}

export default useHeaderTheme;