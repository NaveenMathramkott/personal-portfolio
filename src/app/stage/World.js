import * as THREE from "three";
import App from "../App";
import Physics from "./Physics";
import { appStateStore } from "../utils/Store";
import Character from "./Character";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = new Physics();

    // create world classes
    const unsub = appStateStore.subscribe((state) => {
      if (state.physicsReady && state.assetsReady) {
        this.character = new Character();

        unsub();
      }
    });
    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
  }
}
