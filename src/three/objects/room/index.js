var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { scene } from "../../core/scene";
import { Euler, Group, Mesh } from "three";
import { getRoomMaterial } from "../../common/materials";
import { sceneWeights } from "../../../animations/scenes";
import gsap from "gsap";
import { shadow } from "./shadow";
import { desktops } from "./desktops";
import { mouse } from "./mouse";
import { messagePopup } from "./message-popup";
import { penguin } from "./penguin";
import { music } from "./music";
const group = new Group();
const chairScrollRotation = new Euler();
let objects = null;
const init = /* @__PURE__ */ __name(() => {
  gsap.ticker.add(tick);
  initObjects();
  shadow.init();
  desktops.init();
  messagePopup.init();
  if (objects?.mouse) mouse.init(objects.mouse);
  if (objects?.penguin)
    penguin.init(objects.penguin, { left: objects["penguin-wing-left"], right: objects["penguin-wing-right"] });
  if (objects?.music) music.init(objects.music);
}, "init");
const initObjects = /* @__PURE__ */ __name(() => {
  if (objects) return;
  const resource = resources.items["room-model"];
  const penguin2 = resource.scene.children.find((child) => child.name === "penguin");
  objects = {
    blackboard: resource.scene.children.find((child) => child.name === "blackboard"),
    carpet: resource.scene.children.find((child) => child.name === "carpet"),
    chair: resource.scene.children.find((child) => child.name === "chair"),
    frame: resource.scene.children.find((child) => child.name === "frame"),
    mouse: resource.scene.children.find((child) => child.name === "mouse"),
    music: resource.scene.children.find((child) => child.name === "music"),
    plant: resource.scene.children.find((child) => child.name === "plant"),
    room: resource.scene.children.find((child) => child.name === "room"),
    shelf: resource.scene.children.find((child) => child.name === "shelf"),
    penguin: penguin2,
    "penguin-wing-left": penguin2.children.find((child) => child.name === "penguin-wing-left"),
    "penguin-wing-right": penguin2.children.find((child) => child.name === "penguin-wing-right")
  };
  Object.values(objects).forEach((object) => {
    if (!object) return;
    const mat = getRoomMaterial();
    object.material = mat;
    group.add(object);
    if (object.name === "carpet") {
      object.renderOrder = -10;
      object.onBeforeRender = () => {
        mat.depthWrite = false;
      };
      object.onAfterRender = () => {
        mat.depthWrite = true;
      };
    }
  });
  scene.instance.add(group);
}, "initObjects");
const tick = /* @__PURE__ */ __name(() => {
  group.visible = sceneWeights.hero > 1e-3;
  if (objects?.chair) {
    objects.chair.rotation.copy(chairScrollRotation);
  }
  penguin.tick();
  music.tick();
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
  shadow.destroy();
  desktops.destroy();
  mouse.destroy();
  penguin.destroy();
  music.destroy();
}, "destroy");
const room = { init, destroy, group, chairScrollRotation };
export {
  room
};
