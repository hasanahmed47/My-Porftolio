import "./Link.scss";

function Link({
  children,
  external = false,
  renderAs = "a",
  href,
  to,
  replace = false,
  className = "",
  onClick,
  ...props
}) {
  const Component =
    renderAs || "a";

  const base =
    href ||
    to ||
    "/";

  const resolvedTo =
    base.length > 1 &&
    base.endsWith("/")
      ? base.slice(0, -1)
      : base;

  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      external ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    if (replace) {
      window.history.replaceState(
        null,
        "",
        resolvedTo
      );
    } else {
      window.history.pushState(
        null,
        "",
        resolvedTo
      );
    }
  };

  const classes = [
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <Component
        href={href || to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      href={resolvedTo}
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Link;