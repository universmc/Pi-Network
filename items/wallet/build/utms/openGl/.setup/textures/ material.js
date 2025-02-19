import shader from './shader.js';

// Créer un matériau avec des shaders personnalisés
const material = new THREE.ShaderMaterial({
  vertexShader: shader.vertexShader,
  fragmentShader: shader.fragmentShader,
  uniforms: {
    map: { value: new THREE.TextureLoader().load('texture.jpg') }
  }
});