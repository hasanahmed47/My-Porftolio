var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Mesh, ShaderMaterial, PlaneGeometry, Float32BufferAttribute, Color, Vector2 } from "three";
import { scene } from "../../core/scene";
import vertexShader from "../../shaders/dark-plane/vertex.glsl";
import fragmentShader from "../../shaders/dark-plane/fragment.glsl";
import gsap from "gsap";
import { sceneWeightsInOut } from "../../../animations/scenes";
import { renderTarget } from "../../core/renderTarget";
import { sizes } from "../../../utils/sizes";
import { mix } from "../../../utils/math";
let geometry = null;
let material = null;
let mesh = null;
const uniforms = {
  uAngle: { value: 0 },
  uRectSize: { value: new Vector2() },
  uRectCenter: { value: new Vector2() },
  uRadius: { value: 0.05 },
  uAspectRatio: { value: sizes.width / sizes.height },
  uBloomStrength: { value: 0.5 },
  uBloomRadius: { value: 2e-3 }
};
const init = /* @__PURE__ */ __name(() => {
  initMesh();
  gsap.ticker.add(tick);
  sizes.on("resize", handleResize);
  handleResize();
}, "init");
const initMesh = /* @__PURE__ */ __name(() => {
  if (geometry) return;
  geometry = new PlaneGeometry(2, 2);
  const position = geometry.attributes.position;
  const array = position.array;
  const activeArray = new Float32Array(array.length);
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    activeArray[i] = x;
    activeArray[i + 1] = y;
    activeArray[i + 2] = z;
  }
  geometry.setAttribute("activePosition", new Float32BufferAttribute(activeArray, 3));
  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    uniforms: {
      uTexture: { value: renderTarget.instance.texture },
      uVignetteColor: { value: new Color("rgb(0, 15, 61)") },
      ...uniforms
    }
  });
  mesh = new Mesh(geometry, material);
  mesh.renderOrder = 10;
  mesh.frustumCulled = false;
  mesh.visible = false;
  scene.instance.add(mesh);
}, "initMesh");
const handleResize = /* @__PURE__ */ __name(() => {
  if (!material) return;
  const aspectRatio = sizes.width / sizes.height;
  uniforms.uAspectRatio.value = aspectRatio;
  const isMd = sizes.matchMedia("md");
  uniforms.uRadius.value = (isMd ? 48 : 24) / sizes.height;
}, "handleResize");
const tick = /* @__PURE__ */ __name(() => {
  if (!material || !mesh) return;
  const progress = {
    in: sceneWeightsInOut.about.in,
    out: sceneWeightsInOut.about.out
  };
  if (progress.in < 1e-3 || progress.in === 1 && progress.out >= 0.999 || progress.out === 1) {
    mesh.visible = false;
    return;
  } else {
    mesh.visible = true;
  }
  const isLandscape = sizes.isLandscape;
  const aspectRatio = sizes.width / sizes.height;
  const sizeValue = mix(0.55, isLandscape ? 0.5 : 0.35, progress.in);
  uniforms.uRectSize.value.set(sizeValue * aspectRatio, 0.5);
  uniforms.uRectCenter.value.set(
    0.5 + (isLandscape ? 0.2 : 0) * progress.in,
    0.5 + progress.in * (isLandscape ? 1.1 : 1.02)
  );
  uniforms.uAngle.value = (isLandscape ? 0.075 : 0) * progress.in;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
  sizes.off("resize", handleResize);
}, "destroy");
const darkPlane = { init, destroy };
export {
  darkPlane
};
