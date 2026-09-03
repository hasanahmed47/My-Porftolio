var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import gsap from "gsap";
import { sizes } from "../utils/sizes";
import { sceneWeights } from "./scenes";
import { points } from "./waypoints-data";
import { Vector3 } from "three";
const position = new Vector3();
const focus = new Vector3();
const init = /* @__PURE__ */ __name(() => {
  updateReferences();
  gsap.ticker.add(tick);
}, "init");
function weightedAverage(points2, weights2) {
  let total = 0, x = 0, y = 0, z = 0;
  for (let i = 0; i < points2.length; i++) {
    const w = weights2[i] ?? 0;
    total += w;
    x += points2[i].x * w;
    y += points2[i].y * w;
    z += points2[i].z * w;
  }
  if (total === 0) total = 1;
  return { x: x / total, y: y / total, z: z / total };
}
__name(weightedAverage, "weightedAverage");
let positions = [];
let focuses = [];
let weights = [];
let resolvedPoints = points.landscape;
function updateReferences() {
  const isLandscape = sizes.isLandscape;
  resolvedPoints = isLandscape ? points.landscape : points.portrait;
  const active = Object.entries(sceneWeights).filter(([key, weight]) => weight > 0 && key in resolvedPoints);
  positions = active.map(([key]) => resolvedPoints[key].position);
  focuses = active.map(([key]) => resolvedPoints[key].focus);
  weights = active.map(([, w]) => w);
}
__name(updateReferences, "updateReferences");
const tick = /* @__PURE__ */ __name(() => {
  updateReferences();
  const finalPos = weightedAverage(positions, weights);
  const finalFocus = weightedAverage(focuses, weights);
  position.set(finalPos.x, finalPos.y, finalPos.z);
  focus.set(finalFocus.x, finalFocus.y, finalFocus.z);
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const waypoints = { init, points, updateReferences, position, focus, destroy };
export {
  waypoints
};
