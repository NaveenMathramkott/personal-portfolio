import * as THREE from "three";
import { aboutDescription } from "../../data.js";

export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: "About me",
        description: aboutDescription[0],
        position: new THREE.Vector3(-7, 5, -2),
      },
      projects: {
        title: "Projects",
        description: "Three js personal Portfolio",
        position: new THREE.Vector3(-14, 5, -15),
      },
      experience: {
        title: "Experience",
        description: "get me mail through NaveenMathramkott",
        position: new THREE.Vector3(6.5, 7, -17),
      },
      contactMe: {
        title: "Contact",
        description: "get me mail through NaveenMathramkott",
        position: new THREE.Vector3(0, 5, 10),

        // rotation: new THREE.Vector3(0, 0, 0),
      },
    };
  }

  getModalInfo(portalName) {
    return this.modalContents[portalName];
  }
}
