import {
  useEffect,
  useState,
} from "react";

export const isTouch = {
  value: false,
};

function detectTouchDevice() {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (typeof window.matchMedia ===
      "function" &&
      window.matchMedia(
        "(pointer: coarse)"
      ).matches)
  );
}

export function useAgent() {
  const [
    touch,
    setTouch,
  ] = useState(
    isTouch.value
  );

  useEffect(() => {
    const value =
      detectTouchDevice();

    isTouch.value = value;

    setTouch(value);
  }, []);

  return {
    isTouch: touch,
  };
}

export default useAgent;
