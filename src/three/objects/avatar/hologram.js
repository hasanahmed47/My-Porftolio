var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { Mesh, Matrix4, Vector3, BufferAttribute, Group, SkinnedMesh } from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { getMaterial as getHologramMaterial, uniforms as hologramUniforms } from "./hologram-material";
import gsap from "gsap";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { sceneWeights } from "../../../animations/scenes";
import { avatar } from ".";
import { aboutProgress } from "../../../animations/transitions/about";
const GEOMETRY_NAMES = ["black", "gray", "skin", "white", "head", "brain"];
let mesh = null;
let material = null;
let geometry = null;
let skeleton = null;
const currentProgress = { value: 0 };
const transform = new Group();
const init = /* @__PURE__ */ __name(() => {
  setupSkeleton();
  setupGeometry();
  setupMesh();
  gsap.ticker.add(tick);
}, "init");
const setupSkeleton = /* @__PURE__ */ __name(() => {
  if (skeleton) return;
  const resource = resources.items["avatar-model"];
  const cloned = cloneSkeleton(resource.scene.children[0]);
  const black = cloned.getObjectByName("black");
  skeleton = black.skeleton;
}, "setupSkeleton");
const setupGeometry = /* @__PURE__ */ __name(() => {
  if (geometry) return;
  const resource = resources.items["avatar-model"];
  const geometries = [];
  resource.scene.children[0].traverse((child) => {
    if (child instanceof Mesh && GEOMETRY_NAMES.includes(child.name)) {
      const geometry2 = child.geometry.clone();
      geometries.push(geometry2);
    }
  });
  geometry = mergeGeometries(geometries);
  geometry.toNonIndexed();
  const vectors = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];
  const position = geometry.attributes.position;
  const centers = new Float32Array(position.count * 3);
  for (let i = 0, l = position.count; i < l; i++) {
    vectors[i % 3].toArray(centers, i * 3);
  }
  geometry.setAttribute("center", new BufferAttribute(centers, 3));
}, "setupGeometry");
const setupMesh = /* @__PURE__ */ __name(() => {
  if (mesh) return;
  material = getHologramMaterial();
  mesh = new SkinnedMesh(geometry, material);
  mesh.bind(skeleton, new Matrix4());
  mesh.add(skeleton.bones[0]);
  const resource = resources.items["avatar-model"];
  mesh.rotation.copy(resource.scene.children[0].rotation);
  mesh.scale.copy(resource.scene.children[0].scale);
  mesh.rotation.z = 0;
  mesh.frustumCulled = false;
  mesh.renderOrder = 23;
  avatar.transform.add(transform);
  transform.add(mesh);
}, "setupMesh");
const tick = /* @__PURE__ */ __name(() => {
  hologramUniforms.uTime.value = gsap.ticker.time;
  hologramUniforms.uProgress.value = aboutProgress.value * 1.1 - 0.1;
  if (!mesh) return;
  mesh.visible = sceneWeights.about > 1e-3;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const avatarHologram = {
  init,
  destroy,
  getMesh: /* @__PURE__ */ __name(() => mesh, "getMesh"),
  getMaterial: /* @__PURE__ */ __name(() => material, "getMaterial"),
  currentProgress,
  transform
};
export {
  avatarHologram
};
