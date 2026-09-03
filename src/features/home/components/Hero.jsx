import Banner from "../../../components/Banner.jsx";

import {
  usePreloader,
} from "../../../hooks/usePreloader";

import "./Hero.css";


function Hero({
  className = "",
  id,
}) {
  const {
    visible: isPreloaderVisible,
  } = usePreloader();


  return (
    <div
      id={id}
      className={[
        "hero",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <div className="hero-content grid">

        <div
          className="hero-content-inner"
          id="hero-content-inner"
        >

          <div className="hero-content-copys">

            <h1 className="hero-title">
              HASAN
              <br />
              Ahmed
            </h1>


            {!isPreloaderVisible && (
              <Banner
                className="hero-banner"
                copy="Web Developer"
                animated
              />
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


export default Hero;