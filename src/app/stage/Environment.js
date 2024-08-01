import * as THREE from "three";
import App from "../App.js";
import ModalContentProvider from "../UI/ModalContentProvider.js";
import assetStore from "../utils/AssetStore.js";
import Portal from "../stage/Portal.js";
// import VideoLoader from "../utils/VideoLoader.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    // this.videoLoader = new VideoLoader();

    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    this.loadEnvironment();
    this.addLights();
    this.addPortals();
  }

  loadEnvironment() {
    // load environment here
    this.environmentScene = this.environment.scene;
    this.scene.add(this.environmentScene);
    // console.log("environment", this.environmentScene);

    // this.environmentScene.position.set(-4.8, 0, -7.4);
    this.environmentScene.position.set(0, 0, 0);
    this.environmentScene.rotation.set(0, 0.3, 0);
    this.environmentScene.scale.setScalar(2.3);

    const shadowCasters = [
      "table",
      "chair",
      "cabin",
      "water",
      "flower",
      "dustbin",
    ];

    const shadowReceivers = ["floor", "wall", "table"];

    const physicalObjects = [
      "wall",
      "floor",
      "table",
      "chair",
      "couch",
      "cabin",
      "flower",
      "water",
      "dustbin",
      "table",
      "couch",
      "project-screen",
      "monitor",
    ];

    for (const child of this.environmentScene.children) {
      child.traverse((obj) => {
        // console.log("whole-obj", obj);
        if (obj.isMesh) {
          obj.castShadow = shadowCasters.some((keyword) => {
            // console.log("object cast shadow", obj);
            child.name.includes(keyword);
          });
          obj.receiveShadow = shadowReceivers.some((keyword) => {
            // console.log("object recive shadow", obj);
            child.name.includes(keyword);
          });
          if (physicalObjects.some((keyword) => obj.name.includes(keyword))) {
            // console.log("object physical ", obj);
            this.physics.add(obj, "fixed", "cuboid");
          }
        }
      });
    }
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    this.light = new THREE.PointLight(0xffffff, 1, 0);

    this.directionalLight.position.set(1, 10, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 30;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = -30;
    this.directionalLight.shadow.camera.bottom = -30;
    this.directionalLight.shadow.bias = -0.002;
    this.directionalLight.shadow.normalBias = 0.072;

    this.light.position.set(10, 10, 1);
    this.light.castShadow = true;
    this.light.position.z = 150;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 2000;

    this.scene.add(this.directionalLight);
    this.scene.add(this.light);
    this.scene.add(ambientLight);
  }

  addPortals() {
    const portalMesh1 = this.environment.scene.getObjectByName("about-screen");
    const contactForm = this.environment.scene.getObjectByName("contact-form");
    const portalMesh2 =
      this.environment.scene.getObjectByName("project-screen");
    const portalMesh3 =
      this.environment.scene.getObjectByName("contact-screen");
    const portalMesh4 =
      this.environment.scene.getObjectByName("experience-screen");
    const modalContentProvider = new ModalContentProvider();

    this.portal1 = new Portal(
      portalMesh1,
      modalContentProvider.getModalInfo("aboutMe")
    );
    this.portal2 = new Portal(
      portalMesh2,
      modalContentProvider.getModalInfo("projects")
    );
    this.portal3 = new Portal(
      portalMesh3,
      modalContentProvider.getModalInfo("contactMe")
    );
    this.portal4 = new Portal(
      portalMesh4,
      modalContentProvider.getModalInfo("experience")
    );
  }

  loop() {
    this.portal1.loop();
    this.portal2.loop();
    this.portal3.loop();
    this.portal4.loop();
  }
}
