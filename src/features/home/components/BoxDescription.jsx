import {
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

import { BREAKPOINTS } from "../../../utils/sizes";

import { Vector3 } from "three";

import ProjectedElement from "../../../components/ProjectedElement.jsx";
import AppearingText from "../../../components/AppearingText.jsx";
import PinIcon from "../../../components/icons/Pin.jsx";

import "./BoxDescription.css";


const point =
  new Vector3(
    -0.9,
    2,
    6.75
  );


function BoxDescription({
  onTimelineCreated,
}) {
  const wrapperRef =
    useRef(null);

  const timelinesRef =
    useRef([]);

  const matchMediaRef =
    useRef(null);


  const handleTimelineCreated =
    (timeline, delay) => {
      timelinesRef.current = [
        ...timelinesRef.current,
        {
          timeline,
          delay,
        },
      ];

      // Re-run responsive setup when
      // AppearingText creates its timeline.
      setTimelineVersion(
        (value) => value + 1
      );
    };


  const [
    timelineVersion,
    setTimelineVersion,
  ] = useState(0);


  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }


    if (matchMediaRef.current) {
      matchMediaRef.current.revert();
      matchMediaRef.current =
        null;
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


        if (!isMobile) {
          timeline.fromTo(
            wrapperRef.current,

            {
              clipPath:
                "inset(0% 0% 0% 100%)",
            },

            {
              clipPath:
                "inset(0% 0% 0% 0%)",

              duration: 0.3,

              ease: "none",
            },

            0
          );
        } else {
          gsap.set(
            wrapperRef.current,

            {
              clipPath:
                "inset(0% 0% 0% 0%)",
            }
          );
        }


        timelinesRef.current.forEach(
          (item) => {
            if (!item?.timeline) {
              return;
            }


            timeline.add(
              () => {
                item.timeline.restart(
                  true
                );
              },

              item.delay + 0.15
            );
          }
        );


        onTimelineCreated?.(
          timeline
        );


        return () => {
          timeline.kill();
        };
      }
    );


    return () => {
      if (matchMediaRef.current) {
        matchMediaRef.current.revert();

        matchMediaRef.current =
          null;
      }
    };
  }, [
    onTimelineCreated,
    timelineVersion,
  ]);


  return (
    <ProjectedElement
      point={point}
    >

      <div
        ref={wrapperRef}
        className="box-description"
      >

        <div className="box-description-content">

          <div className="box-description-details">

            <p className="box-description-details-name">
              Hasan
            </p>


            <div className="box-description-details-location">

              <PinIcon
                className="
                  box-description-details-location-icon
                "
              />

              <p className="
                box-description-details-location-copy
              ">
                Karachi
              </p>

            </div>

          </div>


          <div className="
            box-description-line
          " />


          <div className="
            box-description-copy
          ">

            <AppearingText
              text="Builds interactive 3D experiences and real-time systems that are fast, responsive, and fun to use."
              steps={3}
              duration={0.7}
              onTimelineCreated={(
                timeline
              ) =>
                handleTimelineCreated(
                  timeline,
                  0
                )
              }
            />

          </div>

        </div>

      </div>

    </ProjectedElement>
  );
}


export default BoxDescription;