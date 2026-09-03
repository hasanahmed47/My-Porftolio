var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { avatar } from ".";
import { avatarHologram } from "./hologram";
import { AnimationAction, AnimationMixer, LoopOnce, LoopPingPong } from "three";
import gsap from "gsap";
import { resources } from "../../../utils/resources";
import { sceneWeights } from "../../../animations/scenes";
import { face } from "./face";
import { sleepingSprite } from "../contact/sleeping-sprite";
import { playSound } from "../../../features/sounds/utils/sounds";
import { isFeatureEnabled } from "../../../utils/features";
import { stopSnoreRepetition } from "../../../features/sounds/core/contact";
let mixer;
let activeAction = null;
const actions = /* @__PURE__ */ new Map();
let isAwake = false;
const wavingStrength = { value: isFeatureEnabled("introWave") ? 1 : 0 };
let hologramMixer;
const hologramActions = /* @__PURE__ */ new Map();
const init = /* @__PURE__ */ __name(() => {
  mixer = new AnimationMixer(avatar.getMesh());
  hologramMixer = new AnimationMixer(avatarHologram.getMesh());
  setupActions();
  setupHologramActions();
  play("desktop-idle");
  wave();
}, "init");
const getActionFromMesh = /* @__PURE__ */ __name((name) => {
  const resource = resources.items["avatar-model"];
  const action = resource.animations.find((animation) => animation.name === name);
  if (!action) throw new Error("[AvatarAnimations] Action not found");
  return action;
}, "getActionFromMesh");
const setupActions = /* @__PURE__ */ __name(() => {
  const desktopIdle = mixer.clipAction(getActionFromMesh("idle"));
  desktopIdle.loop = LoopPingPong;
  actions.set("desktop-idle", desktopIdle);
  desktopIdle.weight = 1;
  const tIdle = mixer.clipAction(getActionFromMesh("t-idle"));
  tIdle.loop = LoopPingPong;
  actions.set("t-idle", tIdle);
  tIdle.weight = 0;
  tIdle.play();
  const leftDesktop = mixer.clipAction(getActionFromMesh("left-desktop"));
  leftDesktop.repetitions = 1;
  leftDesktop.clampWhenFinished = true;
  actions.set("left-desktop", leftDesktop);
  leftDesktop.weight = 0;
  const sleeping = mixer.clipAction(getActionFromMesh("sleeping"));
  sleeping.loop = LoopPingPong;
  actions.set("sleeping", sleeping);
  sleeping.weight = 1;
  sleeping.play();
  const wake = mixer.clipAction(getActionFromMesh("wake-up"));
  wake.repetitions = 1;
  wake.clampWhenFinished = true;
  actions.set("wake-up", wake);
  const contactIdle = mixer.clipAction(getActionFromMesh("contact-idle"));
  contactIdle.loop = LoopPingPong;
  actions.set("contact-idle", contactIdle);
  const wave2 = mixer.clipAction(getActionFromMesh("wave"));
  wave2.clampWhenFinished = true;
  wave2.loop = LoopOnce;
  actions.set("wave", wave2);
}, "setupActions");
const setupHologramActions = /* @__PURE__ */ __name(() => {
  const desktopIdle = hologramMixer.clipAction(getActionFromMesh("idle"));
  desktopIdle.loop = LoopPingPong;
  hologramActions.set("desktop-idle", desktopIdle);
  desktopIdle.weight = 1;
  desktopIdle.play();
  const tIdle = hologramMixer.clipAction(getActionFromMesh("t-idle"));
  tIdle.loop = LoopPingPong;
  hologramActions.set("t-idle", tIdle);
  tIdle.weight = 0;
  tIdle.play();
  const leftDesktop = hologramMixer.clipAction(getActionFromMesh("left-desktop"));
  leftDesktop.repetitions = 1;
  leftDesktop.clampWhenFinished = true;
  hologramActions.set("left-desktop", leftDesktop);
  leftDesktop.weight = 0;
  const wave2 = hologramMixer.clipAction(getActionFromMesh("wave"));
  wave2.clampWhenFinished = true;
  wave2.loop = LoopOnce;
  hologramActions.set("wave", wave2);
}, "setupHologramActions");
const play = /* @__PURE__ */ __name((name, transition = 0.5) => {
  if (activeAction === name) return;
  const newAction = actions.get(name);
  const newHologramAction = hologramActions.get(name);
  if (!newAction || !newHologramAction) throw new Error("[AvatarAnimations] Action not found");
  newAction.reset().play();
  newHologramAction.reset().play();
  if (activeAction) {
    const currentAction = actions.get(activeAction);
    if (currentAction) currentAction.crossFadeTo(newAction, transition);
    const currentHologramAction = hologramActions.get(activeAction);
    if (currentHologramAction) currentHologramAction.crossFadeTo(newHologramAction, transition);
  }
  activeAction = name;
}, "play");
const setWeight = /* @__PURE__ */ __name((key, weight) => {
  const action = actions.get(key);
  if (action) action.weight = weight;
  const hologramAction = hologramActions.get(key);
  if (hologramAction) hologramAction.weight = weight;
}, "setWeight");
const updateIntro = /* @__PURE__ */ __name(() => {
  setWeight("desktop-idle", (1 - avatar.tIdleIntensity.value) * (1 - wavingStrength.value));
  setWeight("left-desktop", (1 - avatar.tIdleIntensity.value) * (1 - wavingStrength.value));
  setWeight("t-idle", avatar.tIdleIntensity.value);
  setWeight("sleeping", 0);
  setWeight("contact-idle", 0);
  setWeight("wake-up", 0);
  setWeight("wave", wavingStrength.value * (1 - avatar.tIdleIntensity.value));
}, "updateIntro");
const wave = /* @__PURE__ */ __name(() => {
  const waveAction = actions.get("wave");
  const hologramWaveAction = hologramActions.get("wave");
  if (!waveAction) return;
  const tl = gsap.timeline();
  const waveDuration = waveAction.getClip().duration;
  waveAction.play();
  hologramWaveAction?.play();
  tl.add(face.wave());
  tl.fromTo(wavingStrength, { value: 1 }, { value: 0 }, waveDuration - 0.2);
  return tl;
}, "wave");
const wakeUp = /* @__PURE__ */ __name(() => {
  if (isAwake) return;
  isAwake = true;
  const sleepingAction = actions.get("sleeping");
  const wakeUpAction = actions.get("wake-up");
  const contactIdleAction = actions.get("contact-idle");
  if (!sleepingAction || !wakeUpAction || !contactIdleAction) return;
  stopSnoreRepetition();
  playSound("gasp");
  sleepingAction.crossFadeTo(wakeUpAction, 0.2);
  wakeUpAction.play();
  const wakeUpDuration = wakeUpAction.getClip().duration;
  setTimeout(() => {
    wakeUpAction.crossFadeTo(contactIdleAction, 0.5);
    contactIdleAction.play();
  }, wakeUpDuration * 1e3);
  face.wakeUp();
  sleepingSprite.hide();
}, "wakeUp");
const updateContact = /* @__PURE__ */ __name(() => {
  setWeight("desktop-idle", 0);
  setWeight("left-desktop", 0);
  setWeight("t-idle", 0);
  setWeight("sleeping", 1);
  setWeight("contact-idle", 1);
  setWeight("wake-up", 1);
  setWeight("wave", 0);
}, "updateContact");
const update = /* @__PURE__ */ __name(() => {
  const isContact = sceneWeights.contact > 1e-3;
  if (isContact) {
    updateContact();
  } else {
    updateIntro();
  }
  const delta = gsap.ticker.deltaRatio(60);
  mixer.update(delta / 60);
  hologramMixer.update(delta / 60);
}, "update");
const animations = { init, play, actions, update, wakeUp, getIsAwake: /* @__PURE__ */ __name(() => isAwake, "getIsAwake"), wave };
export {
  animations
};
