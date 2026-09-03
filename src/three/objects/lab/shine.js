var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { DoubleSide, ShaderMaterial } from "three";
import vertexShader from "../../shaders/lab-shine/vertex.glsl";
import fragmentShader from "../../shaders/lab-shine/fragment.glsl";
import gsap from "gsap";
import { aboutProgress } from "../../../animations/transitions/about";
let material = null;
const uniforms = {
  uTime: { value: 0 },
  uProgress: { value: 0 }
};
const init = /* @__PURE__ */ __name((mesh) => {
  if (material) return;
  material = new ShaderMaterial({
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    depthTest: false,
    vertexShader,
    fragmentShader,
    uniforms
  });
  mesh.material = material;
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!material) return;
  material.uniforms.uTime.value = gsap.ticker.time;
  material.uniforms.uProgress.value = aboutProgress.value;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const labShine = { init, destroy };
export {
  labShine
};
