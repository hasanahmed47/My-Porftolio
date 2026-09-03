var __defProp = Object.defineProperty;
var __name = (target2, value) => __defProp(target2, "name", { value, configurable: true });
import gsap from "gsap";
import { Ray, Vector2, Vector3 } from "three";
import { camera } from "../core/camera";
import { threeSizes } from "./sizes";
import { playSound } from "../../features/sounds/utils/sounds";
let hoveringBox = null;
let previousHoveringBox = null;
const boxesToCheck = [];
const pointer = new Vector2();
const ndcPointer = new Vector3();
const ray = new Ray();
const target = new Vector3();
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const updatePointer = /* @__PURE__ */ __name((clientX, clientY) => {
  pointer.x = clientX / threeSizes.width * 2 - 1;
  pointer.y = -(clientY / threeSizes.height) * 2 + 1;
}, "updatePointer");
const performRaycast = /* @__PURE__ */ __name(() => {
  if (!boxesToCheck.length) return;
  camera.instance.updateWorldMatrix(true, false);
  camera.instance.getWorldPosition(ray.origin);
  ndcPointer.set(pointer.x, pointer.y, 0.5).unproject(camera.instance);
  ray.direction.copy(ndcPointer).sub(ray.origin).normalize();
  hoveringBox = null;
  let closestBox = null;
  let closestDistance = Infinity;
  for (const box of boxesToCheck) {
    if (!ray.intersectBox(box, target)) continue;
    const distance = ray.origin.distanceTo(target);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestBox = box;
    }
  }
  if (closestBox) {
    hoveringBox = closestBox;
  }
}, "performRaycast");
const handleClick = /* @__PURE__ */ __name((e) => {
  updatePointer(e.clientX, e.clientY);
  performRaycast();
  if (!hoveringBox || !hoveringBox.onClick) return;
  hoveringBox.onClick();
}, "handleClick");
const handleMouseMove = /* @__PURE__ */ __name((event) => {
  updatePointer(event.clientX, event.clientY);
}, "handleMouseMove");
const tick = /* @__PURE__ */ __name(() => {
  if (!isTouchDevice) {
    performRaycast();
    if (hoveringBox !== previousHoveringBox) {
      if (hoveringBox && hoveringBox.hoverSound && !previousHoveringBox) {
        playSound(hoveringBox.hoverSound);
      }
      previousHoveringBox = hoveringBox;
    }
  }
}, "tick");
const init = /* @__PURE__ */ __name(() => {
  if (!isTouchDevice) {
    gsap.ticker.add(tick);
  }
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("click", handleClick);
}, "init");
const destroy = /* @__PURE__ */ __name(() => {
  if (!isTouchDevice) {
    gsap.ticker.remove(tick);
  }
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("click", handleClick);
}, "destroy");
const raycast = {
  init,
  destroy,
  boxesToCheck,
  getHoveringBox: /* @__PURE__ */ __name(() => hoveringBox, "getHoveringBox")
};
export {
  raycast
};
