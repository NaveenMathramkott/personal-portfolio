import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./utils/Loop";

//make an var for avoiding infinite loop while calling app class instance inside others like camera
let instance = null;

export default class App {
  constructor() {
    // first check instance null then set to "this"
    if (instance) return instance;
    instance = this;
    // create state for canvas, scene, camera, renderer, loop
    this.canvas = document.querySelector("canvas.threejs");
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.loop = new Loop();
  }
}
