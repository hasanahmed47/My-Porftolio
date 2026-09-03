import {
  useEffect,
  useState,
} from "react";

import {
  projectModules,
} from "../../../content/projects";

import {
  lenis,
} from "../../../hooks/useScroll";

import ProjectContent from "./ProjectContent.jsx";

import Footer from "../../../components/Footer.jsx";

import "./Project.css";

function Project({
  projectId,
  recentProjectId,
  projectVisible,
  isTransitioning,
}) {
  const [
    content,
    setContent,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const activeProjectId =
    recentProjectId ??
    projectId ??
    null;

  useEffect(() => {
    let mounted = true;

    if (
      !activeProjectId
    ) {
      setContent(null);
      setLoading(false);
      setError(null);

      return () => {
        mounted = false;
      };
    }

    setLoading(true);
    setError(null);

    try {
      const module =
        projectModules[
          activeProjectId
        ];

      if (!module) {
        throw new Error(
          `Project "${activeProjectId}" not found`
        );
      }

      const projectContent =
        module.default ??
        module;

      if (mounted) {
        setContent(
          projectContent
        );

        setLoading(false);
      }
    } catch (err) {
      console.error(
        "Project loading error:",
        err
      );

      if (mounted) {
        setError(err);
        setContent(null);
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [
    activeProjectId,
  ]);

  useEffect(() => {
    if (
      !projectId ||
      isTransitioning
    ) {
      return;
    }

    if (lenis?.value) {
      lenis.value.scrollTo(
        0,
        {
          immediate: true,
        }
      );
    }
  }, [
    projectId,
    isTransitioning,
  ]);

  const className = [
    "project",

    activeProjectId
      ? `project-${activeProjectId}`
      : "",

    isTransitioning
      ? "project-transitioning"
      : "",

    projectVisible
      ? "project-visible"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const showProjectContent =
    Boolean(
      content &&
      activeProjectId &&
      projectVisible &&
      !isTransitioning &&
      !loading &&
      !error
    );

  const showFooter =
    Boolean(
      projectVisible &&
      !isTransitioning &&
      !loading &&
      !error
    );

  return (
    <div
      className={className}
    >
      <div
        className={[
          "project-content-wrapper",

          showProjectContent ||
          showFooter
            ? "project-content-wrapper-visible"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {showProjectContent && (
          <ProjectContent
            key={activeProjectId}
            content={content}
            projectId={
              activeProjectId
            }
          />
        )}

        {showFooter && (
          <Footer
            className="project-footer"
            withSocial={false}
          />
        )}
      </div>
    </div>
  );
}

export default Project;
