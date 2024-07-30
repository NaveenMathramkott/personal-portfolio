import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  {
    id: "avatar",
    path: "/models/avatar.gltf",
    type: "model",
  },
  {
    id: "environment",
    path: "/models/office-environment.gltf",
    type: "model",
  },
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => ({
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));

export default assetStore;
