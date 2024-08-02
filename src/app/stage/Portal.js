import * as THREE from "three";
import App from "../App.js";
import ModalManager from "../UI/ModalManager.js";

export default class Portal {
  constructor(portalMesh, modalInfo) {
    this.app = new App();
    this.portalMesh = portalMesh;
    this.modalInfo = modalInfo;
    this.modalManager = new ModalManager();

    // this.portalNearMaterial = new THREE.MeshBasicMaterial({
    //   color: "gray",
    //   transparent: true,
    //   opacity: 1,
    // });
    // this.portalFarMaterial = new THREE.MeshBasicMaterial({
    //   color: "gray",
    //   transparent: true,
    //   opacity: 1,
    // });
    // this.portalMesh.material = this.portalFarMaterial;
    this.prevIsNear = false;
  }

  loop() {
    this.character = this.app.world.character.instance;
    if (this.character) {
      const portalPosition = new THREE.Vector3();
      this.portalMesh.getWorldPosition(portalPosition);

      const distance = this.character.position.distanceTo(portalPosition);
      // console.log("distance", distance);
      const isNear = distance < 3;
      if (isNear) {
        if (!this.prevIsNear) {
          this.app.camera.setToSpecificPosition(
            this.modalInfo.position,
            this.modalInfo.rotation
          );

          this.modalManager.openModal(
            this.modalInfo.title,
            this.modalInfo.description,
            this.portalMesh.name
          );
          // this.portalMesh.material = this.portalNearMaterial;
        }
        this.prevIsNear = true;
      } else {
        if (this.prevIsNear) {
          this.app.camera.returnToInitialPosition();
          this.modalManager.closeModal();
          // this.portalMesh.material = this.portalFarMaterial;
        }
        this.prevIsNear = false;
      }
    }
  }
}
