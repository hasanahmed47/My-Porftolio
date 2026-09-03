import {
  useEffect,
} from "react";

import gsap from "gsap";
import Lenis from "lenis";

import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

gsap.registerPlugin(
  ScrollTrigger
);

export const lenis = {
  value: null,
};

export const projectLenis = {
  value: null,
};

export const velocity = {
  value: 0,
};

let activeLenis = null;

const handleScroll = () => {
  ScrollTrigger.update();
};

function createLenis() {
  if (activeLenis) {
    activeLenis.off(
      "scroll",
      handleScroll
    );

    activeLenis.destroy();

    activeLenis = null;
  }

  const instance = new Lenis({
    lerp: 0.08,
  });

  instance.on(
    "scroll",
    handleScroll
  );

  activeLenis = instance;
  lenis.value = instance;

  return instance;
}

export function useScroll(
  isTransitioning = false
) {
  useEffect(() => {
    const instance =
      createLenis();

    const tick = (
      time
    ) => {
      if (
        !activeLenis ||
        activeLenis !== instance
      ) {
        return;
      }

      if (
        instance.isScrolling ===
          "smooth" &&
        Math.abs(
          instance.velocity
        ) > 0
      ) {
        velocity.value =
          Math.min(
            Math.abs(
              instance.velocity *
                0.75
            ) || 0,
            1
          );
      }

      instance.raf(
        time * 1000
      );
    };

    gsap.ticker.add(
      tick
    );

    gsap.ticker.lagSmoothing(
      0
    );

    return () => {
      gsap.ticker.remove(
        tick
      );

      instance.off(
        "scroll",
        handleScroll
      );

      instance.destroy();

      if (
        activeLenis === instance
      ) {
        activeLenis =
          null;

        lenis.value =
          null;

        velocity.value =
          0;
      }
    };
  }, []);

  useEffect(() => {
    const instance =
      lenis.value;

    if (!instance) {
      return;
    }

    if (
      isTransitioning
    ) {
      instance.stop();

      ScrollTrigger.clearScrollMemory();

      return;
    }

    instance.start();

    ScrollTrigger.update();
  }, [
    isTransitioning,
  ]);
}

export default useScroll;
