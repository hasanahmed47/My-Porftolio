var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { PerspectiveCamera, Group, Vector3, Object3D } from "three";
import { threeSizes } from "../utils/sizes";
import { isTouch } from "../../utils/observer";
import gsap from "gsap";
import { scene } from "./scene";
import { waypoints } from "../../animations/waypoints";
import { sceneWeights, sceneWeightsInOut } from "../../animations/scenes";
import { sizes } from "../../utils/sizes";
const PARALLAX_INTENSITY = 1;
const PARALLAX_SPEED = 0.6;
const contactPosition = {
  portrait: new Vector3(0, -8, 12),
  landscape: new Vector3(0, -8.5, 9)
};
const contactFocus = {
  portrait: new Vector3(0, -9.4, 0),
  landscape: new Vector3(0, -10.5, 0)
};
const instance = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.01, 100);
const parallaxGroup = new Group();
scene.instance.add(parallaxGroup);
parallaxGroup.add(instance);
const cursor = { x: 0, y: 0 };
const init = /* @__PURE__ */ __name(() => {
  threeSizes.on("resize", resize);
  resize();
  if (!isTouch()) {
    window.addEventListener("mousemove", handleMouseMove);
  }
  gsap.ticker.add(tick);
  tick();
}, "init");
const handleMouseMove = /* @__PURE__ */ __name((event) => {
  cursor.x = event.clientX / threeSizes.width - 0.5;
  cursor.y = event.clientY / threeSizes.height - 0.5;
}, "handleMouseMove");
const updateParallax = /* @__PURE__ */ __name((object) => {
  const delta = gsap.ticker.deltaRatio();
  const parallaxX = cursor.x * PARALLAX_INTENSITY;
  const parallaxY = -cursor.y * PARALLAX_INTENSITY;
  const byX = (parallaxX - object.position.x) * PARALLAX_SPEED * 0.1 * delta;
  const byY = (parallaxY - object.position.y) * PARALLAX_SPEED * 0.1 * delta;
  if (byX < 0.05 && byX > -0.05) object.position.x += byX;
  if (byY < 0.05 && byY > -0.05) object.position.y += byY;
}, "updateParallax");
const calculateContactTransform = /* @__PURE__ */ __name(() => {
  const isLandscape = sizes.isLandscape;
  const breakpoint = isLandscape ? "landscape" : "portrait";
  const isMd = sizes.matchMedia("md");
  const inProgress = 1 - sceneWeightsInOut.contact.in;
  const outProgress = sceneWeightsInOut.contact.out;
  instance.position.copy(contactPosition[breakpoint]);
  if (isLandscape && isMd) {
    instance.position.y += inProgress * 4;
    instance.position.y -= outProgress * 4;
  }
  instance.lookAt(contactFocus[breakpoint]);
}, "calculateContactTransform");
const tick = /* @__PURE__ */ __name(() => {
  const isContact = sceneWeights.contact > 1e-3;
  if (isContact === false) {
    instance.position.copy(waypoints.position);
    if (sizes.matchMedia("md")) {
      instance.position.y -= sceneWeightsInOut.about.out * 2.75;
    }
  }
  updateParallax(parallaxGroup);
  if (isContact) {
    calculateContactTransform();
  } else {
    instance.lookAt(waypoints.focus);
  }
}, "tick");
const resize = /* @__PURE__ */ __name(() => {
  instance.aspect = threeSizes.width / threeSizes.height;
  instance.updateProjectionMatrix();
}, "resize");
const project = /* @__PURE__ */ __name((point) => {
  const projected = point.clone();
  projected.project(instance);
  const x = projected.x * threeSizes.width * 0.5;
  const y = -projected.y * threeSizes.height * 0.5;
  return { x, y };
}, "project");
const destroy = /* @__PURE__ */ __name(() => {
  threeSizes.off("resize", resize);
  gsap.ticker.remove(tick);
  window.removeEventListener("mousemove", handleMouseMove);
  cursor.x = 0;
  cursor.y = 0;
}, "destroy");
const camera = { init, destroy, instance, parallaxGroup, updateParallax, project };
export {
  camera
};
