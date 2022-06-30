import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.SphereGeometry(2.5, 32, 5, 0, 6.283185, 0, 3.141592);

const material = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});

const ring = new THREE.Mesh(geometry, material);
scene.add(ring);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 5, 100);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const lighthelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
  return star;
}

const stars = new Array(200);
stars.fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load(
  "Gojo-Satoru-Jujutsu-Kaisen.jpg"
);
scene.background = spaceTexture;

const wallpapertexture = new THREE.TextureLoader().load("Good-wallpaper.jpg");
const wallpaper = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 3.5, 3.5),
  new THREE.MeshBasicMaterial({ map: wallpapertexture })
);

scene.add(wallpaper);

function animate() {
  requestAnimationFrame(animate);
  ring.rotation.x += 0.01;
  ring.rotation.y += 0.005;
  ring.rotation.z += 0.01;
  wallpaper.rotation.x += 0.01;
  wallpaper.rotation.y += 0.05;
  wallpaper.rotation.z += 0.01;
  // stars[Math.floor(Math.random() * 200)].setX(Math.random * 100);
  controls.update();

  renderer.render(scene, camera);
}
console.log(stars);
animate();
