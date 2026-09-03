var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import gsap from "gsap";
import { animations as avatarAnimations } from "./animations";
import { desktops } from "../room/desktops";
import { sceneWeights } from "../../../animations/scenes";
import { messagePopup } from "../room/message-popup";
import { sizes } from "../../../utils/sizes";
import { playSound } from "../../../features/sounds/utils/sounds";
import { sprites } from "../../../features/sounds/definitions/sprites";
let ctx = null;
let currentId;
const isActive = { value: false };
const INTERVAL_DURATION = 7;
const init = /* @__PURE__ */ __name(() => {
  startInterval();
  sizes.on("show", handleWindowVisible);
}, "init");
const handleWindowVisible = /* @__PURE__ */ __name(() => {
  if (!isActive.value) return;
  if (currentId) {
    sprites.room.howl.stop(currentId);
    currentId = void 0;
  }
}, "handleWindowVisible");
const startInterval = /* @__PURE__ */ __name(() => {
  const { actions } = avatarAnimations;
  const leftDesktop2 = actions.get("left-desktop");
  const idle = actions.get("desktop-idle");
  if (!leftDesktop2 || !idle) return;
  const clip = leftDesktop2.getClip();
  if (ctx) ctx.kill();
  const calcDelay = /* @__PURE__ */ __name(() => {
    return Math.floor(INTERVAL_DURATION + Math.random() * 6 + clip.duration);
  }, "calcDelay");
  const playAnimation = /* @__PURE__ */ __name(() => {
    const delay = calcDelay();
    gsap.delayedCall(delay, playAnimation);
    if (sceneWeights.hero < 0.95 || !sizes.visible) return;
    const tl = gsap.timeline({
      duration: clip.duration + 0.2,
      onComplete: /* @__PURE__ */ __name(() => {
        avatarAnimations.play("desktop-idle", 0.3);
        isActive.value = false;
      }, "onComplete")
    });
    isActive.value = true;
    tl.add(() => {
      avatarAnimations.play("left-desktop", 0.3);
    }, 0.2);
    if (currentId) {
      sprites.room.howl.stop(currentId);
      currentId = void 0;
    }
    tl.add(() => {
      currentId = playSound("keyboard");
    }, 1.6);
    desktops.showMessage();
    messagePopup.show();
  }, "playAnimation");
  ctx = gsap.context(() => {
    const initialDelay = calcDelay();
    gsap.delayedCall(initialDelay, playAnimation);
  });
}, "startInterval");
const destroy = /* @__PURE__ */ __name(() => {
  ctx?.kill();
  ctx = null;
  sizes.off("show", handleWindowVisible);
}, "destroy");
const leftDesktop = { init, destroy, getIsActive: /* @__PURE__ */ __name(() => isActive.value, "getIsActive") };
export {
  leftDesktop
};
