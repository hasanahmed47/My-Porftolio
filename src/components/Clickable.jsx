import "./Clickable.css";

function Clickable({
  renderAs = "button",
  children,
  className = "",
  ...props
}) {
  const Component = renderAs;

  return (
    <Component
      className={[
        "clickable",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Clickable;