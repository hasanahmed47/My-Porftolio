var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { ShaderMaterial, LinearSRGBColorSpace } from "three";
import { resources } from "../../../utils/resources";
import { aboutProgress } from "../../../animations/transitions/about";
import gsap from "gsap";
import { sizes } from "../../../utils/sizes";
import vertexShader from "../../shaders/lab-base/vertex.glsl";
import fragmentShader from "../../shaders/lab-base/fragment.glsl";
let material = null;
let display = null;
const uniforms = {
  uDiffuseMap: { value: null },
  uProgress: { value: 0 }
};
const init = /* @__PURE__ */ __name((mesh, _display) => {
  display = _display;
  const texture = resources.items["diffuse-map"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  texture.flipY = false;
  uniforms.uDiffuseMap.value = texture;
  material = new ShaderMaterial({
    transparent: true,
    vertexShader,
    fragmentShader,
    uniforms
  });
  mesh.material = material;
  display.material = material;
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!material) return;
  material.uniforms.uProgress.value = aboutProgress.value;
  if (display) {
    display.visible = sizes.isLandscape;
  }
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const labBase = { init, destroy };
export {
  labBase
};
