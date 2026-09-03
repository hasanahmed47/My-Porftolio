import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import AppearingText from "../../../components/AppearingText.jsx";
import ProjectedElement from "../../../components/ProjectedElement.jsx";
import PinIcon from "../../../components/icons/Pin.jsx";

import { BREAKPOINTS } from "../../../utils/sizes";

import { Vector3 } from "three";

import "./BoxDetails.css";


const point =
  new Vector3(
    -0.76,
    3.6,
    6.75
  );


function BoxDetails({
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
    };


  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }


    if (matchMediaRef.current) {
      matchMediaRef.current.revert();
      matchMediaRef.current = null;
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

        isLandscape:
          `(min-aspect-ratio: 1)`,
      },

      (context) => {
        const {
          isLandscape,
        } = context.conditions;


        const timeline =
          gsap.timeline({
            paused: true,
          });


        if (isLandscape) {
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


        if (isLandscape) {
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
                item.delay + 0.25
              );
            }
          );
        }


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
  }, [onTimelineCreated]);


  return (
    <ProjectedElement point={point}>

      <div
        ref={wrapperRef}
        className="box-details"
      >

        <div className="box-details-content">

          <div className="box-details-title">

            <AppearingText
              text="Hasan"
              steps={1}
              duration={0.35}
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


          <div className="box-details-items">

            <div className="box-details-item">

              <PinIcon
                className="box-details-icon"
              />

              <AppearingText
                text="Karachi"
                steps={3}
                duration={0.35}
                onTimelineCreated={(
                  timeline
                ) =>
                  handleTimelineCreated(
                    timeline,
                    0.1
                  )
                }
              />

            </div>

          </div>

        </div>

      </div>

    </ProjectedElement>
  );
}

export default BoxDetails;