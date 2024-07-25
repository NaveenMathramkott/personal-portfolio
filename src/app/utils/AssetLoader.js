import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

import assetStore from "./AssetStore.js";
import { appStateStore } from "./Store.js";

export default class AssetLoader {
  constructor() {
    this.assetStore = assetStore;

    // adding loading manager
    this.manager = new THREE.LoadingManager();
    this.assetStore = assetStore.getState();
    this.assetsToLoad = this.assetStore.assetsToLoad;
    this.addLoadedAsset = this.assetStore.addLoadedAsset;

    // access to DOM elements
    this.overlay = document.querySelector(".overlay");
    this.loading = document.querySelector(".loading");
    this.startButton = document.querySelector(".start");

    // setting loading to visible
    this.loading.style.display = "block";

    // progress function
    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      this.progress = (itemsLoaded / itemsTotal) * 100;
      this.progress = Math.trunc(this.progress);
      document.getElementById("progressPercentage").innerHTML = this.progress;
      if (this.progress === 100) {
        appStateStore.setState({ assetsReady: true });
        this.loading.classList.add("fade");
        window.setTimeout(() => this.ready(), 1200);
      }
    };
    this.manager.onLoad = () => {
      this.loading.style.display = "none";
    };

    this.instantiateLoaders();
    this.startLoading();
  }

  // gltf loader for minimal 3D package repo
  instantiateLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader = new GLTFLoader(this.manager);
    this.gltfLoader.setDRACOLoader(dracoLoader);
    this.textureLoader = new THREE.TextureLoader();
  }

  // loading our full glb and gltf file here to the whole project
  startLoading() {
    this.assetsToLoad.forEach((asset) => {
      if (asset.type === "texture") {
        this.textureLoader.load(asset.path, (loadedAsset) => {
          this.addLoadedAsset(loadedAsset, asset.id);
        });
      }
      if (asset.type === "model") {
        this.gltfLoader.load(asset.path, (loadedAsset) => {
          this.addLoadedAsset(loadedAsset, asset.id);
        });
      }
    });
  }

  // function for start button after progress
  ready() {
    this.loading.remove();

    this.startButton.style.display = "inline";
    this.startButton.classList.add("fadeIn");

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
