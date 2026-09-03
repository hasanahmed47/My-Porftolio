var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";
import { animations as avatarAnimations } from "../../three/objects/avatar/animations";
import { createMatchMedia } from "../utils/matchMedia";
let inTl = null;
let outTl = null;
let wakeUpMm = null;
const setup = /* @__PURE__ */ __name((contact2) => {
  inTl = gsap.timeline({
    scrollTrigger: {
      trigger: contact2,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true
    }
  });
  inTl.fromTo(sceneWeightsInOut.contact, { in: 0 }, { in: 1, duration: 1, ease: "none" }, 0);
  outTl = gsap.timeline({
    scrollTrigger: {
      trigger: contact2,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true
    }
  });
  outTl.fromTo(sceneWeightsInOut.contact, { out: 0 }, { out: 1, duration: 1, ease: "none" }, 0);
  wakeUpMm = createMatchMedia((_context, { isMobile }) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contact2,
        start: isMobile ? "top 10%" : "top 15%"
      }
    });
    tl.call(avatarAnimations.wakeUp, [0.25]);
  });
}, "setup");
const destroy = /* @__PURE__ */ __name(() => {
  if (inTl) {
    inTl.kill();
    inTl = null;
  }
  if (outTl) {
    outTl.kill();
    outTl = null;
  }
  if (wakeUpMm) {
    wakeUpMm.kill();
    wakeUpMm = null;
  }
}, "destroy");
const contact = { setup, destroy };
export {
  contact
};
