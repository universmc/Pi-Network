import * as THREE from 'three';

class TextureManager {
  constructor() {
    this.textures = {};
  }

  loadTexture(path) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(path);
    this.textures[path] = texture;
    return texture;
  }

  getTexture(path) {
    return this.textures[path];
  }
}

const textureManager = new TextureManager();
export default textureManager;