import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Link from "../../../components/Link.jsx";
import Notch from "../../../components/Notch.jsx";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.jsx";
import ButtonRound from "../../../components/ButtonRound.jsx";
import Plus from "../../../components/icons/Plus.jsx";

import { social } from "../../../content/social";

import "./PreviewCard.scss";

gsap.registerPlugin(ScrollTrigger);

function PreviewCard({ preview }) {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (
      !preview ||
      !wrapperRef.current ||
      !imageRef.current
    ) {
      return;
    }

    if (
      ScrollTrigger.isInViewport(
        wrapperRef.current
      )
    ) {
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top bottom",
      },
    });

    timeline.fromTo(
      wrapperRef.current,
      { scale: 0.8 },
      {
        scale: 1,
        duration: 0.4,
        ease: "power1.out",
      },
      0
    );

    timeline.fromTo(
      imageRef.current,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 0.4,
        ease: "power1.out",
      },
      0
    );

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
      timelineRef.current = null;
    };
  }, [preview]);

  if (preview) {
    return (
      <Link
        className="preview-card children-unclickable"
        to={`/project/${preview.slug}`}
        aria-label={`Switch to project ${preview.title}`}
        data-cursor="arrow"
        data-sound="click"
        data-hoversound="hover"
      >
        <div
          className="preview-card-top"
          ref={wrapperRef}
        >
          <div className="preview-card-image-wrapper">
            <div className="preview-card-image-container">
              <img
                src={preview.thumbnail}
                alt={preview.title}
                className="preview-card-image"
                ref={imageRef}
              />
            </div>
          </div>

          <div className="preview-card-overlay">
            <div className="preview-card-edge">
              <ButtonRound
                className="preview-card-button"
                variant="accent"
                renderAs="div"
              >
                <ArrowRightLong className="preview-card-button-arrow" />
              </ButtonRound>
            </div>

            <Notch className="preview-card-notch preview-card-notch-left" />
            <Notch className="preview-card-notch preview-card-notch-right" />
          </div>
        </div>

        <div className="preview-card-content">
          <div className="preview-card-copys">
            <h3 className="preview-card-title">
              {preview.title}
            </h3>

            <p className="preview-card-description">
              {preview.description}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      className="preview-card children-unclickable"
      data-cursor="arrow-external"
      data-hoversound="hover"
      external
      href={social[0]?.url ?? "#"}
    >
      <div className="preview-card-top preview-card-top-empty">
        <Plus className="preview-card-top-empty-icon" />
      </div>

      <div className="preview-card-content">
        <div className="preview-card-copys">
          <h3 className="preview-card-title">
            Start a new project
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default PreviewCard;