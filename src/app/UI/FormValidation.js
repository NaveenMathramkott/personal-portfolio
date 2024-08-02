import ModalManager from "./ModalManager";

export default class FormValidation {
  constructor(form) {
    this.modalManager = new ModalManager();
    this.form = form;
    this.name = form.querySelector("#name");
    this.email = form.querySelector("#email");
    this.message = form.querySelector("#message");

    this.nameError = form.querySelector("#nameError");
    this.emailError = form.querySelector("#emailError");
    this.messageError = form.querySelector("#messageError");
    this.button = form.querySelector("#submit");
    this.notification = form.querySelector("#sendNotification");

    this.init();
    this.emailjs();
  }
  emailjs() {
    emailjs.init("PwwRgiAw1HkZ7SSy0");
  }

  init() {
    this.button.addEventListener(
      "click",
      (event) => {
        this.submit(event);
      },
      { once: true }
    );
  }

  submit(event) {
    this.handleSubmit(event);
    removeEventListener("click", submit);
  }

  async handleSubmit(event) {
    event.preventDefault();

    let isValid = true;

    if (!this.name.value.trim()) {
      this.nameError.classList.add("active");
      isValid = false;
    } else {
      this.nameError.classList.remove("active");
    }

    if (!this.validateEmail(this.email.value)) {
      this.emailError.classList.add("active");
      isValid = false;
    } else {
      this.emailError.classList.remove("active");
    }

    if (!this.message.value.trim()) {
      this.messageError.classList.add("active");
      isValid = false;
    } else {
      this.messageError.classList.remove("active");
    }

    if (isValid) {
      try {
        await emailjs.sendForm(
          "service_85efdfe",
          "template_wu70e3q",
          document.getElementById("contactForm")
        );
        alert("Mail Recieved");
      } catch (error) {
        alert("Failed to send email");
      }
      this.form.style.display = "none";
      this.clearForm();
      this.modalManager.closeModal();
    }
  }
  clearForm() {
    this.name.value = "";
    this.email.value = "";
    this.message.value = "";
    this.nameError.classList.remove("active");
    this.emailError.classList.remove("active");
    this.messageError.classList.remove("active");
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
