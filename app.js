import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OBJLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/OBJLoader.js';

const loader = new OBJLoader();


window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");
  });

  const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(5, 10, 7);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("assets/objs/gnoblin purple texture.png");
texture.flipY = false;

<script type="module" src="app.js"></script>


// const loader = new THREE.OBJLoader();
loader.load("assets/objs/gnoblin.obj", (object) => {

  object.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: texture
      });
    }
  });

  // Center the model
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);

  // Scale if needed
  object.scale.set(1, 1, 1);

  scene.add(object);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  