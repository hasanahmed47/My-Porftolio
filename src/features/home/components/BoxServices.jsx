import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import AppearingText from "../../../components/AppearingText.jsx";
import ProjectedElement from "../../../components/ProjectedElement.jsx";

import { BREAKPOINTS } from "../../../utils/sizes";

import { Vector3 } from "three";

import "./BoxServices.css";


const point =
  new Vector3(
    0.75,
    2.75,
    6.75
  );


const services = [
  {
    name: "Three.js & WebGL",
  },
  {
    name: "Node.js",
  },
  {
    name: "React & Next.js",
  },
  {
    name: "MongoDB & Redis",
  },
  {
    name: "express.js",
  },
];


function BoxServices({
  onTimelineCreated,
}) {
  const wrapperRef =
    useRef(null);

  const timelinesRef =
    useRef([]);

  const subRefs =
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
                "inset(0% 100% 0% 0%)",
            },

            {
              clipPath:
                "inset(0% 0% 0% 0%)",

              duration: 0.4,

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

              item.delay + 0.25
            );
          }
        );


        const elements =
          subRefs.current.filter(
            Boolean
          );


        if (!isMobile) {
          if (elements.length) {
            timeline.fromTo(
              elements,

              {
                opacity: 0,
              },

              {
                opacity: 1,

                duration: 0.2,

                stagger: 0.1,
              },

              0.3
            );
          }
        } else {
          if (elements.length) {
            gsap.set(
              elements,
              {
                opacity: 1,
              }
            );
          }
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
    <ProjectedElement
      point={point}
    >

      <div
        ref={wrapperRef}
        className="box-services"
      >

        <div className="box-services-content">

          <div className="box-services-title">

            <AppearingText
              text="Skills"
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


          <div className="box-services-list">

            {services.map(
              (
                service,
                index
              ) => (
                <div
                  key={
                    service.name
                  }

                  ref={(element) => {
                    subRefs.current[
                      index
                    ] = element;
                  }}

                  className="
                    box-services-list-item
                  "
                >

                  <div
                    className="
                      box-services-list-item-name
                    "
                  >

                    <AppearingText
                      text={
                        service.name
                      }

                      steps={1}

                      duration={0.35}

                      onTimelineCreated={(
                        timeline
                      ) =>
                        handleTimelineCreated(
                          timeline,
                          0.15 +
                            index *
                              0.1
                        )
                      }
                    />

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </ProjectedElement>
  );
}

export default BoxServices;