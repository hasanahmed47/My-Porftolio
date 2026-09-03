var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { waypoints } from "./waypoints";
import { scenes } from "./scenes";
import { about } from "./transitions/about";
import { contact } from "./transitions/contact";
import { intro } from "./intro";
const transitions = {
  about,
  contact
};
let isInitialized = false;
const init = /* @__PURE__ */ __name(() => {
  if (isInitialized) return;
  scenes.init();
  waypoints.init();
  intro.play();
  isInitialized = true;
}, "init");
const destroy = /* @__PURE__ */ __name(() => {
  if (!isInitialized) return;
  scenes.destroy();
  waypoints.destroy();
  isInitialized = false;
}, "destroy");
const animations = { init, destroy };
export {
  animations,
  transitions
};
