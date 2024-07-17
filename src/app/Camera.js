import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import App from "./App";
import { sizeStore } from "./utils/store";

export default class Camera {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.canvas = this.app.canvas;

    this.sizeStore = sizeStore;
    this.sizes = sizeStore.getState();

    this.setInstance();
    this.setControls();
    this.setResizeListener();
  }
  setInstance() {
    // initialising perspective camera
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    );
    this.instance.position.z = 5;
  }
  setControls() {
    // initialising controls
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }
  setResizeListener() {
    this.sizeStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  //loop method for animationFrame
  loop() {
    this.controls.update();
  }
}
