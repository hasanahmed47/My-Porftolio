var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import EventEmitter from "./EventEmitter";
const BREAKPOINTS = {
  sm: 480,
  md: 840,
  lg: 1024,
  xl: 1280
};
const BREAKPOINT_ORDER = ["xl", "lg", "md", "sm"];
const getBreakpoint = /* @__PURE__ */ __name((width) => {
  return BREAKPOINT_ORDER.find((key) => width >= BREAKPOINTS[key]) || "sm";
}, "getBreakpoint");
class Sizes extends EventEmitter {
  static {
    __name(this, "Sizes");
  }
  width;
  height;
  pixelRatio;
  breakpoint;
  visible;
  aspectRatio;
  isLandscape;
  resizeObserver;
  constructor() {
    super();
    this.width = 0;
    this.height = 0;
    this.aspectRatio = 0;
    this.pixelRatio = 1;
    this.breakpoint = "md";
    this.visible = true;
    this.isLandscape = false;
    this.resizeObserver = null;
    this.resize();
    this.init();
  }
  init() {
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this.resizeObserver.observe(document.documentElement);
    window.addEventListener("visibilitychange", this.visibilityChange.bind(this));
    this.resize();
  }
  visibilityChange() {
    this.visible = document.visibilityState === "visible";
    if (this.visible) {
      this.emit("show");
    } else {
      this.emit("hide");
    }
  }
  matchMedia(breakpoint) {
    const breakpointOrder = ["sm", "md", "lg", "xl"];
    const currentIndex = breakpointOrder.indexOf(this.breakpoint);
    const targetIndex = breakpointOrder.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  }
  setViewportUnits() {
    document.documentElement.style.setProperty("--vh", 0.01 * window.innerHeight + "px");
    document.documentElement.style.setProperty("--dvh", 0.01 * window.innerHeight + "px");
    document.documentElement.style.setProperty("--svh", 0.01 * document.documentElement.clientHeight + "px");
    document.documentElement.style.setProperty("--lvh", "1vh");
    document.documentElement.style.setProperty("--vw", 0.01 * window.innerWidth + "px");
    document.documentElement.style.setProperty("--dvw", 0.01 * window.innerWidth + "px");
    document.documentElement.style.setProperty("--svw", 0.01 * document.documentElement.clientWidth + "px");
    document.documentElement.style.setProperty("--lvw", "1vw");
  }
  resize() {
    this.width = Math.max(window.innerWidth, document.documentElement.clientWidth);
    this.height = window.innerHeight;
    this.aspectRatio = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.setViewportUnits();
    this.breakpoint = getBreakpoint(this.width);
    this.emit("resize", { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
    this.isLandscape = window.matchMedia("(orientation: landscape)").matches;
  }
  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    window.removeEventListener("visibilitychange", this.visibilityChange.bind(this));
  }
}
const sizes = new Sizes();
export {
  BREAKPOINTS,
  sizes
};
