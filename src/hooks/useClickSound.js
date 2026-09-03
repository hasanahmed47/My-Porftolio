import {
  useEffect,
} from "react";

import {
  playSound,
} from "../features/sounds/utils/sounds";

import {
  useHowler,
} from "./useHowler";


const SELECTOR =
  "[data-sound]";


function useClickSound() {
  const {
    soundsEnabled,
    howlerUnlocked,
  } =
    useHowler();


  useEffect(() => {
    const handleClick =
      (event) => {
        const element =
          event.target?.closest?.(
            SELECTOR
          );


        if (
          !element
        ) {
          return;
        }


        const soundName =
          element.dataset.sound;


        if (
          !soundName
        ) {
          return;
        }


        /*
         * The click itself is also a valid
         * browser gesture, so unlock first.
         */

        if (
          !howlerUnlocked
        ) {
          return;
        }


        if (
          !soundsEnabled
        ) {
          return;
        }


        playSound(
          soundName
        );
      };


    document.body.addEventListener(
      "click",
      handleClick,
      false
    );


    return () => {
      document.body.removeEventListener(
        "click",
        handleClick,
        false
      );
    };
  }, [
    soundsEnabled,
    howlerUnlocked,
  ]);
}


export default useClickSound;