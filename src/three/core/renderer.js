var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { WebGLRenderer, Vector3 } from "three";
import gsap from "gsap";
import { scene } from "./scene";
import { renderTarget } from "./renderTarget";
import { camera } from "./camera";
import { sceneWeights } from "../../animations/scenes";
import { colors } from "../common/colors";
import { threeSizes } from "../utils/sizes";
let instance = null;
let canvas = null;
let visible = true;
let isActive = false;
const emptyVector = new Vector3();
const init = /* @__PURE__ */ __name((_canvas) => {
  if (instance) return;
  canvas = _canvas;
  instance = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false
  });
  gsap.ticker.add(tick);
  threeSizes.on("resize", resize);
  resize();
}, "init");
const getInstance = /* @__PURE__ */ __name(() => {
  if (!instance) throw new Error("Renderer not initialized");
  return instance;
}, "getInstance");
const resize = /* @__PURE__ */ __name(() => {
  if (!instance) return;
  instance.setSize(threeSizes.width, threeSizes.height, false);
  instance.setPixelRatio(threeSizes.pixelRatio);
}, "resize");
const tick = /* @__PURE__ */ __name(() => {
  const shouldBeVisible = !camera.instance.position.equals(emptyVector) && isActive;
  if (canvas && shouldBeVisible !== visible) {
    canvas.style.visibility = shouldBeVisible ? "visible" : "hidden";
    visible = shouldBeVisible;
  }
  if (!instance || !shouldBeVisible) return;
  if (sceneWeights.about > 1e-3) {
    renderTarget.render();
  }
  const color = sceneWeights.contact > 1e-3 ? colors.beigeDark : colors.beigeLight;
  instance.setClearColor(color);
  instance.render(scene.instance, camera.instance);
}, "tick");
const compile = /* @__PURE__ */ __name(async () => {
  await Promise.all([compileScene(camera.instance, scene.instance), compileScene(camera.instance, renderTarget.scene)]);
}, "compile");
const setIsActive = /* @__PURE__ */ __name((value) => {
  isActive = value;
}, "setIsActive");
const compileScene = /* @__PURE__ */ __name(async (camera2, sceneToCompile) => {
  if (!instance) {
    console.error("Renderer not initialized");
    return;
  }
  return new Promise(async (resolve) => {
    if (!instance) {
      return;
    }
    const invisibleObjects = [];
    const instancedWithOriginalCullState = [];
    sceneToCompile.traverse((child) => {
      if (child.visible === false) {
        invisibleObjects.push(child);
        child.visible = true;
      }
      if (child.frustumCulled === true) {
        instancedWithOriginalCullState.push([child, child.frustumCulled]);
        child.frustumCulled = false;
      }
    });
    instance.compile(sceneToCompile, camera2);
    invisibleObjects.forEach((child) => child.visible = false);
    instancedWithOriginalCullState.forEach(([child, originalState]) => {
      child.frustumCulled = originalState;
    });
    renderTarget.render();
    resolve();
  });
}, "compileScene");
const destroy = /* @__PURE__ */ __name(() => {
  if (!instance) return;
  instance.dispose();
  gsap.ticker.remove(tick);
  instance = null;
  visible = true;
}, "destroy");
const renderer = { init, destroy, getInstance, compile, setIsActive };
export {
  renderer
};
