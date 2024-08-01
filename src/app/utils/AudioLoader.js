import * as THREE from "three";

export default class AudioLoader {
  constructor() {
    this.audioLoader = new THREE.AudioLoader();
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.isAudioPlaying = false;
    this.loadAudio();
  }

  loadAudio() {
    this.audioLoader.load("/audio/foot.mp3", (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true); // Loop the audio if desired
      this.sound.setVolume(0.3); // Set the volume
    });
  }
  toggleAudio() {
    if (this.isAudioPlaying) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }
  playAudio() {
    this.sound.play();
    this.isAudioPlaying = true;
  }
  pauseAudio() {
    this.sound.pause();
    this.isAudioPlaying = false;
  }
}
