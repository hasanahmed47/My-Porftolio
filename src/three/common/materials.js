import { MeshBasicMaterial, ShaderMaterial } from "three";
import { resources } from "../../utils/resources";
import shadowVertexShader from "../shaders/shadow-catcher/vertex.glsl";
import shadowFragmentShader from "../shaders/shadow-catcher/fragment.glsl";

let roomMaterial = null;
let contactMaterial = null;
let shadowMaterial = null;

function getRoomMaterial() {
  if (roomMaterial) return roomMaterial;
  const texture = resources.items["room-texture"];
  texture.flipY = false;
  roomMaterial = new MeshBasicMaterial({ map: texture });
  return roomMaterial;
}

function getContactMaterial() {
  if (contactMaterial) return contactMaterial;
  const texture = resources.items["contact-texture"];
  texture.flipY = false;
  contactMaterial = new MeshBasicMaterial({ map: texture });
  return contactMaterial;
}

function getShadowMaterial() {
  if (shadowMaterial) return shadowMaterial;
  shadowMaterial = new ShaderMaterial({
    vertexShader: shadowVertexShader,
    fragmentShader: shadowFragmentShader,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      uTexture: { value: null },
      uColorBackground: { value: null },
      uColorShadow: { value: null },
    },
  });
  return shadowMaterial;
}

export { getContactMaterial, getRoomMaterial, getShadowMaterial };