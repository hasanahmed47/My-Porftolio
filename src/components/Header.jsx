import { useEffect, useState } from "react";

import Button from "./Button.jsx";
import Logo from "./Logo.jsx";
import ButtonRound from "./ButtonRound.jsx";
import ArrowRight from "./icons/ArrowRight.jsx";
import SoundsToggle from "./SoundsToggle.jsx";

import { lenis } from "../hooks/useScroll";
import { useRouteObserver } from "../hooks/useRouteObserver";
import useHeaderTheme from "../hooks/useHeaderTheme";
import { isFeatureEnabled } from "../utils/features";

import "./Header.scss";

function Header() {
  const {
    projectId,
    path,
  } = useRouteObserver();

  const [
    scrolledPastHeroVisible,
    setScrolledPastHeroVisible,
  ] = useState(false);

  const {
    isDarkTheme,
  } = useHeaderTheme();

  const [
    isFirstRoute,
    setIsFirstRoute,
  ] = useState(
    path === "/"
  );

  useEffect(() => {
    setIsFirstRoute(
      path === "/"
    );
  }, [path]);

  const handleBackClick = () => {
    if (isFirstRoute) {
      window.history.pushState(
        null,
        "",
        "/"
      );

      window.dispatchEvent(
        new Event("route-change")
      );

      return;
    }

    window.history.back();
  };

  const handleLogoClick = () => {
    if (!lenis?.value) {
      return;
    }

    lenis.value.scrollTo(0);
  };

  useEffect(() => {
    const updateScrolledState = () => {
      const aboutElement =
        document.querySelector(
          "#about"
        );

      if (!aboutElement) {
        setScrolledPastHeroVisible(
          false
        );
        return;
      }

      const rect =
        aboutElement.getBoundingClientRect();

      const isLandscape =
        window.matchMedia(
          "(orientation: landscape)"
        ).matches;

      const height =
        window.innerHeight;

      const hasScrolledIntoView =
        rect.top -
          (isLandscape
            ? height * 0.225
            : 0) <
        0;

      setScrolledPastHeroVisible(
        hasScrolledIntoView
      );
    };

    updateScrolledState();

    window.addEventListener(
      "resize",
      updateScrolledState
    );

    window.addEventListener(
      "scroll",
      updateScrolledState,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateScrolledState
      );

      window.removeEventListener(
        "scroll",
        updateScrolledState
      );
    };
  }, []);

  const headerClasses = [
    "header",
    isDarkTheme
      ? "header-dark"
      : "",
    scrolledPastHeroVisible
      ? "header-scrolled"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const getInTouchClasses = [
    "header-get-in-touch",
    projectId !== null
      ? "header-get-in-touch-isProjectPage"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header
      className={headerClasses}
    >
      <div className="header-left">
        {projectId !== null && (
          <ButtonRound
            variant="accent"
            onClick={handleBackClick}
            aria-label="Back to home"
            className={[
              "header-back",
              "header-back-isProjectPage",
            ].join(" ")}
            data-cursor="circle-white"
            data-sound="click"
            data-hoversound="hover"
          >
            <ArrowRight className="header-back-icon" />
          </ButtonRound>
        )}
      </div>

      <div
        className={[
          "header-logo",
          projectId !== null
            ? "header-logo-isProjectPage"
            : "",
          scrolledPastHeroVisible
            ? "header-logo-clickable"
            : "",
          "children-unclickable",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={
          handleLogoClick
        }
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            handleLogoClick();
          }
        }}
        data-sound="click"
        data-hoversound="hover"
        data-cursor="circle-white"
      >
        <Logo
          className="header-logo-image"
        />
      </div>

      <div className="header-right">
        <Button
          renderAs="a"
          variant="accent"
          className={getInTouchClasses}
          href="mailto:hasanmuhammad2004@gmail.com"
          aria-label="Get in touch"
          data-cursor="circle-white"
          data-hoversound="hover"
        >
          Get in touch
        </Button>

        {isFeatureEnabled(
          "sounds"
        ) && (
          <SoundsToggle
            className="header-sounds-toggle"
            isDarkTheme={
              isDarkTheme
            }
          />
        )}
      </div>
    </header>
  );
}

export default Header;
