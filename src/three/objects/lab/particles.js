var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { BufferGeometry, Points, ShaderMaterial, BufferAttribute, Color } from "three";
import vertexShader from "../../shaders/lab-particles/vertex.glsl";
import fragmentShader from "../../shaders/lab-particles/fragment.glsl";
import gsap from "gsap";
import { renderTarget } from "../../core/renderTarget";
import { lab } from ".";
import { aboutProgress } from "../../../animations/transitions/about";
let points = null;
let material = null;
const uniforms = {
  uTime: { value: 0 },
  uScaleMultiplier: { value: 1 }
};
const PARTICLE_COUNT = 50;
const init = /* @__PURE__ */ __name(() => {
  if (points) return;
  const geometry = new BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const offsets = new Float32Array(PARTICLE_COUNT);
  const angles = new Float32Array(PARTICLE_COUNT);
  const radii = new Float32Array(PARTICLE_COUNT);
  const speeds = new Float32Array(PARTICLE_COUNT);
  const drifts = new Float32Array(PARTICLE_COUNT * 2);
  const noiseOffsets = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const blueColor = new Color(0.1, 0.808, 1);
  const BOTTOM_RADIUS = 1;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * BOTTOM_RADIUS;
    angles[i] = angle;
    radii[i] = radius;
    positions[i3] = Math.cos(angle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(angle) * radius;
    offsets[i] = Math.random() * 4;
    speeds[i] = 0.7 + Math.random() * 0.6;
    const driftAmount = 0.3;
    drifts[i * 2] = (Math.random() - 0.5) * driftAmount;
    drifts[i * 2 + 1] = (Math.random() - 0.5) * driftAmount;
    noiseOffsets[i * 3] = Math.random() * 100;
    noiseOffsets[i * 3 + 1] = Math.random() * 100;
    noiseOffsets[i * 3 + 2] = Math.random() * 100;
    sizes[i] = 0.6 + Math.random() * 0.8;
    const intensity = 0.5 + Math.random() * 0.5;
    const color = blueColor.clone().multiplyScalar(intensity);
    const hueVariation = 0.05;
    color.r += (Math.random() - 0.5) * hueVariation;
    color.g += (Math.random() - 0.5) * hueVariation;
    color.b += (Math.random() - 0.5) * hueVariation;
    color.r = Math.max(0, Math.min(1, color.r));
    color.g = Math.max(0, Math.min(1, color.g));
    color.b = Math.max(0, Math.min(1, color.b));
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.setAttribute("offset", new BufferAttribute(offsets, 1));
  geometry.setAttribute("angle", new BufferAttribute(angles, 1));
  geometry.setAttribute("radius", new BufferAttribute(radii, 1));
  geometry.setAttribute("speed", new BufferAttribute(speeds, 1));
  geometry.setAttribute("drift", new BufferAttribute(drifts, 2));
  geometry.setAttribute("noiseOffset", new BufferAttribute(noiseOffsets, 3));
  geometry.setAttribute("size", new BufferAttribute(sizes, 1));
  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexColors: true
  });
  points = new Points(geometry, material);
  points.renderOrder = 22;
  points.frustumCulled = false;
  renderTarget.scene.add(points);
  gsap.ticker.add(tick);
}, "init");
const tick = /* @__PURE__ */ __name(() => {
  if (!material) return;
  material.uniforms.uTime.value = gsap.ticker.time;
  material.uniforms.uScaleMultiplier.value = 0.75 + 0.25 * aboutProgress.value;
  points?.position.copy(lab.group.position);
}, "tick");
const destroy = /* @__PURE__ */ __name(() => {
  gsap.ticker.remove(tick);
}, "destroy");
const labParticles = { init, destroy };
export {
  labParticles
};
