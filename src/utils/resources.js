var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { sources } from "../sources";
const isProd = import.meta.env.PROD;
class Resources extends EventEmitter {
  static {
    __name(this, "Resources");
  }
  toLoad = sources.length;
  isReady = false;
  loaded = 0;
  items = {};
  loaders;
  constructor() {
    super();
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      fontLoader: new FontLoader()
    };
  }
  startLoading() {
    if (this.isReady) return;
    for (const source of sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          file.colorSpace = SRGBColorSpace;
          this.sourceLoaded(source, file);
        });
      }
    }
  }
  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    this.emit("progress", this.loaded / this.toLoad);
    if (this.loaded === this.toLoad) {
      this.isReady = true;
      this.emit("ready");
      this.log("All resources loaded");
    }
  }
  log(message) {
    if (isProd) return;
    console.log(`[Resources] ${message}`);
  }
}
const resources = new Resources();
resources.startLoading();
export {
  resources
};
