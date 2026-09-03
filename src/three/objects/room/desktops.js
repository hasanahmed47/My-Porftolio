var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { BufferAttribute, LinearSRGBColorSpace, Mesh, RepeatWrapping, ShaderMaterial } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { room } from ".";
import fragmentShader from "../../shaders/desktops/fragment.glsl";
import vertexShader from "../../shaders/desktops/vertex.glsl";
import gsap from "gsap";
import { sceneWeights } from "../../../animations/scenes";
import { animations as avatarAnimations } from "../avatar/animations";
import { leftDesktop as avatarLeftDesktop } from "../avatar/left-desktop";
import { playSound } from "../../../features/sounds/utils/sounds";
let mesh = null;
let material = null;
let geometry = null;
let messageTween = null;
let scrollInterval = null;
const uniforms = {
  uScrollDepth: { value: 0 },
  uMessageIntensity: { value: 0 }
};
const init = /* @__PURE__ */ __name(() => {
  setupMesh();
  startScrollInterval();
}, "init");
const setupMesh = /* @__PURE__ */ __name(() => {
  const resource = resources.items["room-model"];
  const desktop1 = resource.scene.children.find((child) => child.name === "desktop-plane-0");
  const desktop2 = resource.scene.children.find((child) => child.name === "desktop-plane-1");
  desktop1.geometry.translate(desktop1.position);
  desktop2.geometry.translate(desktop2.position);
  const scrollIntensity1 = new Float32Array(desktop1.geometry.attributes.position.count).fill(1);
  const scrollIntensity2 = new Float32Array(desktop2.geometry.attributes.position.count).fill(0);
  desktop1.geometry.setAttribute("scrollIntensity", new BufferAttribute(scrollIntensity1, 1));
  desktop2.geometry.setAttribute("scrollIntensity", new BufferAttribute(scrollIntensity2, 1));
  const messageIntensity1 = new Float32Array(desktop1.geometry.attributes.position.count).fill(0);
  const messageIntensity2 = new Float32Array(desktop2.geometry.attributes.position.count).fill(1);
  desktop1.geometry.setAttribute("messageIntensity", new BufferAttribute(messageIntensity1, 1));
  desktop2.geometry.setAttribute("messageIntensity", new BufferAttribute(messageIntensity2, 1));
  geometry = mergeGeometries([desktop1.geometry, desktop2.geometry]);
  const texture = resources.items["desktops-texture"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  material = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms: {
      uTexture: { value: texture },
      ...uniforms
    }
  });
  mesh = new Mesh(geometry, material);
  room.group.add(mesh);
}, "setupMesh");
const startScrollInterval = /* @__PURE__ */ __name(() => {
  if (scrollInterval) scrollInterval.kill();
  scrollInterval = gsap.delayedCall(Math.random() * 2 + 3, () => {
    startScrollInterval();
    if (sceneWeights.hero < 0.95) return;
    const idleAction = avatarAnimations.actions.get("desktop-idle");
    if (!idleAction || idleAction.weight < 0.95) return;
    const isAtLeftDesktop = avatarLeftDesktop.getIsActive();
    if (isAtLeftDesktop) return;
    scroll();
    if (Math.random() <= 0.33) {
      gsap.delayedCall(0.6, () => {
        if (sceneWeights.hero < 0.2) return;
        if (!idleAction || idleAction.weight < 0.95) return;
        scroll();
      });
    }
  });
}, "startScrollInterval");
const scroll = /* @__PURE__ */ __name(() => {
  const scrollDepth = Math.random() * (-0.25 - 0.25) + 0.25;
  gsap.to(uniforms.uScrollDepth, { value: scrollDepth, duration: 1 });
  playSound("mouseWheel");
}, "scroll");
const showMessage = /* @__PURE__ */ __name(() => {
  if (messageTween) messageTween.kill();
  messageTween = gsap.fromTo(uniforms.uMessageIntensity, { value: 1 }, { value: 0, duration: 1, delay: 2 });
}, "showMessage");
const destroy = /* @__PURE__ */ __name(() => {
  material?.dispose();
  material = null;
  geometry?.dispose();
  geometry = null;
  mesh = null;
  scrollInterval?.kill();
  scrollInterval = null;
  messageTween?.kill();
  messageTween = null;
}, "destroy");
const desktops = { init, destroy, scroll, showMessage };
export {
  desktops
};
