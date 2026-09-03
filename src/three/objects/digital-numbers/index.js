var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { PlaneGeometry, ShaderMaterial, InstancedMesh, Matrix4, InstancedBufferAttribute, Color } from "three";
import vertexShader from "../../shaders/digital-numbers/vertex.glsl";
import fragmentShader from "../../shaders/digital-numbers/fragment.glsl";
import { resources } from "../../../utils/resources";
import { sizes } from "../../../utils/sizes";
import gsap from "gsap";
class DigitalNumbers {
  static {
    __name(this, "DigitalNumbers");
  }
  count;
  scene;
  position;
  scale;
  renderOrder;
  color;
  mesh = null;
  geometry = null;
  material = null;
  frameAttribute = null;
  currentNumber = 0;
  uniforms = {
    uTexture: { value: null },
    uColor: { value: new Color(1, 1, 1) }
  };
  constructor(props) {
    this.count = props.count;
    this.scene = props.scene;
    this.position = props.position;
    this.scale = props.scale;
    this.renderOrder = props.renderOrder || 22;
    this.color = props.color || new Color(1, 1, 1);
    this.uniforms.uColor.value = this.color;
    this.init();
    gsap.ticker.add(this.tick.bind(this));
  }
  init() {
    this.geometry = new PlaneGeometry(1, 1);
    const texture = resources.items["numbers-bitmap"];
    texture.generateMipmaps = false;
    this.uniforms.uTexture.value = texture;
    this.material = new ShaderMaterial({
      transparent: true,
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    });
    this.mesh = new InstancedMesh(this.geometry, this.material, this.count);
    this.mesh.renderOrder = this.renderOrder;
    this.mesh.scale.set(this.scale, this.scale, this.scale);
    const centerIndex = Math.floor(this.count / 2);
    const spacing = 0.92;
    const matrix = new Matrix4();
    for (let i = 0; i < this.count; i++) {
      const offset = (i - centerIndex) * spacing;
      matrix.makeTranslation(offset, 0, 0);
      this.mesh.setMatrixAt(i, matrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    const frameArray = new Float32Array(this.count);
    this.frameAttribute = new InstancedBufferAttribute(frameArray, 1);
    this.geometry.setAttribute("frame", this.frameAttribute);
    this.mesh.renderOrder = 22;
    this.mesh.position.copy(this.position);
    this.scene.add(this.mesh);
  }
  updateFrames(number) {
    if (!this.frameAttribute || number === this.currentNumber) return;
    this.currentNumber = number;
    const numStr = number.toString();
    const digits = numStr.split("").map(Number);
    const paddedDigits = [];
    for (let i = 0; i < this.count; i++) {
      const digitIndex = i - (this.count - digits.length);
      paddedDigits[i] = digitIndex >= 0 ? digits[digitIndex] : 0;
    }
    for (let i = 0; i < this.count; i++) {
      this.frameAttribute.setX(i, paddedDigits[i]);
    }
    this.frameAttribute.needsUpdate = true;
  }
  tick() {
    if (!this.mesh) return;
    this.mesh.visible = sizes.isLandscape;
  }
  destroy() {
    gsap.ticker.remove(this.tick);
  }
}
export {
  DigitalNumbers
};
