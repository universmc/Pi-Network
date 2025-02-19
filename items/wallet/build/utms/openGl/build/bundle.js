import * as THREE from 'three';
import Camera from '../camera/Camera.js';
import Lumiere from '../lights/Lumiere.js';
import Miroir from '../Lights/Miroir.js';
import Laser from './laser.js';

// Créer une scène
const scene = new THREE.Scene();

// Créer une caméra
const camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.setPosition(0, 0, 5);
scene.add(camera.camera);

// Créer un renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Créer un miroir
const miroir = new Miroir(scene, camera);

// Créer un laser
const laser = new Laser(new THREE.Vector3(0, 0, 5), new THREE.Vector3(0, 0, -1), 0xffffff, 1);
scene.add(laser.light);

// Boucle d'animation
function animate() {
  requestAnimationFrame(animate);
  miroir.update();
  renderer.render(scene, camera);
}
animate();