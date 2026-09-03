import "./ButtonWrapper.scss";

function ButtonWrapper({
  children,
  renderAs = "button",
  variant,
  rounded = false,
  className = "",
  ...props
}) {
  const Component =
    typeof renderAs === "string"
      ? renderAs
      : "button";

  const classes = [
    "button-wrapper",

    variant
      ? `button-wrapper-${variant}`
      : "",

    rounded
      ? "button-wrapper-rounded"
      : "",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ButtonWrapper;