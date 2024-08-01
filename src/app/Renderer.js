import * as THREE from "three";
import App from "./App";
import { sizeStore } from "./utils/Store.js";

export default class Renderer {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.canvas = this.app.canvas;
    this.scene = this.app.scene;
    this.camera = this.app.camera;
    this.sizeStore = sizeStore;
    this.sizes = this.sizeStore.getState();
    this.setInstance();
    this.setResizerListener();
  }
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 0.8;
  }

  setResizerListener() {
    this.sizeStore.subscribe((sizes) => {
      this.instance.setSize(sizes.width, sizes.height);
      this.instance.setPixelRatio(sizes.pixelRatio);
    });
  }

  //loop method for animationFrame
  loop() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
