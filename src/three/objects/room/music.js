var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Box3, Mesh } from "three";
import { raycast } from "../../utils/raycast";
import { isFeatureEnabled } from "../../../utils/features";
import { room } from ".";
import { soundsEnabled } from "../../../hooks/useHowler";
import { notes } from "./notes";
import { playSound } from "../../../features/sounds/utils/sounds";
let mesh = null;
let box3 = null;
const handleClick = /* @__PURE__ */ __name(() => {
  soundsEnabled.value = !soundsEnabled.value;
  playSound("click");
}, "handleClick");
const init = /* @__PURE__ */ __name((_mesh) => {
  mesh = _mesh;
  room.group.add(mesh);
  if (isFeatureEnabled("sounds")) {
    box3 = new Box3().setFromObject(mesh);
    box3.onClick = handleClick;
    box3.hoverSound = "hover";
    raycast.boxesToCheck.push(box3);
  }
  notes.init({
    x: mesh.position.x,
    y: mesh.position.y,
    z: mesh.position.z
  });
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!mesh || !box3) return;
  box3.setFromObject(mesh);
  box3.expandByScalar(0.15);
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  if (box3) {
    raycast.boxesToCheck.splice(raycast.boxesToCheck.indexOf(box3), 1);
  }
  box3 = null;
  notes.destroy();
}, "destroy");
const music = {
  init,
  tick,
  destroy
};
export {
  music
};
