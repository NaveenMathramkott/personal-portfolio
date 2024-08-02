// import * as THREE from "three";
// import App from "../App";
// import { sizeStore } from "./Store";
// import assetStore from "./AssetStore";

// export default class VideoLoader {
//   constructor() {
//     this.app = new App();
//     this.renderer = this.app.renderer;
//     this.sizeStore = sizeStore;
//     this.sizes = this.sizeStore.getState();
//     this.assetStore = assetStore.getState();
//     this.environment = this.assetStore.loadedAssets.environment;
//     this.renderTarget = new THREE.WebGLRenderTarget(6 * 512, 7 * 512);
//     this.camera = new THREE.PerspectiveCamera(
//       35,
//       this.sizes.width / this.sizes.height,
//       0.1,
//       600
//     );
//     this.camera.position.x = 0;
//     this.camera.position.y = 5;
//     this.camera.position.z = 0;
//     this.camera.lookAt(new THREE.Vector3(10, 5, -10));

//     this.scene = new THREE.Scene();
//     this.scene.background = new THREE.Color(0xd61c4e);
//     this.light = new THREE.DirectionalLight(0xffffff, 2);
//     this.light.position.set(1, 1, 1);
//     this.light.castShadow = true;
//     this.light.shadow.camera.top = 30;
//     this.light.shadow.camera.right = 30;
//     this.light.shadow.camera.left = -30;
//     this.light.shadow.camera.bottom = -30;
//     this.light.shadow.bias = -0.002;
//     this.light.shadow.normalBias = 0.072;
//   }

//   createVideoTexture(videoPath) {
//     if (videoPath) {
//       const video = document.createElement("video");
//       video.src = "/video/video-1.mp4";
//       video.load();
//       video.muted = true;
//       video.play();

//       const videoTexture = new THREE.VideoTexture(video);
//       return videoTexture;
//     }
//   }

//   addVideoToPlaneMesh(videoPath, planeMesh) {
//     this.environmentScene = this.environment.scene;
//     const aboutMesh = this.environment.scene.getObjectByName("about-screen");
//     const videoTexture = this.createVideoTexture(videoPath);
//     console.log("video", planeMesh);
//     if (planeMesh) {
//       planeMesh.material = new THREE.MeshBasicMaterial({
//         map: this.renderTarget.texture,
//       });
//       this.scene.add(planeMesh);
//     }
//   }
//   startPlayer() {
//     this.renderer.instance.setRenderTarget(this.renderTarget);
//     this.renderer.instance.render(this.scene, this.camera);
//     this.renderer.instance.setRenderTarget(null);
//   }
//   loop() {
//     requestAnimationFrame(() => this.startPlayer());
//   }
// }
