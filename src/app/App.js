import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./utils/Loop";
import World from "./stage/World";
import Resize from "./utils/Resize";
import AssetLoader from "./utils/AssetLoader";

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
