var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { LinearSRGBColorSpace, ShaderMaterial } from "three";
import { resources } from "../../../utils/resources";
import fragmentShader from "../../shaders/avatar-face/fragment.glsl";
import vertexShader from "../../shaders/avatar-face/vertex.glsl";
import { avatar } from "./index";
import gsap from "gsap";
import { sceneWeights } from "../../../animations/scenes";
let material = null;
const FRAME_INDEXES = {
  "default-0": 0,
  "default-1": 1,
  "default-2": 2,
  "default-3": 3,
  sleeping: 4,
  "proud-0": 12,
  "proud-1": 13,
  "proud-2": 14,
  "proud-3": 15,
  "contact-transition-0": 8,
  "contact-transition-1": 9,
  "contact-transition-2": 10
};
const blinkFrame = { value: 0 };
const uniforms = { uFrame: { value: 0 } };
const sceneFrames = {
  intro: "default-0",
  contact: "sleeping"
};
const init = /* @__PURE__ */ __name(() => {
  gsap.ticker.add(tick);
  scheduleBlinkInterval();
}, "init");
const scheduleBlinkInterval = /* @__PURE__ */ __name(() => {
  gsap.delayedCall(3 + Math.random() * 3, () => {
    scheduleBlinkInterval();
    blink();
  });
}, "scheduleBlinkInterval");
const blink = /* @__PURE__ */ __name(() => {
  if (!canBlink()) return;
  const tl = gsap.timeline();
  tl.to(blinkFrame, { value: 3, duration: 0.12, ease: "power2.out" });
  tl.to(blinkFrame, { value: 0, duration: 0.2, ease: "power2.out" });
}, "blink");
const getMaterial = /* @__PURE__ */ __name(() => {
  const texture = resources.items["face-texture"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  material = new ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    fragmentShader,
    vertexShader,
    uniforms: { uTexture: { value: texture }, ...uniforms, ...avatar.uniforms }
  });
  return material;
}, "getMaterial");
const canBlink = /* @__PURE__ */ __name(() => {
  const isContact = sceneWeights.contact > 1e-3;
  if (isContact) {
    if (sceneFrames.contact.startsWith("proud")) {
      return true;
    }
  } else {
    if (sceneFrames.intro.startsWith("default")) {
      return true;
    }
  }
  return false;
}, "canBlink");
const wakeUp = /* @__PURE__ */ __name(() => {
  sceneFrames.contact = "proud-0";
  const tl = gsap.timeline();
  tl.set(sceneFrames, { contact: "contact-transition-0" }, 0);
  tl.set(sceneFrames, { contact: "contact-transition-1" }, 0.4);
  tl.set(sceneFrames, { contact: "contact-transition-2" }, 0.43);
  tl.set(sceneFrames, { contact: "proud-0" }, 0.46);
}, "wakeUp");
const wave = /* @__PURE__ */ __name(() => {
  const tl = gsap.timeline();
  const RESET_AFTER = 3;
  tl.set(sceneFrames, { intro: "proud-0" }, 0);
  tl.set(sceneFrames, { intro: "default-0" }, RESET_AFTER);
  return tl;
}, "wave");
const tick = /* @__PURE__ */ __name(() => {
  const isContact = sceneWeights.contact > 1e-3;
  if (isContact) {
    const name = sceneFrames.contact.startsWith("proud") ? `proud-${Math.round(blinkFrame.value)}` : sceneFrames.contact;
    uniforms.uFrame.value = FRAME_INDEXES[name];
  } else {
    const isAbout = sceneWeights.about > 0.1;
    if (isAbout) {
      uniforms.uFrame.value = FRAME_INDEXES["default-0"];
    } else {
      const name = sceneFrames.intro.startsWith("default") ? `default-${Math.round(blinkFrame.value)}` : sceneFrames.intro;
      uniforms.uFrame.value = FRAME_INDEXES[name];
    }
  }
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const face = { init, destroy, getMaterial, FRAME_INDEXES, wakeUp, wave };
export {
  face
};
