var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import gsap from "gsap";
const sceneWeights = {
  hero: 1,
  about: 0,
  "about-1": 0,
  "about-2": 0,
  projects: 0,
  contact: 0
};
const sceneWeightKeys = Object.keys(sceneWeights);
const sceneWeightsInOut = {
  hero: {
    in: 1,
    out: 0
  },
  about: {
    in: 0,
    out: 0
  },
  "about-1": {
    in: 0,
    out: 0
  },
  "about-2": {
    in: 0,
    out: 0
  },
  contact: {
    in: 0,
    out: 0
  }
};
const init = /* @__PURE__ */ __name(() => {
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  for (const key of sceneWeightKeys) {
    const inOut = sceneWeightsInOut[key];
    if (!inOut) continue;
    sceneWeights[key] = Math.max(0, Math.min(1, inOut.in * (1 - inOut.out)));
  }
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const scenes = { init, destroy };
export {
  sceneWeights,
  sceneWeightsInOut,
  scenes
};
