import * as THREE from "three";
import App from "./App";

export default class Renderer {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.canvas = this.app.canvas;
    this.scene = this.app.scene;
    this.camera = this.app.camera;
    this.setInstance();
  }
  setInstance() {
    // initialising renderer
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  //loop method for animationFrame
  loop() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
