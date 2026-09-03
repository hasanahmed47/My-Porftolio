import {
  useEffect,
} from "react";

import gsap from "gsap";

import {
  clamp,
} from "../utils/math";

import {
  sizes,
} from "../utils/sizes";

import {
  sceneWeights,
} from "../animations/scenes";

import {
  musicTracks,
  BASE_VOLUMES,
} from "../features/sounds/definitions/music";

import {
  useHowler,
} from "./useHowler";

import {
  useRouteObserver,
} from "./useRouteObserver";


function useMusic() {
  const {
    soundsEnabled,
    howlerUnlocked,
  } = useHowler();


  const {
    path,
  } =
    useRouteObserver();


  useEffect(() => {
    const tickVolumes =
      () => {
        if (
          path !== "/"
        ) {
          musicTracks.luci.volume(
            BASE_VOLUMES.luci
          );

          musicTracks.about.volume(
            0
          );

          return;
        }


        const aboutWeight =
          sceneWeights.about;


        musicTracks.luci.volume(
          clamp(
            1 - aboutWeight,
            0,
            1
          ) *
            BASE_VOLUMES.luci
        );


        musicTracks.about.volume(
          clamp(
            aboutWeight * 1.25 -
              0.25,
            0,
            1
          ) *
            BASE_VOLUMES.about
        );
      };


    const tick =
      () => {
        if (
          !sizes.visible
        ) {
          return;
        }


        if (
          !soundsEnabled ||
          !howlerUnlocked ||
          path !== "/"
        ) {
          return;
        }


        tickVolumes();
      };


    if (
      howlerUnlocked &&
      soundsEnabled
    ) {
      if (
        !musicTracks.luci.playing()
      ) {
        musicTracks.luci.load();
        musicTracks.luci.play();
      }


      if (
        !musicTracks.about.playing()
      ) {
        musicTracks.about.load();
        musicTracks.about.play();
      }
    }


    gsap.ticker.add(
      tick
    );


    return () => {
      gsap.ticker.remove(
        tick
      );
    };
  }, [
    path,
    soundsEnabled,
    howlerUnlocked,
  ]);


  useEffect(() => {
    if (
      soundsEnabled &&
      howlerUnlocked
    ) {
      return;
    }


    musicTracks.luci.stop();
    musicTracks.about.stop();

    musicTracks.luci.volume(
      BASE_VOLUMES.luci
    );

    musicTracks.about.volume(
      0
    );
  }, [
    soundsEnabled,
    howlerUnlocked,
  ]);


  useEffect(() => {
    return () => {
      musicTracks.luci.stop();
      musicTracks.about.stop();
    };
  }, []);
}


export default useMusic;