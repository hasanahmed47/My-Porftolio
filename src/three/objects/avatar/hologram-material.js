var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Color, ShaderMaterial, DoubleSide, AdditiveBlending } from "three";
import vertexShader from "../../shaders/hologram/vertex.glsl";
import fragmentShader from "../../shaders/hologram/fragment.glsl";
let material;
const uniforms = {
  uTime: { value: 0 },
  uColor: { value: new Color("rgb(0, 234, 255)") },
  uProgress: { value: 0 }
};
const getMaterial = /* @__PURE__ */ __name(() => {
  if (material) return material;
  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    side: DoubleSide,
    uniforms
  });
  return material;
}, "getMaterial");
export {
  getMaterial,
  uniforms
};
