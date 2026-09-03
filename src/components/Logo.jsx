import "./Logo.css";

function Logo({
  className = "",
}) {
  return (
    <svg
      className={[
        "logo-svg",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      viewBox="0 0 56 61"
      xmlns="http://www.w3.org/2000/svg"
      height="60"
      width="56"
      aria-label="Hasan Ahmed"
      role="img"
    >
      <use href="#logo-path" />
    </svg>
  );
}

export default Logo;