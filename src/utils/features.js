var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const features = {
  sounds: true,
  introWave: true,
  startProject: true
};
const isFeatureEnabled = /* @__PURE__ */ __name((feature) => {
  return features[feature];
}, "isFeatureEnabled");
export {
  features,
  isFeatureEnabled
};
