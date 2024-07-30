import * as THREE from "three";
import App from "../App.js";

export default class Loop {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;
    this.world = this.app.world;
    this.clock = new THREE.Clock();
    this.previousElapsedTime = 0;

    this.loop();
  }
  //initialising loop method frame
  loop() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousElapsedTime;
    this.previousElapsedTime = elapsedTime;
    this.world.loop(deltaTime, elapsedTime);
    this.camera.loop(deltaTime);
    this.renderer.loop();

    // using callback function instead of normal function
    window.requestAnimationFrame(() => this.loop());
  }
}
