import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import App from "./App";

export default class Camera {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.canvas = this.app.canvas;
    this.setInstance();
    this.setControls();
  }
  setInstance() {
    // initialising perspective camera
    this.instance = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
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
  //loop method for animationFrame
  loop() {
    this.controls.update();
    console.log("hll");
  }
}
