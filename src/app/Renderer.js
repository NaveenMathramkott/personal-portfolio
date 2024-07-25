import * as THREE from "three";
import App from "./App";
import { sizeStore } from "./utils/Store";

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
    // initialising renderer
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
