var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { Group, Mesh } from "three";
import gsap from "gsap";
import { sceneWeights } from "../../../animations/scenes";
import { scene } from "../../core/scene";
import { getContactMaterial } from "../../common/materials";
import { shadow } from "./shadow";
const group = new Group();
group.position.set(1, -13, 0);
group.rotation.set(0, -0.8, 0);
let objects = null;
const init = /* @__PURE__ */ __name(() => {
  initObjects();
  shadow.init();
  gsap.ticker.add(tick);
}, "init");
const initObjects = /* @__PURE__ */ __name(() => {
  if (objects) return;
  const resource = resources.items["contact-model"];
  objects = {
    base: resource.scene.children.find((child) => child.name === "base")
  };
  Object.values(objects).forEach((object) => {
    const mat = getContactMaterial();
    object.material = mat;
    group.add(object);
  });
  scene.instance.add(group);
}, "initObjects");
const tick = /* @__PURE__ */ __name(() => {
  group.visible = sceneWeights.contact > 1e-3;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
  shadow.destroy();
}, "destroy");
const contact = { init, tick, destroy, group };
export {
  contact
};
