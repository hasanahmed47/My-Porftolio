import Notch from "./Notch.jsx";

import "./NotchSection.scss";


function NotchSection({
  className = "",
}) {
  return (
    <div
      className={[
        "notch-section",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >

      <Notch
        className="
          notch-element
          notch-element-left
        "
      />

      <Notch
        className="
          notch-element
          notch-element-right
        "
      />

    </div>
  );
}


export default NotchSection;