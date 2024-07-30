export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: "About me",
        description: "I am Full Stack Developer",
      },
      projects: {
        title: "Projects",
        description: "Three js personal Portfolio",
      },
      contactMe: {
        title: "Contact Me",
        description: "get me mail through NaveenMathramkott",
      },
    };
  }

  getModalInfo(portalName) {
    return this.modalContents[portalName];
  }
}
