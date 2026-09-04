var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { Mesh, Vector3, Euler, Group, ShaderMaterial, LinearSRGBColorSpace } from "three";
import { scene } from "../../core/scene";
import { animations } from "./animations";
import { sceneWeights, sceneWeightsInOut } from "../../../animations/scenes";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { face } from "./face";
import { leftDesktop as avatarLeftDesktop } from "./left-desktop";
import matcapVertexShader from "../../shaders/avatar-matcap/vertex.glsl";
import matcapFragmentShader from "../../shaders/avatar-matcap/fragment.glsl";
import headVertexShader from "../../shaders/avatar-head/vertex.glsl";
import headFragmentShader from "../../shaders/avatar-head/fragment.glsl";
import gsap from "gsap";
import { aboutProgress } from "../../../animations/transitions/about";
let mesh = null;
let rightHandBone = null;
const tIdleIntensity = { value: 0 };
const waypointsPosition = new Vector3();
const waypointsRotation = new Euler();
const transform = new Group();
const uniforms = { uProgress: { value: 0 }, uAmbientStrength: { value: 0 } };
const contactPosition = new Vector3(0, -13, 0);
const contactRotation = new Euler(0, -Math.PI, 0);
const init = /* @__PURE__ */ __name(() => {
  setupMesh();
  animations.init();
  face.init();
  avatarLeftDesktop.init();
  gsap.ticker.add(tick);
}, "init");
const getMaterial = /* @__PURE__ */ __name((name) => {
  if (name === "face") return face.getMaterial();
  if (name === "head") {
    const texture = resources.items["head-texture"];
    texture.flipY = false;
    texture.colorSpace = LinearSRGBColorSpace;
    texture.generateMipmaps = false;
    return new ShaderMaterial({
      vertexShader: headVertexShader,
      fragmentShader: headFragmentShader,
      transparent: true,
      uniforms: {
        uHeadTexture: { value: texture },
        ...uniforms
      }
    });
  }
  const tex = resources.items["matcap-black"];
  tex.colorSpace = LinearSRGBColorSpace;
  tex.generateMipmaps = false;
  return new ShaderMaterial({
    vertexShader: matcapVertexShader,
    fragmentShader: matcapFragmentShader,
    transparent: true,
    uniforms: {
      uMatcap: { value: tex },
      ...uniforms
    }
  });
}, "getMaterial");
const assignMatcap = /* @__PURE__ */ __name((child) => {
  let tex = null;
  if (child.name === "black") {
    tex = resources.items["matcap-black"];
  } else if (child.name === "gray") {
    tex = resources.items["matcap-gray"];
  } else if (child.name === "skin") {
    tex = resources.items["matcap-skin"];
  } else if (child.name === "white") {
    tex = resources.items["matcap-white"];
  }
  if (tex) {
    tex.colorSpace = LinearSRGBColorSpace;
    child.userData.matcap = tex;
    return true;
  }
  return false;
}, "assignMatcap");
const setupMesh = /* @__PURE__ */ __name(() => {
  if (mesh) return;
  const resource = resources.items["avatar-model"];
  mesh = cloneSkeleton(resource.scene.children[0]);
  mesh.frustumCulled = false;
  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = getMaterial(child.name);
      if (!mat) return;
      child.material = mat;
      child.frustumCulled = false;
      child.renderOrder = child.name === "face" ? 25 : 24;
      const hasMatcap = assignMatcap(child);
      if (hasMatcap) {
        child.onBeforeRender = () => {
          child.material.uniforms.uMatcap.value = child.userData.matcap;
        };
      }
    }
  });
  const brain = mesh.getObjectByName("brain");
  if (brain) {
    mesh.remove(brain);
  }
  mesh.rotation.z = 0;
  transform.add(mesh);
  rightHandBone = mesh.getObjectByName("bone-right-hand");
  scene.instance.add(transform);
}, "setupMesh");
const tick = /* @__PURE__ */ __name(() => {
  animations.update();
  const isContact = sceneWeights.contact > 1e-3;
  if (isContact) {
    transform.position.copy(contactPosition);
    transform.rotation.copy(contactRotation);
    uniforms.uProgress.value = 0;
    uniforms.uAmbientStrength.value = 0;
    transform.visible = true;
    return;
  }
  transform.position.copy(waypointsPosition);
  transform.rotation.copy(waypointsRotation);
  uniforms.uProgress.value = aboutProgress.value * 1.1 - 0.1;
  uniforms.uAmbientStrength.value = sceneWeightsInOut.about.in;
  if (!mesh) return;
  mesh.visible = true;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  face.destroy();
  gsap.ticker.remove(tick);
}, "destroy");
const avatar = {
  init,
  destroy,
  getMesh: /* @__PURE__ */ __name(() => mesh, "getMesh"),
  getRightHandBone: /* @__PURE__ */ __name(() => rightHandBone, "getRightHandBone"),
  tIdleIntensity,
  waypointsPosition,
  waypointsRotation,
  uniforms,
  transform
};
export {
  avatar
};
