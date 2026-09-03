import ButtonWrapper from "./ButtonWrapper.jsx";

import "./Button.scss";

function Button({
  children,
  size = "md",
  renderAs = "button",
  variant,
  rounded = false,
  className = "",
  ...props
}) {
  const classes = [
    "button",
    `button-size-${size}`,
    "children-unclickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ButtonWrapper
      renderAs={renderAs}
      variant={variant}
      rounded={rounded}
      className={classes}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}

export default Button;