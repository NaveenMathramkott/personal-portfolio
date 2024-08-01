import FormValidation from "./FormValidation";

export default class ModalManager {
  constructor() {
    this.modal = document.getElementById("myModal");
    this.close = document.getElementsByClassName("close")[0];

    this.close.onclick = () => {
      this.closeModal();
    };
  }

  openModal(title, desc, modalName) {
    console.log("portalMesh", modalName);
    document.getElementById("modalTitle").innerHTML = title;
    this.description = document.getElementById("modalDescription");

    this.description.innerHTML = desc;
    this.description.style.display = "none";
    this.modal.style.display = "block";
    this.modal.classList.remove("fadeOut");
    this.modal.classList.add("fadeIn");

    this.experienceForm = document.getElementById("experienceForm");
    this.contactForm = document.getElementById("contactForm");
    this.skillsContainer = document.getElementById("skills-container");
    this.projectContainer = document.getElementById("project-container");

    //--------------------------------------------------->

    // form data functions and style
    this.contactForm.style.display = "none";
    this.experienceForm.style.display = "none";
    this.skillsContainer.style.display = "none";
    this.projectContainer.style.display = "none";
    if (modalName === "contact-screen") {
      new FormValidation(this.contactForm);
      this.contactForm.style.display = "block";
    }
    //---------------------------------------------------->

    //Experience section functions and style
    //---------------------------------------------------->

    if (modalName === "experience-screen") {
      this.experienceForm.style.display = "block";
    }

    //----------------------------------------------------->

    //----------------------------------------------------->
    // Project section function and style

    if (modalName === "project-screen") {
      this.projectContainer.style.display = "flex";
    }
    //----------------------------------------------------->

    //----------------------------------------------------->
    //about sections function and style

    if (modalName === "about-screen") {
      this.description.style.display = "block";
      this.skillsContainer.style.display = "flex";
    }
    //----------------------------------------------------->
  }

  closeModal() {
    this.modal.classList.remove("fadeIn");
    this.modal.classList.add("fadeOut");
    setTimeout(() => {
      this.modal.style.display = "none";
    }, 600);
  }
}
