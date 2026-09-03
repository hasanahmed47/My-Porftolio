import ArrowRight from "../../../components/icons/ArrowRight.jsx";

import "./NextProject.scss";

function NextProject({ project }) {
  return (
    <div
      className="next-project children-unclickable"
      data-hoversound="hover"
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="next-project-image"
      />

      <div className="next-project-content">
        <p className="next-project-prefix">
          Next Project:
        </p>

        <h3 className="next-project-title">
          {project.title}
        </h3>
      </div>

      <ArrowRight className="next-project-arrow" />
    </div>
  );
}

export default NextProject;