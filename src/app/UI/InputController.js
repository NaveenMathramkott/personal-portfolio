import { inputStore } from "../utils/Store.js";

export default class InputController {
  constructor() {
    this.startListening();
    this.inputStore = inputStore;
    this.keyPressed = {};

    // this.buttonsContainer = document.createElement("div");
    // this.buttonsContainer.id = "buttons-container";
    // this.buttons = [];
    // this.mediaQuery = window.matchMedia("(max-width: 767px)");

    // // Initial check
    // this.handleScreenWidthChange(this.mediaQuery);

    // // Add listener for screen width changes
    // this.mediaQuery.addEventListener("change", (e) =>
    //   this.handleScreenWidthChange(e)
    // ),
    //   { once: true };

    // this.createButtons();
  }

  // createButtons() {
  //   const buttonEvents = [
  //     { start: this.button1Start.bind(this), end: this.button1End.bind(this) },
  //     { start: this.button2Start.bind(this), end: this.button2End.bind(this) },
  //     { start: this.button3Start.bind(this), end: this.button3End.bind(this) },
  //     { start: this.button4Start.bind(this), end: this.button4End.bind(this) },
  //   ];

  //   const buttonImages = [
  //     "buttons/arrow-left.png",
  //     "buttons/arrow-down.png",
  //     "buttons/arrow-up.png",
  //     "buttons/arrow-right.png",
  //   ];

  //   buttonImages.forEach((imageSrc, index) => {
  //     const button = document.createElement("button");
  //     button.style.backgroundImage = `url(${imageSrc})`;
  //     button.style.backgroundSize = "cover";
  //     button.style.width = "50px"; // Adjust width as needed
  //     button.style.height = "50px"; // Adjust height as needed
  //     button.style.border = "none";
  //     button.style.cursor = "pointer";
  //     button.style.margin = "5px"; // Add some spacing between buttons
  //     button.style.borderRadius = "50%";

  //     // Add click event listener
  //     button.addEventListener("touchstart", buttonEvents[index].start);
  //     button.addEventListener("touchend", buttonEvents[index].end);

  //     this.buttons.push(button);
  //     this.buttonsContainer.appendChild(button);
  //     this.buttonsContainer.style.position = "absolute";
  //     this.buttonsContainer.style.bottom = "20px";
  //     this.buttonsContainer.style.left = "50%";
  //     this.buttonsContainer.style.transform = "translateX(-50%)";
  //     this.buttonsContainer.style.display = "flex";
  //     this.buttonsContainer.style.justifyContent = "center";
  //     this.buttonsContainer.style.alignItems = "center";
  //     this.buttonsContainer.style.zIndex = "1000";
  //   });
  //   document.body.appendChild(this.buttonsContainer);
  // }

  // removeButtons() {
  //   this.buttons.forEach((button) => this.buttonsContainer.removeChild(button));
  //   this.buttons = [];
  //   if (this.buttonsContainer.parentElement) {
  //     document.body.removeChild(this.buttonsContainer);
  //   }
  // }

  // handleScreenWidthChange(e) {
  //   if (e.matches) {
  //     this.createButtons();
  //   } else {
  //     this.removeButtons();
  //   }
  // }

  startListening() {
    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));
  }

  onKeyDown(event) {
    if (!this.keyPressed[event.code]) {
      switch (event.code) {
        // case "KeyW":
        case "ArrowUp":
          inputStore.setState({ forward: true });
          break;
        // case "KeyA":
        case "ArrowLeft":
          inputStore.setState({ left: true });
          break;
        // case "KeyS":
        case "ArrowDown":
          inputStore.setState({ backward: true });
          break;
        // case "KeyD":
        case "ArrowRight":
          inputStore.setState({ right: true });
          break;
      }
      this.keyPressed[event.code] = true;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      // case "KeyW":
      case "ArrowUp":
        inputStore.setState({ forward: false });
        break;
      // case "KeyA":
      case "ArrowLeft":
        inputStore.setState({ left: false });
        break;
      // case "KeyS":
      case "ArrowDown":
        inputStore.setState({ backward: false });
        break;
      // case "KeyD":
      case "ArrowRight":
        inputStore.setState({ right: false });
        break;
    }
    this.keyPressed[event.code] = false;
  }

  // button1Start() {
  //   inputStore.setState({ left: true });
  // }

  // button1End() {
  //   inputStore.setState({ left: false });
  // }

  // button2Start() {
  //   inputStore.setState({ backward: true });
  // }

  // button2End() {
  //   inputStore.setState({ backward: false });
  // }

  // button3Start() {
  //   inputStore.setState({ forward: true });
  // }

  // button3End() {
  //   inputStore.setState({ forward: false });
  // }

  // button4Start() {
  //   inputStore.setState({ right: true });
  // }

  // button4End() {
  //   inputStore.setState({ right: false });
  // }
}
