import ButtonRound from "./ButtonRound.jsx";
import Volume from "./icons/Volume.jsx";

import {
  useHowler,
} from "../hooks/useHowler";

import "./SoundsToggle.scss";


function SoundsToggle({
  isDarkTheme = false,
  className = "",
}) {
  const {
    soundsEnabled,
    howlerUnlocked,
    toggleSounds,
    unlockAudio,
  } =
    useHowler();


  const active =
    soundsEnabled &&
    howlerUnlocked;


  const handleClick =
    () => {
      unlockAudio();

      toggleSounds();
    };


  return (
    <ButtonRound
      variant="theme"

      className={[
        "music-toggle",

        isDarkTheme
          ? "music-toggle-dark"
          : "",

        className,
      ]
        .filter(Boolean)
        .join(" ")}

      onClick={
        handleClick
      }

      aria-label={
        active
          ? "Disable sounds"
          : "Enable sounds"
      }

      data-cursor="circle-white"
      data-hoversound="hover"
    >
      <Volume
        active={
          active
        }
      />
    </ButtonRound>
  );
}


export default SoundsToggle;