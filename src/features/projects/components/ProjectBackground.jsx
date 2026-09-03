import "./ProjectBackground.scss";

function ProjectBackground({
  projectId,
  recentProjectId,
  isTransitioning,
}) {
  const blendClasses = [
    "project-background-blend",

    typeof recentProjectId === "string"
      ? `project-${recentProjectId}`
      : "",

    isTransitioning
      ? "project-background-blend-transitioning"
      : "",

    typeof projectId === "string"
      ? "project-background-blend-visible"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const backgroundClasses = [
    "project-background",

    typeof recentProjectId === "string"
      ? `project-${recentProjectId}`
      : "",

    typeof projectId === "string"
      ? "project-background-visible"
      : "",

    isTransitioning
      ? "project-background-transitioning"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div
        className={
          blendClasses
        }
      />

      <div
        className={
          backgroundClasses
        }
      />
    </>
  );
}

export default ProjectBackground;