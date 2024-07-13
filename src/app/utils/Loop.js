import App from "../App";

export default class Loop {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.camera = this.app.camera;
    this.renderer = this.app.renderer;

    this.loop();
  }
  //initialising loop method frame
  loop() {
    this.camera.loop();
    this.renderer.loop();
    // using callback function instead of normal function
    window.requestAnimationFrame(() => this.loop());
  }
}
