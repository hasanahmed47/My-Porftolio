import ButtonWrapper from "./ButtonWrapper.jsx";

import "./ButtonRound.scss";

function ButtonRound({
  children,
  size = "md",
  variant = "theme",
  className = "",
  ...props
}) {
  const classes = [
    "button-round",
    `button-round-size-${size}`,
    "children-unclickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ButtonWrapper
      variant={variant}
      rounded
      className={classes}
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}

export default ButtonRound;