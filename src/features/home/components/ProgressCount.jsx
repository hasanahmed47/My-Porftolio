import { useEffect, useState } from "react";
import gsap from "gsap";

import {
  aboutProgress,
} from "../../../animations/transitions/about";

import "./ProgressCount.css";


function ProgressCount() {
  const [
    progressPercentage,
    setProgressPercentage,
  ] = useState(0);


  useEffect(() => {
    const tick = () => {
      const newValue =
        Math.round(
          aboutProgress.value * 1000
        ) / 10;

      setProgressPercentage(
        (current) =>
          current === newValue
            ? current
            : newValue
      );
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);


  return (
    <div className="progress-count grid">

      <div className="progress-count-bar">

        <div
          className="progress-count-bar-fill"
          style={{
            width:
              `${progressPercentage}%`,
          }}
        />

      </div>


      <p className="progress-count-percentage">
        {Math.round(
          progressPercentage
        )}
        %
      </p>

    </div>
  );
}

export default ProgressCount;