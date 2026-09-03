import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import Notch from "../../../components/Notch.jsx";

import "./Media.css";

function Media({
  type,
  src,
  alt,
  caption,
}) {
  const wrapperRef =
    useRef(null);

  const mediaRef =
    useRef(null);

  const mediaContentRef =
    useRef(null);

  useEffect(() => {
    if (
      !wrapperRef.current ||
      !mediaContentRef.current ||
      !mediaRef.current
    ) {
      return;
    }

    const timeline =
      gsap.timeline({
        scrollTrigger: {
          trigger:
            wrapperRef.current,

          start:
            "top bottom",

          end:
            "bottom bottom",

          toggleActions:
            "play none none reset",
        },
      });

    timeline.fromTo(
      mediaContentRef.current,
      {
        scale: 0.8,
      },
      {
        scale: 1,
        duration: 0.4,
        ease:
          "power1.out",
      },
      0
    );

    timeline.fromTo(
      mediaRef.current,
      {
        scale: 1.2,
      },
      {
        scale: 1,
        duration: 0.4,
        ease:
          "power1.out",
      },
      0
    );

    return () => {
      timeline.kill();

      const mediaContent =
        mediaContentRef.current;

      const media =
        mediaRef.current;

      if (mediaContent) {
        gsap.set(
          mediaContent,
          {
            scale: 1,
          }
        );
      }

      if (media) {
        gsap.set(
          media,
          {
            scale: 1,
          }
        );
      }
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="project-media"
    >
      <div
        ref={mediaContentRef}
        className="
          project-media-content
        "
      >
        {type === "image" ? (
          <img
            ref={mediaRef}
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            fetchPriority="high"
            className="
              project-media-image
            "
          />
        ) : (
          <video
            ref={mediaRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
              project-media-video
            "
          >
            <source
              src={src}
              type="video/mp4"
            />
          </video>
        )}
      </div>

      {caption && (
        <div
          className="
            project-media-caption
          "
        >
          <Notch
            className="
              project-media-caption-notch
              project-media-caption-notch-left
            "
          />

          <Notch
            className="
              project-media-caption-notch
              project-media-caption-notch-top
            "
          />

          <p
            className="
              project-media-caption-copy
            "
          >
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

export default Media;
