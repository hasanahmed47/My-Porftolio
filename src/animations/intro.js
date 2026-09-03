var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { isFeatureEnabled } from "../utils/features";
import gsap from "gsap";
import { mouse } from "../three/objects/room/mouse";
const play = /* @__PURE__ */ __name(() => {
  if (!isFeatureEnabled("introWave")) return;
  const tl = gsap.timeline();
  tl.set(mouse.enabled, { value: true }, 0.3);
}, "play");
const intro = { play };
export {
  intro
};
