import * as THREE from "three";

//make an null state  for avoiding infinite loop while calling app class instance inside others like camera
let instance = null;

export default class App {
  constructor() {
    // first check instance null then set to "this"
    if (instance) return instance;
    instance = this;

    // elements
    this.canvas = document.querySelector("canvas.threejs");
    this.scene = new THREE.Scene();

    this.initializeModules();
  }

  async initializeModules() {
    // Load AssetLoader and InputController dynamically
    const { default: AssetLoader } = await import("./utils/AssetLoader.js");
    const { default: InputController } = await import(
      "./UI/InputController.js"
    );

    // Asset Loader
    this.assetLoader = new AssetLoader();
    this.inputController = new InputController();

    // Load World dynamically
    const { default: World } = await import("./stage/World.js");
    this.world = new World();

    // Load Camera and Renderer dynamically
    const { default: Camera } = await import("./Camera.js");
    const { default: Renderer } = await import("./Renderer.js");
    this.camera = new Camera();
    this.renderer = new Renderer();

    // Load utilities dynamically
    const { default: Loop } = await import("./utils/Loop.js");
    const { default: Resize } = await import("./utils/Resize.js");
    this.loop = new Loop();
    this.resize = new Resize();
  }
}
