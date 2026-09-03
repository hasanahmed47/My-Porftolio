import ProjectComponent from "./ProjectComponent.jsx";

import "./ImageText.css";


function ImageText({
  imagePosition,
  src,
  alt,
  component,
  border = false,
}) {
  const imageClasses = [
    "imageText-image",

    imagePosition === "left"
      ? "imageText-image-left"
      : "",

    imagePosition === "right"
      ? "imageText-image-right"
      : "",
  ]
    .filter(Boolean)
    .join(" ");


  const contentClasses = [
    "imageText-content",

    imagePosition === "right"
      ? "imageText-content-left"
      : "",

    imagePosition === "left"
      ? "imageText-content-right"
      : "",
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <>
      <div className={imageClasses}>

        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          fetchPriority="high"
          className={[
            "imageText-image-content",

            border
              ? "imageText-image-content-border"
              : "",
          ].join(" ")}
        />

      </div>


      {component && (
        <div
          className={contentClasses}
        >
          <ProjectComponent
            type={
              component.type
            }
            props={
              component.props
            }
            index={0}
          />
        </div>
      )}
    </>
  );
}

export default ImageText;