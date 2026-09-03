import "./HeaderLink.css";

function HeaderLink({
  children,
  isActive = false,
  isDarkTheme = false,
  className = "",
  onClick,
  ...props
}) {
  const classes = [
    "header-link",
    isActive
      ? "header-link-active"
      : "",
    isDarkTheme
      ? "header-link-dark"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      data-cursor="circle-white"
      {...props}
    >
      {children}
    </button>
  );
}

export default HeaderLink;