var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import EventEmitter from "../../utils/EventEmitter";
class ThreeSizes extends EventEmitter {
  static {
    __name(this, "ThreeSizes");
  }
  width = 0;
  height = 0;
  pixelRatio = 1;
  canvas = null;
  observer = null;
  init(_canvas) {
    this.canvas = _canvas;
    this.observer = new ResizeObserver(this.resize.bind(this));
    this.observer.observe(this.canvas);
  }
  resize() {
    const rect = this.canvas?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    this.width = rect?.width ?? 0;
    this.height = rect?.height ?? 0;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.emit("resize", { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
  }
  destroy() {
    this.observer?.disconnect();
    this.observer = null;
    this.canvas = null;
  }
}
const threeSizes = new ThreeSizes();
export {
  threeSizes
};
