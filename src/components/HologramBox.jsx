import "./HologramBox.css";

function HologramBox({
  title,
  footer = false,
  children,
  className = "",
}) {
  const hasTitle =
    title !== undefined &&
    title !== null &&
    title !== "";

  return (
    <div
      className={[
        "hologram-box",
        hasTitle
          ? "hologram-box-has-title"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasTitle && (
        <div className="hologram-box-header">

          <div className="hologram-box-header-content">
            <h2 className="hologram-box-header-title">
              {title}
            </h2>
          </div>

          <div className="hologram-box-curve">
            <svg
              viewBox="0 0 51 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hologram-box-curve-svg"
            >
              <path
                d="M47.6098 33C24.1951 33 26.5366 1 3.12195 1H0V33H47.6098Z"
                className="hologram-box-curve-fill"
              />

              <path
                d="M0 1H3.12195C26.5366 1 24.1951 33 47.6098 33H50.7317"
                vectorEffect="non-scaling-stroke"
                className="hologram-box-curve-path"
              />
            </svg>
          </div>

          <div className="hologram-box-header-notch-right" />
        </div>
      )}

      <div className="hologram-box-content">
        {children}
      </div>

      {footer && (
        <div className="hologram-box-footer">
          <svg
            className="hologram-box-footer-svg"
            viewBox="0 0 255 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.257324 0.428772L14.3995 8.91406C18.1502 11.1645 23.2373 12.4288 28.5416 12.4288H225.973C231.277 12.4288 236.364 11.1645 240.115 8.91405L254.257 0.428772"
              className="hologram-box-footer-path"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default HologramBox;