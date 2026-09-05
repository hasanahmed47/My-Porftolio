import { WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import { threeSizes } from "../../utils/sizes";
import { camera as mainCamera } from "../camera";

const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 0,
  depthBuffer: false,
  stencilBuffer: false,
});

const scene = new Scene();
scene.add(mainCamera.parallaxGroup);

function resize() {
  const { width, height, pixelRatio } = threeSizes;
  instance.setSize(width * pixelRatio, height * pixelRatio);
}

function init() {
  threeSizes.on("resize", resize);
  resize();
}

function render() {
  const rendererInstance = renderer.getInstance();
  rendererInstance.setRenderTarget(instance);
  rendererInstance.setClearColor("#0169b4");
  rendererInstance.render(scene, mainCamera.instance);
  rendererInstance.setRenderTarget(null);
}

function destroy() {
  threeSizes.off("resize", resize);
}
const renderTarget = { render, scene, init, instance, destroy };

export { renderTarget };