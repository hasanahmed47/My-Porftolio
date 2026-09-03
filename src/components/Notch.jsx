import "./Notch.scss";


function Notch({
  className = "",
}) {
  return (
    <div
      className={[
        "notch",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
      >
        <path
          d="M0 256H256C114.616 256 0 141.385 0 0V256Z"
          fill="var(--icon-color)"
        />
      </svg>
    </div>
  );
}


export default Notch;