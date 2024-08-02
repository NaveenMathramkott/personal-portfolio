import * as THREE from "three";

import App from "../App.js";
import { inputStore } from "../utils/Store.js";
import AudioLoader from "../utils/AudioLoader.js";

export default class AnimationController {
  constructor() {
    this.app = new App();
    this.footAudio = new AudioLoader();
    this.scene = this.app.scene;
    this.avatar = this.app.world.character.avatar;

    inputStore.subscribe((input) => this.onInput(input));

    this.instantiatedAnimations();
  }

  instantiatedAnimations() {
    const idle = this.avatar.animations[0];
    this.mixer = new THREE.AnimationMixer(this.avatar.scene);

    this.animations = new Map();
    this.avatar.animations.forEach((clip) => {
      this.animations.set(clip.name, this.mixer.clipAction(clip));
    });

    this.currentAction = this.animations.get("idle");
    this.currentAction.play();
  }

  playAnimation(name) {
    this.footAudio.playAudio();
    if (this.currentAction === this.animations.get(name)) return;
    const action = this.animations.get(name);
    action.reset();
    action.play();
    action.crossFadeFrom(this.currentAction, 0.2);

    this.currentAction = action;
  }

  onInput(input) {
    if (input.forward || input.backward || input.left || input.right) {
      this.playAnimation("walk");
    } else {
      this.playAnimation("idle");
      this.footAudio.toggleAudio();
    }
  }

  loop(deltaTime) {
    this.mixer.update(deltaTime);
  }
}
