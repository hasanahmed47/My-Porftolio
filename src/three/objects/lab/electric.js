var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ShaderMaterial } from "three";
import gsap from "gsap";
import { velocity } from "../../../hooks/useScroll";
import { isTouch } from "../../../hooks/useAgent";
import { lerp } from "../../../utils/math";
import vertexShader from "../../shaders/lab-electric/vertex.glsl";
import fragmentShader from "../../shaders/lab-electric/fragment.glsl";
let material = null;
let mesh = null;
let lastScrollY = 0;
let touchVelocity = 0;
let touchVelocityTarget = 0;
let scrollTimeout = null;
const uniforms = {
  uTime: { value: 0 },
  uOpacity: { value: 0 }
};
const init = /* @__PURE__ */ __name((_mesh) => {
  mesh = _mesh;
  material = new ShaderMaterial({
    transparent: true,
    vertexShader,
    fragmentShader,
    uniforms
  });
  mesh.material = material;
  lastScrollY = window.scrollY;
  if (isTouch.value) {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
  gsap.ticker.add(tick);
}, "init");
const handleScroll = /* @__PURE__ */ __name(() => {
  const currentScrollY = window.scrollY;
  const delta = Math.abs(currentScrollY - lastScrollY);
  lastScrollY = currentScrollY;
  if (delta > 0) {
    touchVelocityTarget = 1;
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = window.setTimeout(() => {
      touchVelocityTarget = 0;
      scrollTimeout = null;
    }, 150);
  }
}, "handleScroll");
const tick = /* @__PURE__ */ __name(() => {
  if (!material) return;
  material.uniforms.uTime.value = gsap.ticker.time;
  touchVelocity = lerp(touchVelocity, touchVelocityTarget, 0.06);
  const currentVelocity = velocity.value > 0 ? velocity.value : touchVelocity;
  const opacity = currentVelocity * 0.75;
  material.uniforms.uOpacity.value = opacity;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
  if (isTouch.value) {
    window.removeEventListener("scroll", handleScroll);
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
}, "destroy");
const labElectric = { init, destroy };
export {
  labElectric
};
