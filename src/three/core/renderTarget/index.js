var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import { threeSizes } from "../../utils/sizes";
import { camera as mainCamera } from "../camera";
const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 0,
  depthBuffer: false,
  stencilBuffer: false
});
const scene = new Scene();
scene.add(mainCamera.parallaxGroup);
const init = /* @__PURE__ */ __name(() => {
  threeSizes.on("resize", resize);
  resize();
}, "init");
const render = /* @__PURE__ */ __name(() => {
  const rendererInstance = renderer.getInstance();
  rendererInstance.setRenderTarget(instance);
  rendererInstance.setClearColor("#0169b4");
  rendererInstance.render(scene, mainCamera.instance);
  rendererInstance.setRenderTarget(null);
}, "render");
const destroy = /* @__PURE__ */ __name(() => {
  threeSizes.off("resize", resize);
}, "destroy");
const resize = /* @__PURE__ */ __name(() => {
  const { width, height, pixelRatio } = threeSizes;
  instance.setSize(width * pixelRatio, height * pixelRatio);
}, "resize");
const renderTarget = { render, scene, init, instance, destroy };
export {
  renderTarget
};
