var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Box3, Mesh, ShaderMaterial, LinearSRGBColorSpace, LinearFilter } from "three";
import { raycast } from "../../utils/raycast";
import { planeGeometry } from "../../common/geometries";
import { resources } from "../../../utils/resources";
import gsap from "gsap";
import vertexShader from "../../shaders/heart/vertex.glsl";
import fragmentShader from "../../shaders/heart/fragment.glsl";
import { room } from ".";
import { playSound } from "../../../features/sounds/utils/sounds";
let mesh = null;
let box3 = null;
let isJumping = false;
let wings = null;
let heart = null;
let heartMaterial = null;
let initialized = false;
const init = /* @__PURE__ */ __name((_mesh, _wings) => {
  mesh = _mesh;
  wings = _wings;
  if (initialized) return;
  initialized = true;
  mesh.add(wings.left);
  mesh.add(wings.right);
  initHeart();
  box3 = new Box3().setFromObject(mesh);
  box3.onClick = handleClick;
  box3.hoverSound = "hover";
  raycast.boxesToCheck.push(box3);
}, "init");
const initHeart = /* @__PURE__ */ __name(() => {
  if (!mesh) return;
  const texture = resources.items["icon-spritesheet"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  heartMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      uProgress: { value: 0 }
    }
  });
  heart = new Mesh(planeGeometry, heartMaterial);
  heart.position.copy(mesh.position);
  heart.position.x += 0.1;
  heart.position.y += 0.4;
  heart.position.z += 0.1;
  heart.visible = false;
  room.group.add(heart);
}, "initHeart");
const handleClick = /* @__PURE__ */ __name(() => {
  if (isJumping || !mesh || !wings) return;
  isJumping = true;
  const tl = gsap.timeline();
  playSound("bird");
  tl.add(() => {
    isJumping = false;
  }, 0.8);
  tl.to(
    mesh.position,
    {
      y: 2,
      duration: 0.4,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    },
    0
  );
  tl.to(
    wings.left.rotation,
    {
      x: 0.4,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true
    },
    0
  );
  tl.to(
    wings.left.position,
    {
      y: 0.05,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true
    },
    0
  );
  tl.to(
    wings.right.rotation,
    {
      x: -0.4,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true
    },
    0
  );
  tl.to(
    wings.right.position,
    {
      y: 0.05,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true
    },
    0
  );
  if (heart && heartMaterial && heartMaterial.uniforms.uProgress) {
    tl.set(heartMaterial.uniforms.uProgress, { value: 0 }, 0);
    tl.set(heart, { visible: true }, 0);
    tl.to(
      heartMaterial.uniforms.uProgress,
      {
        value: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      0
    );
    tl.set(heartMaterial.uniforms.uProgress, { value: 1 });
  }
}, "handleClick");
const tick = /* @__PURE__ */ __name(() => {
  if (!mesh || !box3) return;
  box3.setFromObject(mesh);
  box3.expandByScalar(0.15);
  if (heart && heartMaterial && heartMaterial.uniforms.uProgress) {
    const progress = heartMaterial.uniforms.uProgress.value;
    if (progress <= 1e-3 || progress >= 0.999) {
      heart.visible = false;
    } else {
      heart.visible = true;
    }
  }
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  if (box3) {
    raycast.boxesToCheck.splice(raycast.boxesToCheck.indexOf(box3), 1);
  }
  box3 = null;
}, "destroy");
const penguin = { init, tick, destroy };
export {
  penguin
};
