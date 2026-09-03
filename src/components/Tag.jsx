import {
  tagLabels,
} from "./tagVariants";

import "./Tag.scss";


function Tag({
  variant,
  className = "",
}) {
  const classes = [
    "tag",
    `tag-variant-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");


  return (
    <div className={classes}>
      <p className="tag-copy">
        {tagLabels[variant] ??
          variant}
      </p>
    </div>
  );
}


export default Tag;