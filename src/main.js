import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Init stuff
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
});

renderer.setSize(window.innerWidth, window.innerHeight);

const textureLoader = new THREE.TextureLoader();

// Cube
// const planeDiffuseMap_Cube = textureLoader.load('/grass-color.jpg');
// planeDiffuseMap_Cube.colorSpace = THREE.SRGBColorSpace;
// planeDiffuseMap_Cube.wrapS = THREE.RepeatWrapping;
// planeDiffuseMap_Cube.wrapT = THREE.RepeatWrapping;
// planeDiffuseMap_Cube.repeat.set(20, 20);

// const planeNormalMap_Cube = textureLoader.load('/grass-normal.jpg');
// planeNormalMap_Cube.wrapS = THREE.RepeatWrapping;
// planeNormalMap_Cube.wrapT = THREE.RepeatWrapping;
// planeNormalMap_Cube.repeat.set(20, 20);

const g1 = new THREE.BoxGeometry(1, 1, 1);
const m1 = new THREE.MeshStandardMaterial({
  color: 0x00EEAA,
  // map: planeDiffuseMap_Cube,
  // normalMap: planeNormalMap_Cube,
  // normalScale: new THREE.Vector2(3, 3)
});
const cube = new THREE.Mesh(g1, m1);

// const planeDiffuseMap = textureLoader.load('/grass-color.jpg');
// planeDiffuseMap.colorSpace = THREE.SRGBColorSpace;
// planeDiffuseMap.wrapS = THREE.RepeatWrapping;
// planeDiffuseMap.wrapT = THREE.RepeatWrapping;
// planeDiffuseMap.repeat.set(20, 20);

// const planeNormalMap = textureLoader.load('/grass-normal.jpg');
// planeNormalMap.wrapS = THREE.RepeatWrapping;
// planeNormalMap.wrapT = THREE.RepeatWrapping;
// planeNormalMap.repeat.set(20, 20);

// const g2 = new THREE.PlaneGeometry(100, 100);
// const m2 = new THREE.MeshStandardMaterial({
//   map: planeDiffuseMap,
//   normalMap: planeNormalMap,
//   normalScale: new THREE.Vector2(3, 3)
// });

cube.position.set(2, 0, 0);

scene.add(cube);

// Skeleton
const loader = new GLTFLoader();
const gltfSkele = await loader.loadAsync( '/models/gltf/skeleton/skeleton.gltf' );
scene.add( gltfSkele.scene );

// Plane
const planeDiffuseMap = textureLoader.load('/grass-color.jpg');
planeDiffuseMap.colorSpace = THREE.SRGBColorSpace;
planeDiffuseMap.wrapS = THREE.RepeatWrapping;
planeDiffuseMap.wrapT = THREE.RepeatWrapping;
planeDiffuseMap.repeat.set(20, 20);

const planeNormalMap = textureLoader.load('/grass-normal.jpg');
planeNormalMap.wrapS = THREE.RepeatWrapping;
planeNormalMap.wrapT = THREE.RepeatWrapping;
planeNormalMap.repeat.set(20, 20);

const g2 = new THREE.PlaneGeometry(100, 100);
const m2 = new THREE.MeshStandardMaterial({
  map: planeDiffuseMap,
  normalMap: planeNormalMap,
  normalScale: new THREE.Vector2(3, 3)
});
const plane = new THREE.Mesh(g2, m2);

plane.position.set(0, -1, 0);
plane.rotation.x = -Math.PI / 2;

scene.add(plane);

// Lights
const dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.7);
const pointLight = new THREE.PointLight(0xFFFFFF, 3);

dirLight.position.set(0, 1, 0);
pointLight.position.set(-1, 0, 1);

scene.add(pointLight);
scene.add(dirLight);

// Camera/scene config
const enderText = document.getElementById('ender-text');
const scrollTop = document.documentElement.scrollTop;
const scrollMax = document.body.scrollHeight - window.innerHeight;
const scroll = (scrollTop / scrollMax);

camera.position.z = 5 + (scroll * 20);

if (scroll > 0.95 && !enderText.classList.contains('switch-off')) {
  enderText.classList.add('switch-off');
}

scene.background = new THREE.Color(0x0F0509);
scene.fog = new THREE.Fog(0x0F0509, 5, 20);

// Move camera on scroll
function moveCamera() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollMax = document.body.scrollHeight - window.innerHeight;
  const scroll = (scrollTop / scrollMax);

  camera.position.z = 5 + (scroll * 20);

  // gltfSkele.scene.position.z = 10 + (scroll * 15);
  if (scroll > 0.95 && !enderText.classList.contains('switch-off')) {
    enderText.classList.add('switch-off');
  }
}

window.addEventListener('scroll', moveCamera);

// Animation loop
function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.001;

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);