var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { resources } from "../../../utils/resources";
import { room } from ".";
import { getShadowMaterial } from "../../common/materials";
import { colors } from "../../common/colors";
import { Color } from "three";
const backgroundColor = colors.beigeLight.clone().convertLinearToSRGB();
const shadowColor = new Color("rgb(215, 194, 169)");
const init = /* @__PURE__ */ __name(() => {
  initObjects();
}, "init");
const initObjects = /* @__PURE__ */ __name(() => {
  const resource = resources.items["room-model"];
  const texture = resources.items["room-shadow-texture"];
  texture.flipY = false;
  const mesh = resource.scene.children.find((child) => child.name === "shadow-catcher");
  if (!mesh) return;
  mesh.material = getShadowMaterial();
  mesh.onBeforeRender = () => {
    mesh.material.uniforms.uTexture.value = texture;
    mesh.material.uniforms.uColorBackground.value = backgroundColor;
    mesh.material.uniforms.uColorShadow.value = shadowColor;
  };
  mesh.renderOrder = -1e3;
  room.group.add(mesh);
}, "initObjects");
const destroy = /* @__PURE__ */ __name(() => {
}, "destroy");
const shadow = { init, destroy };
export {
  shadow
};
