import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import AppearingText from "./AppearingText.jsx";

import "./Banner.scss";


function Banner({
  copy,
  size = "md",
  animated = false,
  className = "",
}) {
  const bannerRef =
    useRef(null);

  const backgroundRef =
    useRef(null);

  const appearingTimelineRef =
    useRef(null);


  useEffect(() => {
    if (
      !animated ||
      !copy ||
      !bannerRef.current ||
      !backgroundRef.current ||
      !appearingTimelineRef.current
    ) {
      return;
    }


    const timeline =
      gsap.timeline({
        scrollTrigger: {
          trigger:
            bannerRef.current,

          start:
            "top bottom",

          end:
            "bottom top",
        },

        onStart: () => {
          appearingTimelineRef.current?.play();
        },
      });


    const progress = {
      value: 0,
    };


    const duration = 0.6;


    timeline.to(
      progress,
      {
        value: 1,

        duration,
      },
      0
    );


    const textDuration =
      appearingTimelineRef.current.duration();


    gsap.set(
      backgroundRef.current,
      {
        scaleX: 0,
      }
    );


    timeline.fromTo(
      backgroundRef.current,

      {
        scaleX: 0,
      },

      {
        scaleX: 1,

        duration:
          textDuration,

        ease:
          "power2.out",
      },

      0
    );


    return () => {
      timeline.kill();
    };
  }, [
    animated,
    copy,
  ]);


  return (
    <div
      ref={bannerRef}
      className={[
        "banner",

        `banner-size-${size}`,

        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <div
        ref={backgroundRef}
        className="banner-background"
      />


      <div
        className={[
          "banner-copy",

          `banner-copy-size-${size}`,
        ].join(" ")}
      >

        {animated ? (
          <AppearingText
            text={copy}
            steps={2}
            duration={0.6}
            onTimelineCreated={(
              timeline
            ) => {
              appearingTimelineRef.current =
                timeline;
            }}
          />
        ) : (
          <p className="banner-copy-value">
            {copy}
          </p>
        )}

      </div>

    </div>
  );
}


export default Banner;