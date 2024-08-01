// import * as THREE from "three";
// import App from "../App";

// export default class ThirdPersonCamera {
//   constructor(params) {
//     this.params = params;
//     this.camera = params.camera;
//     this.app = new App();

//     this.characterController = this.app.world.characterController?.rigidBody;
//     this.currentPosition = new THREE.Vector3();
//     this.currentLookAt = new THREE.Vector3();
//   }
//   calculateIdealOffset(rotation, position) {
//     // console.log(this.params);
//     const idealOffset = new THREE.Vector3(-15, 20, -30);
//     idealOffset.applyQuaternion(rotation);
//     idealOffset.add(position);
//     return idealOffset;
//   }
//   calculateIdealLookAt(rotation, position) {
//     const idealLookAt = new THREE.Vector3(0, 10, 50);
//     idealLookAt.applyQuaternion(rotation);
//     idealLookAt.add(position);
//     return idealLookAt;
//   }
//   update() {
//     // console.log("charater", this.characterController);
//     if (this.characterController) {
//       this.characterPosition = this.characterController.translation();
//       this.characterRotation = this.characterController.rotation();
//       console.log("charater", this.characterController, this.characterRotation);
//       const idealOffset = this.calculateIdealOffset(
//         this.characterRotation,
//         this.characterPosition
//       );
//       const idealLookAt = this.calculateIdealLookAt(
//         this.characterRotation,
//         this.characterPosition
//       );

//       this.currentPosition.copy(idealOffset);
//       this.currentLookAt.copy(idealLookAt);

//       this.camera.position.copy(this.currentPosition);
//       this.camera.lookAt(this.currentLookAt);
//     }
//   }
// }
