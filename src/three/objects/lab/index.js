var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { Group, Mesh, Vector3, Color } from "three";
import { scene } from "../../core/scene";
import { labShine } from "./shine";
import { labBase } from "./base";
import { labParticles } from "./particles";
import { labElectric } from "./electric";
import { labPlane } from "./plane";
import { DigitalNumbers } from "../digital-numbers";
import { aboutProgress } from "../../../animations/transitions/about";
import gsap from "gsap";
const group = new Group();
let objects = null;
let aboutNumbers = null;
const init = /* @__PURE__ */ __name(() => {
  if (objects) return;
  const resource = resources.items["lab-model"];
  objects = {
    base: resource.scene.children.find((child) => child.name === "base"),
    shine: resource.scene.children.find((child) => child.name === "shine"),
    display: resource.scene.children.find((child) => child.name === "display"),
    electric: resource.scene.children.find((child) => child.name === "electric")
  };
  Object.values(objects).forEach((object) => {
    if (object.name === "shine") object.renderOrder = 30;
    if (object.name === "electric") object.renderOrder = 25;
    if (object.name === "base") object.renderOrder = 20;
    if (object.name === "display") object.renderOrder = 21;
    group.add(object);
  });
  scene.instance.add(group);
  if (objects?.shine) labShine.init(objects.shine);
  if (objects?.base) labBase.init(objects.base, objects.display);
  if (objects?.electric) labElectric.init(objects.electric);
  labParticles.init();
  labPlane.init();
  if (labPlane.mesh) {
    group.add(labPlane.mesh);
  }
  aboutNumbers = new DigitalNumbers({
    count: 3,
    scene: group,
    position: new Vector3(0, -0.23, 1.07),
    scale: 0.17,
    renderOrder: 22,
    color: new Color("#bae9ff")
  });
  aboutNumbers.updateFrames(0);
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!aboutNumbers) return;
  const value = Math.floor(aboutProgress.value * 100);
  aboutNumbers.updateFrames(value);
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
  labShine.destroy();
  labBase.destroy();
  labElectric.destroy();
  labParticles.destroy();
  labPlane.destroy();
  aboutNumbers?.destroy();
  aboutNumbers = null;
  group.clear();
}, "destroy");
const lab = { init, destroy, group };
export {
  lab
};
