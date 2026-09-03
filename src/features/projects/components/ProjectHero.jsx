import {
  useEffect,
  useState,
} from "react";

import Tag from "../../../components/Tag.jsx";
import Button from "../../../components/Button.jsx";
import Link from "../../../components/Link.jsx";

import {
  useRouteObserver,
} from "../../../hooks/useRouteObserver";

import "./ProjectHero.scss";

function ProjectHero({
  content,
  projectId,
}) {
  const {
    projectId: routeProjectId,
  } =
    useRouteObserver();

  const [
    animationKey,
    setAnimationKey,
  ] = useState(0);

  /*
   * Match the original Vue watcher:
   * every project route change gets
   * a fresh title element.
   */
  useEffect(() => {
    setAnimationKey(
      (value) =>
        value + 1
    );
  }, [
    routeProjectId,
  ]);

  return (
    <div
      className="
        project-hero
        grid
      "
    >
      <div
        className="
          project-hero-top
        "
      >
        <div
          className="
            project-hero-title-wrapper
          "
        >
          <h1
            key={
              `${projectId}-${animationKey}`
            }
            className="
              project-hero-title
            "
          >
            {content.title}
          </h1>
        </div>

        <div
          className="
            project-hero-tags
          "
        >
          {content.tags?.map(
            (tag) => (
              <Tag
                key={tag}
                variant={tag}
              />
            )
          )}
        </div>
      </div>

      <p
        className="
          project-hero-description
        "
        dangerouslySetInnerHTML={{
          __html:
            content.description ??
            "",
        }}
      />

      <div
        className="
          project-hero-buttons
        "
      >
        {content.live && (
          <Link
            href={
              content.live
            }
            external
            className="
              project-hero-button
            "
            data-cursor="arrow-external"
          >
            <Button
              renderAs="div"
              variant="accent"
              className="
                children-unclickable
              "
              data-hoversound="hover"
            >
              Live View
            </Button>
          </Link>
        )}

        {content.source && (
          <Link
            href={
              content.source
            }
            external
            className="
              project-hero-button
            "
            data-cursor="arrow-external"
          >
            <Button
              renderAs="div"
              variant="border"
              className="
                children-unclickable
              "
              data-hoversound="hover"
            >
              Source Code
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProjectHero;
