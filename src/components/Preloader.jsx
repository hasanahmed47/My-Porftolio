import {
  useEffect,
  useState,
} from "react";

import {
  hidePreloader,
  usePreloader,
} from "../hooks/usePreloader";

import "./Preloader.scss";

function Preloader() {
  const {
    percent,
    done,
    visible,
  } = usePreloader();

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const [
    clicked,
    setClicked,
  ] = useState(false);

  useEffect(() => {
    if (!done) {
      return;
    }

    let timer1;
    let timer2;
    let timer3;

    timer1 = window.setTimeout(() => {
      setLoaded(true);

      timer2 = window.setTimeout(() => {
        setClicked(true);

        timer3 = window.setTimeout(() => {
          hidePreloader(0);
        }, 900);
      }, 1000);
    }, 600);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
    };
  }, [done]);

  const handleMouseMove = (
    event
  ) => {
    const target =
      event.currentTarget;

    const rect =
      target.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const y =
      event.clientY -
      rect.top;

    target.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    target.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="preloader-hasan">
      <div className="loading-header">
        <a
          href="/#"
          className="loader-title"
        >
          HASAN AHMED
        </a>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee">
          {/* Two identical copies for seamless infinite loop */}
          <div className="loading-marquee-inner">
            {/* Copy 1 */}
            <span>A CREATIVE DESIGNER</span>
            <span className="marquee-dot">·</span>
            <span>A CREATIVE DEVELOPER</span>
            <span className="marquee-dot">·</span>
            <span>A CREATIVE DESIGNER</span>
            <span className="marquee-dot">·</span>
            <span>A CREATIVE DEVELOPER</span>
            <span className="marquee-dot">·</span>
            {/* Copy 2 — exact duplicate for seamless loop */}
            <span>A CREATIVE DESIGNER</span>
            <span className="marquee-dot">·</span>
            <span>A CREATIVE DEVELOPER</span>
            <span className="marquee-dot">·</span>
            <span>A CREATIVE DESIGNER</span>
            <span className="marquee-dot">·</span>
            <span>A CREATIVE DEVELOPER</span>
            <span className="marquee-dot">·</span>
          </div>
        </div>

        <div
          className={[
            "loading-wrap",
            clicked
              ? "loading-clicked"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onMouseMove={
            handleMouseMove
          }
        >
          <div className="loading-hover" />

          <div
            className={[
              "loading-button",
              loaded
                ? "loading-complete"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading{" "}
                  <span>
                    {percent}%
                  </span>
                </div>
              </div>

              <div className="loading-box" />
            </div>

            <div className="loading-content2">
              <span>
                Welcome
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
