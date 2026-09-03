import {useEffect,useRef,useState} from "react";
import gsap from "gsap";
import { BREAKPOINTS } from "../utils/sizes";

import "./AppearingText.css";

const FLICKER_CHARACTER_POOL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function randomChar() {
  return FLICKER_CHARACTER_POOL[
    Math.floor(
      Math.random() *
        FLICKER_CHARACTER_POOL.length
    )
  ];
}


function AppearingText({
  text,
  steps,
  duration,
  onTimelineCreated,
}) {
  const [
    displayText,
    setDisplayText,
  ] = useState("");


  const timelineRef =
    useRef(null);

  const matchMediaRef =
    useRef(null);

  const callbackRef =
    useRef(
      onTimelineCreated
    );


  useEffect(() => {
    callbackRef.current =
      onTimelineCreated;
  }, [
    onTimelineCreated,
  ]);


  useEffect(() => {
    if (
      !text ||
      typeof window ===
        "undefined"
    ) {
      return;
    }


    if (timelineRef.current) {
      timelineRef.current.kill();

      timelineRef.current =
        null;
    }


    if (matchMediaRef.current) {
      matchMediaRef.current.revert();

      matchMediaRef.current =
        null;
    }


    setDisplayText("");


    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    if (prefersReducedMotion) {
      const timeline =
        gsap.timeline({
          paused: true,
        });

      setDisplayText(text);

      timelineRef.current =
        timeline;

      callbackRef.current?.(
        timeline
      );

      return () => {
        timeline.kill();

        timelineRef.current =
          null;
      };
    }


    const matchMedia =
      gsap.matchMedia();

    matchMediaRef.current =
      matchMedia;


    matchMedia.add(
      {
        isMobile:
          `(max-width: ${
            BREAKPOINTS.md - 1
          }px)`,

        isDesktop:
          `(min-width: ${
            BREAKPOINTS.md
          }px)`,
      },

      (context) => {
        const {
          isMobile,
        } = context.conditions;


        const timeline =
          gsap.timeline({
            paused: true,
          });


        if (isMobile) {
          setDisplayText(text);
        } else {
          const totalLetters =
            text.length;

          const safeSteps =
            Math.max(
              1,
              steps
            );

          const totalSteps =
            Math.ceil(
              totalLetters /
                safeSteps
            );

          const durationPerStep =
            duration /
            Math.max(
              1,
              totalSteps
            );


          for (
            let step = 0;
            step < totalSteps;
            step++
          ) {
            const startIndex =
              step *
              safeSteps;


            const progress = {
              value: 0,
            };


            timeline.to(
              progress,
              {
                value: 1,

                duration:
                  durationPerStep,

                ease: "none",

                onUpdate: () => {
                  const revealed =
                    text.slice(
                      0,
                      startIndex
                    );


                  const remaining =
                    totalLetters -
                    startIndex;


                  const flickerLength =
                    Math.min(
                      safeSteps,
                      remaining
                    );


                  const flicker =
                    Array(
                      flickerLength
                    )
                      .fill(null)
                      .map(
                        randomChar
                      )
                      .join("");


                  setDisplayText(
                    revealed +
                      flicker
                  );
                },

                onComplete: () => {
                  setDisplayText(
                    text
                  );
                },
              }
            );
          }
        }


        timelineRef.current =
          timeline;


        callbackRef.current?.(
          timeline
        );


        return () => {
          timeline.kill();
        };
      }
    );


    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();

        timelineRef.current =
          null;
      }


      if (matchMediaRef.current) {
        matchMediaRef.current.revert();

        matchMediaRef.current =
          null;
      }
    };
  }, [
    text,
    steps,
    duration,
  ]);


  return (
    <span className="appearing-text">

      <span className="appearing-text-value">
        {displayText}
      </span>


      <span
        className="appearing-text-clone"
        aria-hidden="true"
      >
        {text}
      </span>

    </span>
  );
}


export default AppearingText;