var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const mix = /* @__PURE__ */ __name((a, b, t) => {
  return a + (b - a) * t;
}, "mix");
const lerp = /* @__PURE__ */ __name((a, b, t) => {
  return a + (b - a) * t;
}, "lerp");
const clamp = /* @__PURE__ */ __name((value, min, max) => {
  return Math.max(min, Math.min(value, max));
}, "clamp");
export {
  clamp,
  lerp,
  mix
};
