import {
  useEffect,
  useState,
} from "react";

import {
  previews,
} from "../../../content/projects/previews";

import PreviewCard from "../../projects/components/PreviewCard.jsx";
import NotchSection from "../../../components/NotchSection.jsx";
import Banner from "../../../components/Banner.jsx";

import {
  isFeatureEnabled,
} from "../../../utils/features";

import "./Projects.scss";

function Projects({
  id = "projects",
  onLoaded,
}) {
  const [
    loadedPreviews,
    setLoadedPreviews,
  ] = useState([]);

  useEffect(() => {
    let mounted =
      true;

    const loadPreviews =
      async () => {
        try {
          const module =
            await previews();

          const data =
            module?.default ??
            [];

          if (
            !mounted
          ) {
            return;
          }

          setLoadedPreviews(
            data
          );

          onLoaded?.(
            data
          );
        } catch (
          error
        ) {
          console.error(
            "Failed to load project previews:",
            error
          );
        }
      };

    loadPreviews();

    return () => {
      mounted =
        false;
    };
  }, [
    onLoaded,
  ]);

  return (
    <div
      id={id}
      className="projects"
    >
      <NotchSection
        className="
          projects-notch-start
        "
      />

      <NotchSection
        className="
          projects-notch-end
        "
      />

      <div className="grid">
        <div className="projects-title">
          <Banner
            className="
              projects-title-banner
            "
            copy="Selected"
            size="sm"
            animated
          />

          <h2 className="projects-title-copy">
            Projects
          </h2>
        </div>
      </div>

      <div className="grid">
        <div className="projects-cards">
          {loadedPreviews.map(
            (preview) => (
              <PreviewCard
                key={
                  preview.title
                }
                preview={
                  preview
                }
              />
            )
          )}

          {isFeatureEnabled(
            "startProject"
          ) && (
            <PreviewCard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;