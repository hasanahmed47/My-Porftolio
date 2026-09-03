var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { playSound } from "../utils/sounds";
import { sprites } from "../definitions/sprites";
import { sceneWeights } from "../../../animations/scenes";
import { clamp } from "../../../utils/math";
import { projectVisible } from "../../../hooks/useRouteObserver";
import gsap from "gsap";
const SNORE_INTERVAL = 2.0833332538604736 * 2;
let snoreTimeout = null;
let currentId;
const scheduleNextSnore = /* @__PURE__ */ __name(() => {
  if (snoreTimeout) {
    snoreTimeout.kill();
  }
  snoreTimeout = gsap.delayedCall(SNORE_INTERVAL, () => {
    currentId = playSound("snore");
    scheduleNextSnore();
  });
}, "scheduleNextSnore");
scheduleNextSnore();
playSound("snore");
const tick = /* @__PURE__ */ __name(() => {
  const volume = projectVisible.value ? 0 : clamp(sceneWeights.contact * 0.5, 0, 1);
  sprites.contact.howl.volume(volume);
}, "tick");
const stopSnoreRepetition = /* @__PURE__ */ __name(() => {
  if (snoreTimeout) {
    snoreTimeout.kill();
    snoreTimeout = null;
  }
  if (currentId) {
    sprites.contact.howl.stop(currentId);
    currentId = void 0;
  }
}, "stopSnoreRepetition");
export {
  stopSnoreRepetition,
  tick
};
