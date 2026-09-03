var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { projectVisible } from "../../../hooks/useRouteObserver";
import { clamp } from "../../../utils/math";
import { sceneWeights } from "../../../animations/scenes";
import { sprites } from "../definitions/sprites";
const tick = /* @__PURE__ */ __name(() => {
  const volume = projectVisible.value ? 0 : clamp(sceneWeights.hero * 0.75, 0, 1);
  sprites.room.howl.volume(volume);
}, "tick");
export {
  tick
};
