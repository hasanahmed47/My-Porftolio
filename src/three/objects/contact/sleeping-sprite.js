var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import gsap from "gsap";
import { Mesh, PlaneGeometry, ShaderMaterial, BufferAttribute } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import fragmentShader from "../../shaders/sleeping-sprite/fragment.glsl";
import vertexShader from "../../shaders/sleeping-sprite/vertex.glsl";
import { contact } from ".";
import { resources } from "../../../utils/resources";
import { sceneWeights } from "../../../animations/scenes";
import { lerp } from "../../../utils/math";
let mesh = null;
let geometry = null;
let material = null;
let opacityTarget = 1;
const PLANE_COUNT = 3;
const uniforms = {
  uTime: { value: 0 },
  uOpacity: { value: 1 }
};
const init = /* @__PURE__ */ __name(() => {
  gsap.ticker.add(tick);
  initMesh();
}, "init");
const initMesh = /* @__PURE__ */ __name(() => {
  if (mesh) return;
  const texture = resources.items["icon-spritesheet"];
  const geometries = [];
  for (let i = 0; i < PLANE_COUNT; i++) {
    const plane = new PlaneGeometry(1, 1);
    const indexValue = i / PLANE_COUNT;
    const vertexCount = plane.getAttribute("position").count;
    const aIndexArray = new Float32Array(vertexCount).fill(indexValue);
    plane.setAttribute("aIndex", new BufferAttribute(aIndexArray, 1));
    geometries.push(plane);
  }
  geometry = mergeGeometries(geometries, false);
  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      ...uniforms
    }
  });
  mesh = new Mesh(geometry, material);
  mesh.renderOrder = -1;
  mesh.position.set(-0.3, 3.5, 0);
  contact.group.add(mesh);
}, "initMesh");
const hide = /* @__PURE__ */ __name(() => {
  opacityTarget = 0;
}, "hide");
const tick = /* @__PURE__ */ __name(() => {
  if (!mesh) return;
  const progress = sceneWeights.contact;
  if (progress < 1e-3) {
    mesh.visible = false;
    return;
  } else {
    mesh.visible = true;
  }
  const delta = gsap.ticker.deltaRatio(60);
  const speed = 0.1;
  uniforms.uOpacity.value = lerp(uniforms.uOpacity.value, opacityTarget, speed * delta);
  if (uniforms.uOpacity.value < 0.01) mesh.visible = false;
  uniforms.uTime.value += delta / 60;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const sleepingSprite = { init, destroy, hide };
export {
  sleepingSprite
};
