import {
  useEffect,
  useState,
} from "react";

import gsap from "gsap";

import SwipeUp from "./icons/SwipeUp.jsx";
import ArrowRight from "./icons/ArrowRight.jsx";

import {
  lenis,
} from "../hooks/useScroll";

import {
  useRouteObserver,
} from "../hooks/useRouteObserver";

import "./ScrollIcon.scss";


function ScrollIcon() {
  const [
    hasScrolled,
    setHasScrolled,
  ] = useState(false);


  const [
    isTouchDevice,
    setIsTouchDevice,
  ] = useState(false);


  const {
    projectId,
  } =
    useRouteObserver();


  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia(
        "(pointer: coarse)"
      ).matches;


    setIsTouchDevice(
      touch
    );
  }, []);


  useEffect(() => {
    if (
      hasScrolled
    ) {
      return;
    }


    const tick =
      () => {
        if (
          projectId !== null
        ) {
          return;
        }


        if (
          lenis?.value
            ?.isScrolling
        ) {
          setHasScrolled(
            true
          );
        }
      };


    gsap.ticker.add(
      tick
    );


    return () => {
      gsap.ticker.remove(
        tick
      );
    };
  }, [
    hasScrolled,
    projectId,
  ]);


  if (
    hasScrolled ||
    projectId !== null
  ) {
    return null;
  }


  return (
    <div
      className="
        scroll-icon
      "
    >

      {isTouchDevice ? (
        <SwipeUp
          className="
            scroll-icon-swipe-up
          "
        />
      ) : (
        <div
          className="
            scroll-icon-pointer
          "
        >

          <div
            className="
              scroll-icon-mouse
            "
          >
            <div
              className="
                scroll-icon-mouse-dot
              "
            />
          </div>


          <ArrowRight
            className="
              scroll-icon-arrow
            "
          />

        </div>
      )}

    </div>
  );
}


export default ScrollIcon;