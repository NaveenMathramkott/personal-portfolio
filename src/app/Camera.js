import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import App from "./App.js";
import { sizeStore } from "./utils/Store.js";
// import ThirdPersonCamera from "./utils/ThirdPersonCamera.js";

export default class Camera {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.canvas = this.app.canvas;

    this.sizeStore = sizeStore;
    this.sizes = this.sizeStore.getState();

    this.initialPosition = new THREE.Vector3();
    this.initialRotation = new THREE.Vector3();

    this.onLookAt = false;

    this.setInstance();
    this.setControls();
    this.setResizeListener();
  }
  setInstance() {
    // initialising perspective camera
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      600
    );
    this.instance.position.z = 5;
    // this.thirdPersonCamera = new ThirdPersonCamera({
    //   camera: this.instance,
    // });
  }

  setResizeListener() {
    this.sizeStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  setControls() {
    // initialising controls
    this.controls = new OrbitControls(this.instance, this.canvas);
    // Enable damping (inertia) for smooth controls
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;

    // Enable zooming
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;
    this.controls.zoomSpeed = 1.0;
    this.controls.rotateSpeed = 1.0;
  }

  setToSpecificPosition(position, rotation) {
    this.onLookAt = true;
    // this.initialPosition.copy(this.instance.position); // Save the current position
    // this.initialPosition.copy(this.instance.rotation); // Save the current position
    this.instance.position.copy(position); // Move to the specific position
    this.instance.rotation.set(rotation); // Move to the specific position
    this.instance.lookAt(position);

    this.isCameraToggled = true;
  }

  returnToInitialPosition() {
    this.onLookAt = false;
    // this.instance.position.copy(this.initialPosition); // Move back to the initial position
    // this.instance.rotation.set(this.initialRotation); // Move back to the initial position
    this.isCameraToggled = false;
  }

  //loop method for animationFrame
  loop() {
    this.controls.update();
    // this.thirdPersonCamera.update();
    this.characterController = this.app.world.characterController?.rigidBody;
    if (this.characterController) {
      const characterPosition = this.characterController.translation();
      const characterRotation = this.characterController.rotation();

      this.cameraOffset = new THREE.Vector3(0, 6, 10);
      this.cameraOffset.applyQuaternion(characterRotation);
      this.cameraOffset.add(characterPosition);

      this.targetOffset = new THREE.Vector3(0, -10, -25);
      this.targetOffset.applyQuaternion(characterRotation);
      this.targetOffset.add(characterPosition);

      if (!this.onLookAt) {
        this.instance.position.lerp(this.cameraOffset, 0.1);
        this.controls.target.lerp(this.targetOffset, 0.1);
      }
    }
  }
}
