import {
  useEffect,
  useState,
} from "react";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import HeaderLink from "./HeaderLink.jsx";

import {
  lenis,
} from "../hooks/useScroll";

import {
  useRouteObserver,
} from "../hooks/useRouteObserver";

import useHeaderTheme from "../hooks/useHeaderTheme";

import "./HeaderHome.scss";

const sections = [
  "about",
  "projects",
  "contact",
];

const labels = {
  about: "About",
  projects: "Projects",
  contact: "Contact",
};

function getItemWidth() {
  if (
    typeof window ===
    "undefined"
  ) {
    return 128;
  }

  if (
    window.innerWidth <= 400
  ) {
    return 74;
  }

  if (
    window.innerWidth < 1024
  ) {
    return 80;
  }

  return 128;
}

function HeaderHome() {
  const {
    projectId,
  } = useRouteObserver();

  const {
    isDarkTheme,
  } = useHeaderTheme();

  const [
    isMounted,
    setIsMounted,
  ] = useState(false);

  const [
    activeLink,
    setActiveLink,
  ] = useState(null);

  const [
    itemWidth,
    setItemWidth,
  ] = useState(
    getItemWidth()
  );

  useEffect(() => {
    const triggers = [];

    const createTriggers =
      () => {
        triggers.forEach(
          (trigger) => {
            trigger.kill();
          }
        );

        triggers.length = 0;

        sections.forEach(
          (section) => {
            const element =
              document.querySelector(
                `#${section}`
              );

            if (!element) {
              return;
            }

            const trigger =
              ScrollTrigger.create({
                trigger: element,

                start:
                  section === "about"
                    ? "top 22.5%"
                    : "top center",

                end:
                  "bottom center",

                onEnter: () => {
                  setActiveLink(
                    section
                  );
                },

                onEnterBack: () => {
                  setActiveLink(
                    section
                  );
                },

                onLeave: () => {
                  if (
                    section ===
                    "about"
                  ) {
                    setActiveLink(
                      null
                    );

                    return;
                  }

                  if (
                    section ===
                    "projects"
                  ) {
                    setActiveLink(
                      "contact"
                    );

                    return;
                  }

                  if (
                    section ===
                    "contact"
                  ) {
                    setActiveLink(
                      "contact"
                    );
                  }
                },

                onLeaveBack: () => {
                  if (
                    section ===
                    "contact"
                  ) {
                    setActiveLink(
                      "projects"
                    );

                    return;
                  }

                  if (
                    section ===
                    "projects"
                  ) {
                    setActiveLink(
                      "about"
                    );

                    return;
                  }

                  setActiveLink(
                    null
                  );
                },
              });

            triggers.push(
              trigger
            );
          }
        );
      };

    createTriggers();

    const handleResize =
      () => {
        setItemWidth(
          getItemWidth()
        );

        createTriggers();

        ScrollTrigger.refresh();
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    ScrollTrigger.refresh();

    setIsMounted(true);

    return () => {
      triggers.forEach(
        (trigger) => {
          trigger.kill();
        }
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const handleLinkClick =
    (section) => {
      const target =
        document.querySelector(
          `#${section}`
        );

      if (!target) {
        return;
      }

      setActiveLink(
        section
      );

      if (lenis?.value) {
        lenis.value.scrollTo(
          target
        );

        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

  const activeIndex =
    sections.indexOf(
      activeLink
    );

  const barPosition =
    activeIndex === -1
      ? 0
      : activeIndex *
        itemWidth;

  const headerClasses = [
    "header-home",

    isMounted
      ? "header-home-mounted"
      : "",

    projectId !== null
      ? "header-home-isProjectPage"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const linksClasses = [
    "header-home-links",

    isDarkTheme
      ? "header-home-links-dark"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const barClasses = [
    "header-home-bar",

    activeLink !== null
      ? "header-home-bar-active"
      : "",

    isDarkTheme
      ? "header-home-bar-dark"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={
        headerClasses
      }
    >
      <div
        className={
          linksClasses
        }
      >
        <div
          className={
            barClasses
          }
          style={{
            transform:
              `translateX(${barPosition}px)`,
          }}
        />

        {sections.map(
          (section) => (
            <HeaderLink
              key={section}
              isActive={
                activeLink ===
                section
              }
              className={[
                "header-home-link",

                activeLink ===
                  section
                  ? "header-home-link-active"
                  : "",

                "children-unclickable",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                handleLinkClick(
                  section
                )
              }
              isDarkTheme={
                isDarkTheme
              }
              aria-label={
                labels[section]
              }
              data-sound="click"
              data-hoversound="hover"
            >
              {
                labels[
                  section
                ]
              }
            </HeaderLink>
          )
        )}
      </div>
    </div>
  );
}

export default HeaderHome;
