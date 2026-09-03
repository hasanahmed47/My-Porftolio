var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Vector3 } from "three";
import gsap from "gsap";
import { avatar } from "../avatar";
import { room } from ".";
import { sceneWeights } from "../../../animations/scenes";
import { isFeatureEnabled } from "../../../utils/features";
const Y_BOUND = 1.8;
const enabled = {
  value: !isFeatureEnabled("introWave")
};
const BOUNDS = {
  x: {
    max: -0.7,
    min: -0.9
  },
  z: {
    max: -0.28,
    min: -0.6
  }
};
const initialPos = new Vector3(0, 0, 0);
const currentPos = new Vector3(0, 0, 0);
let mesh = null;
const init = /* @__PURE__ */ __name((_mesh) => {
  mesh = _mesh;
  initialPos.copy(mesh.position);
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!mesh || !enabled.value) return;
  if (sceneWeights.hero < 0.95) return;
  const bone = avatar.getRightHandBone();
  if (!bone) return;
  bone.getWorldPosition(currentPos);
  room.group.worldToLocal(currentPos);
  if (currentPos.y > Y_BOUND) return;
  if (currentPos.x < BOUNDS.x.min || currentPos.x > BOUNDS.x.max) return;
  if (currentPos.z < BOUNDS.z.min || currentPos.z > BOUNDS.z.max) return;
  mesh.position.copy(currentPos);
  mesh.position.y = initialPos.y;
  mesh.position.z -= 0.15;
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const mouse = { init, destroy, enabled };
export {
  mouse
};
