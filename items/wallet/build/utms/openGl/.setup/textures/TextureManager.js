import textureManager from './texture.js';

// Charger une texture
const texture = textureManager.loadTexture('assets/myTexture.jpg');

// Utiliser la texture dans un matériau
const material = new THREE.MeshBasicMaterial({ map: texture });