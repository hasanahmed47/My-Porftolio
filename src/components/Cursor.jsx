import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { lerp } from "../utils/math";
import { useRouteObserver } from "../hooks/useRouteObserver";
import { raycast } from "../three/utils/raycast";



import "./Cursor.css";

function ArrowRightLong({ className = "" }) {
  return (
    <svg
      className={className}
      overflow="visible"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M164 48L244 126.709M244 126.709L164 207M244 126.709H12"
        stroke="var(--icon-color)"
        strokeWidth="var(--stroke-lg)"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cursor() {
  const cursorWrapperRef = useRef(null);
  const cursorScaleRef = useRef(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const currentX = useRef(0);
  const currentY = useRef(0);

  const isVisible = useRef(false);
  const cursorType = useRef(null);
  const detectedType = useRef(null);

  const [, forceRender] = useState(0);

  const {
    path,
    projectId,
  } = useRouteObserver();

  const lerpSpeed = 0.1;


  const getCursorAttribute = (element) => {
    if (!element) return null;

    if (element instanceof HTMLElement) {
      const cursor =
        element.dataset.cursor;

      if (
        cursor === "circle-black" ||
        cursor === "arrow" ||
        cursor === "arrow-external" ||
        cursor === "circle-white"
      ) {
        return cursor;
      }
    }

    return getCursorAttribute(
      element.parentElement
    );
  };


  const handleMouseMove = (event) => {
    mouseX.current =
      event.clientX;

    mouseY.current =
      event.clientY;

    detectedType.current =
      getCursorAttribute(
        event.target
      );
  };


  useEffect(() => {
    mouseX.current =
      window.innerWidth / 2;

    mouseY.current =
      window.innerHeight / 2;

    currentX.current =
      mouseX.current;

    currentY.current =
      mouseY.current;


    const tick = () => {
      currentX.current = lerp(
        currentX.current,
        mouseX.current,
        lerpSpeed
      );

      currentY.current = lerp(
        currentY.current,
        mouseY.current,
        lerpSpeed
      );


      const hoveringBox =
        raycast.getHoveringBox();


      if (hoveringBox) {
        if (!isVisible.current) {
          isVisible.current = true;

          currentX.current =
            mouseX.current;

          currentY.current =
            mouseY.current;
        }

        cursorType.current =
          "circle-black";

      } else if (
        detectedType.current
      ) {
        if (!isVisible.current) {
          isVisible.current = true;

          currentX.current =
            mouseX.current;

          currentY.current =
            mouseY.current;
        }

        cursorType.current =
          detectedType.current;

      } else {
        isVisible.current = false;

        cursorType.current = null;
      }


      if (
        cursorWrapperRef.current
      ) {
        cursorWrapperRef.current.style.transform =
          `translate(${currentX.current}px, ${currentY.current}px)`;
      }


      if (
        cursorScaleRef.current
      ) {
        const scale =
          isVisible.current
            ? 1
            : 0;

        cursorScaleRef.current.style.transform =
          `scale(${scale})`;
      }


      forceRender(
        (value) => value + 1
      );
    };


    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    gsap.ticker.add(tick);


    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      gsap.ticker.remove(tick);
    };
  }, []);


  /*
   * Reset cursor when route changes.
   */
  useEffect(() => {
    isVisible.current = false;
    cursorType.current = null;
  }, [path]);


  const activeType =
    cursorType.current;


  return (
    <div
      ref={cursorWrapperRef}
      className={[
        "cursor-wrapper",
        projectId !== null
          ? `project-${projectId}`
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        ref={cursorScaleRef}
        className="cursor-scale"
      >

        <div
          className={[
            "cursor",
            "cursor-circle-black",
            activeType ===
            "circle-black"
              ? "cursor-active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />

        <div
          className={[
            "cursor",
            "cursor-circle-white",
            activeType ===
            "circle-white"
              ? "cursor-active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />

        <div
          className={[
            "cursor",
            "cursor-arrow",
            activeType === "arrow"
              ? "cursor-active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ArrowRightLong
            className="cursor-arrow-icon"
          />
        </div>

        <div
          className={[
            "cursor",
            "cursor-arrow-external",
            activeType ===
            "arrow-external"
              ? "cursor-active"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <ArrowRightLong
            className="cursor-arrow-external-icon"
          />
        </div>

      </div>
    </div>
  );
}


export default Cursor;