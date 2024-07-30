import * as THREE from "three";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Loop from "./utils/Loop.js";
import World from "./stage/World.js";
import Resize from "./utils/Resize.js";
import AssetLoader from "./utils/AssetLoader.js";
import InputController from "./UI/InputController.js";

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

    // Asset Loader
    this.assetLoader = new AssetLoader();
    this.inputController = new InputController();

    //world
    this.world = new World();

    //camera and renderer
    this.camera = new Camera();
    this.renderer = new Renderer();

    //utils
    this.loop = new Loop();
    this.resize = new Resize();
  }
}
