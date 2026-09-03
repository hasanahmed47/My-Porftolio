import {
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import {camera} from "../three/core/camera";

import {sizes} from "../utils/sizes";

import {
  sceneWeightsInOut,
} from "../animations/scenes";

import "./ProjectedElement.scss";


function ProjectedElement({
  point,
  children,
}) {
  const wrapperRef =
    useRef(null);

  const lastTransformRef =
    useRef("");


  useEffect(() => {
    const updatePosition =
      () => {
        const element =
          wrapperRef.current;


        if (!element) {
          return;
        }


        if (
          sceneWeightsInOut
            .about
            .in === 0
        ) {
          return;
        }


        if (
          sceneWeightsInOut
            .about
            .out === 1
        ) {
          return;
        }


        const isLandscape =
          sizes.isLandscape;


        const screenPos =
          isLandscape
            ? camera.project(
                point
              )
            : {
                x: 0,
                y: 0,
              };


        const transform =
          isLandscape
            ? `translate(${screenPos.x}px, ${screenPos.y}px)`
            : "translate(0px, 0px)";


        if (
          transform !==
          lastTransformRef.current
        ) {
          element.style.transform =
            transform;

          lastTransformRef.current =
            transform;
        }
      };


    gsap.ticker.add(
      updatePosition
    );


    return () => {
      gsap.ticker.remove(
        updatePosition
      );
    };
  }, [point]);


  return (
    <div
      ref={wrapperRef}
      className="projected-element"
    >
      {children}
    </div>
  );
}


export default ProjectedElement;