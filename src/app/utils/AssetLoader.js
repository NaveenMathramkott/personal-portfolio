import * as THREE from "three";
// Import assetStore and appStateStore directly as they are essential for state management
import assetStore from "./AssetStore.js";
import { appStateStore } from "./Store.js";

export default class AssetLoader {
  constructor() {
    this.assetStore = assetStore;

    // Adding loading manager
    this.manager = new THREE.LoadingManager();
    this.assetStore = assetStore.getState();
    this.assetsToLoad = this.assetStore.assetsToLoad;
    this.addLoadedAsset = this.assetStore.addLoadedAsset;

    // Access to DOM elements
    this.overlay = document.querySelector(".overlay");
    this.loading = document.querySelector(".loading");
    this.startButton = document.querySelector(".start");
    this.h1 = document.querySelector("h1");
    this.ArrowButtons = document.querySelector(".mobileButton");
    document.getElementById("progressPercentage").style.color = "#2d7081";

    // Setting loading to visible
    this.loading.style.display = "block";

    // Progress function
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.progress = (itemsLoaded / itemsTotal) * 100;
      this.progress = Math.trunc(this.progress);
      document.getElementById(
        "progressPercentage"
      ).innerHTML = `${this.progress}%`;
      this.h1.style.setProperty("--loading-width", this.progress + "%");

      if (this.progress === 100) {
        appStateStore.setState({ assetsReady: true });
        this.loading.classList.add("fade");
        window.setTimeout(() => this.ready(), 1200);
      }
    };
    this.manager.onLoad = () => {
      this.loading.style.display = "none";
    };

    // Initialize loaders asynchronously
    this.instantiateLoaders();
  }

  async instantiateLoaders() {
    // Dynamically import DRACOLoader and GLTFLoader
    const { DRACOLoader } = await import("three/addons/loaders/DRACOLoader.js");
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
    );
    this.gltfLoader = new GLTFLoader(this.manager);
    this.gltfLoader.setDRACOLoader(dracoLoader);

    // Load TextureLoader directly as it might be used for UI elements
    this.textureLoader = new THREE.TextureLoader();

    // Start loading assets
    this.startLoading();
  }

  // Loading GLB and GLTF files for the project
  startLoading() {
    this.assetsToLoad.forEach((asset) => {
      if (asset.type === "texture") {
        this.textureLoader.load(asset.path, (loadedAsset) => {
          this.addLoadedAsset(loadedAsset, asset.id);
        });
      } else if (asset.type === "model") {
        this.gltfLoader.load(asset.path, (loadedAsset) => {
          this.addLoadedAsset(loadedAsset, asset.id);
        });
      }
    });
  }

  // Function for start button after progress
  ready() {
    this.loading.remove();
    this.startButton.style.display = "inline";
    this.startButton.classList.add("fadeIn");

    console.log("auto starting");
    this.startButton.addEventListener(
      "click",
      () => {
        console.log("started");
        this.overlay.classList.add("fade");
        this.startButton.classList.add("fadeOut");

        window.setTimeout(() => {
          this.overlay.remove();
          this.startButton.remove();
        }, 2000);
      },
      { once: true }
    );
  }
}
