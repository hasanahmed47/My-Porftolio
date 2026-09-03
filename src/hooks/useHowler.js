import {
  useEffect,
  useSyncExternalStore,
} from "react";

import gsap from "gsap";
import { Howler } from "howler";

import {
  lerp,
} from "../utils/math";

import {
  isFeatureEnabled,
} from "../utils/features";

import {
  tick as contactTick,
  stopSnoreRepetition,
} from "../features/sounds/core/contact";

import {
  tick as roomTick,
} from "../features/sounds/core/room";

import {
  sounds,
} from "../features/sounds/definitions/sounds";

import {
  getSoundsHowl,
} from "../features/sounds/utils/sounds";


const STORAGE_KEY =
  "portfolio-soundsEnabled";


const listeners =
  new Set();


let unlocked = false;

let enabled =
  readStoredPreference();

let enabledVolume =
  enabled ? 1 : 0;

let initialized =
  false;

let snapshot = {
  unlocked,
  enabled,
  volume: enabledVolume,
};


/* =====================================================
   DEVICE
===================================================== */

function isTouchDevice() {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia(
      "(pointer: coarse)"
    ).matches
  );
}


/* =====================================================
   STORAGE
===================================================== */

function readStoredPreference() {
  if (
    typeof window ===
    "undefined"
  ) {
    return true;
  }

  const stored =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (
    stored === null
  ) {
    return true;
  }

  return stored === "true";
}


/* =====================================================
   SNAPSHOT
===================================================== */

function updateSnapshot() {
  snapshot = {
    unlocked,
    enabled,
    volume: enabledVolume,
  };
}


function emit() {
  updateSnapshot();

  listeners.forEach(
    (listener) => {
      listener();
    }
  );
}


function subscribe(
  listener
) {
  listeners.add(
    listener
  );

  return () => {
    listeners.delete(
      listener
    );
  };
}


function getSnapshot() {
  return snapshot;
}


/* =====================================================
   AUDIO UNLOCK
===================================================== */

function unlockAudio() {
  if (
    !isFeatureEnabled(
      "sounds"
    )
  ) {
    return;
  }

  try {
    if (
      Howler.ctx &&
      Howler.ctx.state !==
        "running"
    ) {
      Howler.ctx.resume();
    }
  } catch {
    // Browser can reject resume
    // until a valid user gesture.
  }

  unlocked = true;

  emit();
}


/* =====================================================
   SOUND TOGGLE
===================================================== */

function setSoundsEnabled(
  value
) {
  enabled =
    Boolean(value);

  enabledVolume =
    enabled
      ? 1
      : 0;

  if (
    typeof window !==
    "undefined"
  ) {
    localStorage.setItem(
      STORAGE_KEY,
      String(enabled)
    );
  }

  emit();
}


function toggleSounds() {
  setSoundsEnabled(
    !enabled
  );
}


/* =====================================================
   LOAD SOUNDS
===================================================== */

function loadAllSounds() {
  Object.keys(
    sounds
  ).forEach(
    (soundName) => {
      const howl =
        getSoundsHowl(
          soundName
        );

      if (
        howl
      ) {
        howl.load();
      }
    }
  );
}


/* =====================================================
   MASTER VOLUME
===================================================== */

function tick() {
  if (
    !unlocked
  ) {
    return;
  }


  if (
    !isTouchDevice()
  ) {
    contactTick();
    roomTick();
  }


  const currentVolume =
    Howler.volume();


  if (
    currentVolume >
      0.99 &&
    enabledVolume === 1
  ) {
    return;
  }


  const speed =
    enabledVolume === 1
      ? 0.01
      : 0.05;


  Howler.volume(
    lerp(
      currentVolume,
      enabledVolume,
      speed
    )
  );
}


/* =====================================================
   VISIBILITY
===================================================== */

function handleVisibility() {
  Howler.mute(
    document.visibilityState ===
      "hidden"
  );
}


/* =====================================================
   KEYBOARD
===================================================== */

function handleKeyDown(
  event
) {
  if (
    event.code ===
    "KeyM"
  ) {
    unlockAudio();

    toggleSounds();
  }
}


/* =====================================================
   REACT HOOK
===================================================== */

export function useHowler() {
  const state =
    useSyncExternalStore(
      subscribe,
      getSnapshot,
      getSnapshot
    );


  useEffect(() => {
    if (
      initialized ||
      !isFeatureEnabled(
        "sounds"
      )
    ) {
      return;
    }


    initialized =
      true;


    Howler.volume(
      0
    );


    /*
     * Browser audio unlock:
     * ONLY after user gesture.
     */

    const handleFirstGesture =
      () => {
        unlockAudio();
      };


    window.addEventListener(
      "pointerdown",
      handleFirstGesture,
      {
        passive: true,
        once: true,
      }
    );


    window.addEventListener(
      "touchstart",
      handleFirstGesture,
      {
        passive: true,
        once: true,
      }
    );


    window.addEventListener(
      "keydown",
      handleFirstGesture,
      {
        once: true,
      }
    );


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );


    gsap.ticker.add(
      tick
    );


    if (
      !isTouchDevice()
    ) {
      loadAllSounds();
    }


    emit();


    return () => {
      gsap.ticker.remove(
        tick
      );


      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );


      window.removeEventListener(
        "keydown",
        handleKeyDown
      );


      window.removeEventListener(
        "pointerdown",
        handleFirstGesture
      );


      window.removeEventListener(
        "touchstart",
        handleFirstGesture
      );


      window.removeEventListener(
        "keydown",
        handleFirstGesture
      );


      stopSnoreRepetition();

      initialized =
        false;
    };
  }, []);


  return {
    soundsEnabled:
      state.enabled,

    howlerUnlocked:
      state.unlocked,

    volume:
      state.volume,

    toggleSounds,

    setSoundsEnabled,

    unlockAudio,
  };
}


/* =====================================================
   NON-HOOK STATE EXPORTS
===================================================== */

/*
 * These are compatibility exports for any
 * component that still imports these names.
 */

export const soundsEnabled = {
  get value() {
    return enabled;
  },

  set value(value) {
    setSoundsEnabled(
      value
    );
  },
};


export const howlerUnlocked = {
  get value() {
    return unlocked;
  },
};


export function getSoundState() {
  return snapshot;
}