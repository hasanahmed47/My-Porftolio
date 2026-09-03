var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Mesh, PlaneGeometry, MeshBasicMaterial, LinearSRGBColorSpace } from "three";
import gsap from "gsap";
import { uniforms as hologramUniforms } from "../avatar/hologram-material";
import { resources } from "../../../utils/resources";
let plane = null;
const START_Y = -0.2;
const END_Y = 4.5;
const FADE_IN_START = 0.2;
const FADE_IN_END = 0.3;
const FADE_OUT_START = 0.7;
const FADE_OUT_END = 0.9;
const init = /* @__PURE__ */ __name(() => {
  if (plane) return;
  const geometry = new PlaneGeometry(1.5, 1);
  geometry.rotateX(-Math.PI / 2);
  const texture = resources.items["hologram-plane-texture"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  texture.flipY = false;
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1
  });
  plane = new Mesh(geometry, material);
  plane.renderOrder = 24;
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!plane) return;
  const progress = hologramUniforms.uProgress.value;
  const yPosition = START_Y + progress * (END_Y - START_Y);
  plane.position.y = yPosition + 0.01;
  let opacity = 0;
  if (progress <= FADE_IN_START) {
    opacity = 0;
  } else if (progress <= FADE_IN_END) {
    const fadeInProgress = (progress - FADE_IN_START) / (FADE_IN_END - FADE_IN_START);
    opacity = fadeInProgress;
  } else if (progress <= FADE_OUT_START) {
    opacity = 1;
  } else if (progress <= FADE_OUT_END) {
    const fadeOutProgress = (progress - FADE_OUT_START) / (FADE_OUT_END - FADE_OUT_START);
    opacity = 1 - fadeOutProgress;
  } else {
    opacity = 0;
  }
  let scale = 1;
  if (progress <= 0.5) {
    scale = 1 + progress / 0.5 * 0.5;
  } else {
    scale = 1.5 - (progress - 0.5) / 0.5 * 0.5;
  }
  plane.scale.x = scale;
  if (plane.material instanceof MeshBasicMaterial) {
    plane.material.opacity = opacity;
  }
  plane.visible = opacity > 0;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
  if (plane) {
    plane.geometry.dispose();
    if (plane.material instanceof MeshBasicMaterial) {
      plane.material.dispose();
    }
    plane = null;
  }
}, "destroy");
const labPlane = {
  init,
  destroy,
  get mesh() {
    return plane;
  }
};
export {
  labPlane
};
