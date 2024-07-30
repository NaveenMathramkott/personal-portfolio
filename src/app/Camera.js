import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import App from "./App.js";
import { sizeStore } from "./utils/Store.js";

export default class Camera {
  constructor() {
    // create an instance of App
    this.app = new App();
    this.canvas = this.app.canvas;

    this.sizeStore = sizeStore;
    this.sizes = sizeStore.getState();

    this.lerpValue = 0.1;
    this.initialPosition = new THREE.Vector3();
    this.specificPosition = new THREE.Vector3(-1.3, 5, 8.1);

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
    this.controls.zoomSpeed = 1.0;

    // Enable rotation
    this.controls.enableRotate = false;
    this.controls.rotateSpeed = 1.0;

    // Optionally, set limits for zoom and rotation
    this.controls.minDistance = 10; // Minimum zoom distance
    // this.controls.maxDistance = 20; // Maximum zoom distance
    // this.controls.minPolarAngle = 0; // Minimum vertical angle
    // this.controls.maxPolarAngle = Math.PI / 2; // Maximum vertical angle (π radians is 180 degrees)
  }

  setToSpecificPosition(targetMesh) {
    this.lerpValue = 0;
    this.initialPosition.copy(this.instance.position); // Save the current position
    this.instance.position.copy(this.specificPosition); // Move to the specific position

    this.isCameraToggled = true;
  }

  returnToInitialPosition() {
    this.lerpValue = 0.1;
    this.instance.position.copy(this.initialPosition); // Move back to the initial position
    this.isCameraToggled = false;
  }

  //loop method for animationFrame
  loop() {
    this.controls.update();

    this.characterController = this.app.world.characterController?.rigidBody;
    if (this.characterController) {
      const characterPosition = this.characterController.translation();
      const characterRotation = this.characterController.rotation();

      const cameraOffset = new THREE.Vector3(0, 8, 15);
      cameraOffset.applyQuaternion(characterRotation);
      cameraOffset.add(characterPosition);

      const targetOffset = new THREE.Vector3(0, -10, -25);
      targetOffset.applyQuaternion(characterRotation);
      targetOffset.add(characterPosition);

      this.instance.position.lerp(cameraOffset, this.lerpValue);
      this.controls.target.lerp(targetOffset, this.lerpValue);
    }
  }
}
