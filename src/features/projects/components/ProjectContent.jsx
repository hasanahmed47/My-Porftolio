import {
  useEffect,
  useState,
} from "react";

import Layout from "../../../components/Layout.jsx";
import Link from "../../../components/Link.jsx";

import ProjectHero from "./ProjectHero.jsx";
import ProjectComponent from "./ProjectComponent.jsx";
import NextProject from "./NextProject.jsx";

import {
  previews,
} from "../../../content/projects/previews";

import "./ProjectContent.css";


function ProjectContent({
  content,
  projectId,
}) {
  const [
    loadedPreviews,
    setLoadedPreviews,
  ] = useState(null);


  useEffect(() => {
    let mounted = true;

    previews()
      .then((module) => {
        if (
          mounted
        ) {
          setLoadedPreviews(
            module.default
          );
        }
      })
      .catch(() => {
        if (
          mounted
        ) {
          setLoadedPreviews(
            []
          );
        }
      });

    return () => {
      mounted = false;
    };
  }, []);


  const nextProject =
    loadedPreviews
      ? (() => {
          const currentIndex =
            loadedPreviews.findIndex(
              (preview) =>
                preview.slug ===
                projectId
            );

          if (
            currentIndex === -1
          ) {
            return null;
          }

          const nextIndex =
            (currentIndex + 1) %
            loadedPreviews.length;

          return loadedPreviews[
            nextIndex
          ];
        })()
      : null;


  return (
    <Layout
      className="project-content"
    >

      <ProjectHero
        content={content}
        projectId={projectId}
      />


      <div
        className="
          project-content-components
        "
      >

        {content.components?.map(
          (
            component,
            index
          ) => (
            <div
              key={`${component.type}-${index}`}
              className="
                grid
                project-content-grid
              "
            >

              <ProjectComponent
                type={
                  component.type
                }
                props={
                  component.props
                }
                index={index}
              />

            </div>
          )
        )}

      </div>


      <div
        className="
          grid
          project-content-next-project-grid
        "
      >

        {nextProject && (
          <Link
            to={
              `/project/${nextProject.slug}`
            }
            replace
            className="
              project-content-next-project
            "
            data-cursor="arrow"
            data-sound="click"
          >
            <NextProject
              project={nextProject}
            />
          </Link>
        )}

      </div>

    </Layout>
  );
}

export default ProjectContent;