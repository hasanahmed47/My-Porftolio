var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { sounds as items, pools } from "../definitions/sounds";
import { sprites } from "../definitions/sprites";
import { isFeatureEnabled } from "../../../utils/features";
const getSoundsHowl = /* @__PURE__ */ __name((sound) => {
  const data = items[sound];
  if ("spriteKey" in data) {
    return sprites[data.spriteKey].howl;
  }
  return data.howl;
}, "getSoundsHowl");
const playPoolSound = /* @__PURE__ */ __name((poolKey) => {
  const pool = pools[poolKey];
  const randomSound = pool[Math.floor(Math.random() * pool.length)];
  playSound(randomSound);
}, "playPoolSound");
const playSound = /* @__PURE__ */ __name((key) => {
  if (!isFeatureEnabled("sounds")) return;
  if (key in pools) {
    playPoolSound(key);
    return;
  }
  const data = items[key];
  if (!data) return;
  const howl = getSoundsHowl(key);
  let id;
  if ("spriteKey" in data) {
    id = howl.play(data.name);
  } else {
    id = howl.play();
  }
  return id;
}, "playSound");
export {
  getSoundsHowl,
  playSound
};
