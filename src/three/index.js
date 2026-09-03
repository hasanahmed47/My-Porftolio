var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";
import { raycast } from "./utils/raycast";
let canvas = null;
const init = /* @__PURE__ */ __name((_canvas) => {
  canvas = _canvas;
  resources.once("ready", () => {
    threeSizes.init(_canvas);
    camera.init();
    renderTarget.init();
    renderer.init(canvas);
    objects.init();
    raycast.init();
  });
}, "init");
const destroy = /* @__PURE__ */ __name(() => {
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
  canvas = null;
}, "destroy");
const three = { init, destroy };
export {
  three
};
