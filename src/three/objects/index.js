var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { avatar } from "./avatar";
import { avatarHologram } from "./avatar/hologram";
import { contact } from "./contact";
import { darkPlane } from "./dark-plane";
import { gridFloor } from "./grid-floor";
import { lab } from "./lab";
import { room } from "./room";
import { sleepingSprite } from "./contact/sleeping-sprite";
import { renderer } from "../core/renderer";
const init = /* @__PURE__ */ __name(() => {
  avatarHologram.init();
  avatar.init();
  contact.init();
  darkPlane.init();
  gridFloor.init();
  lab.init();
  room.init();
  sleepingSprite.init();
  renderer.compile();
}, "init");
const destroy = /* @__PURE__ */ __name(() => {
  avatarHologram.destroy();
  avatar.destroy();
  contact.destroy();
  darkPlane.destroy();
  gridFloor.destroy();
  lab.destroy();
  room.destroy();
  sleepingSprite.destroy();
}, "destroy");
const objects = { init, destroy };
export {
  objects
};
