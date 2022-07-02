import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { Mesh } from "three";

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

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

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
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
  return star;
}

const stars = new Array(200);
stars.fill().forEach(addStar);

const gogouTexture = new THREE.TextureLoader().load(
  "Gojo-Satoru-Jujutsu-Kaisen.jpg"
);
scene.background = gogouTexture;

const wallpapertexture = new THREE.TextureLoader().load("Good-wallpaper.jpg");
const wallpaper = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 3.5, 3.5),
  new THREE.MeshBasicMaterial({ map: wallpapertexture })
);

scene.add(wallpaper);
const jupiterTexture = new THREE.TextureLoader().load("jupiter-from-nasa.jpg");
const jupiterNormalTexture = new THREE.TextureLoader().load(
  "Moon-For-Jupiter-Texture.jpg"
);

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(2, 24, 24),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
    normalMap: jupiterNormalTexture,
  })
);

scene.add(jupiter);
jupiter.position.y = 10;
jupiter.position.x = -15;
// jupiter.position.z = 10;

jupiter.rotation.z = 0.5;

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(8, 3, 10, 27, 6.283185),
  new THREE.MeshStandardMaterial({
    color: 0x0000ff,
  })
);
scene.add(torus);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;
  wallpaper.rotation.x += 0.01;
  wallpaper.rotation.y += 0.05;
  wallpaper.rotation.z += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  jupiter.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);

  // stars[Math.floor(Math.random() * 200)].setX(Math.random * 100);
  // stars.forEach((star) => {
  //   star.x += Math.random();
  // });
  // moveCamera();
  controls.update();

  renderer.render(scene, camera);

  // setInterval(animate, 500);
}
// console.log(stars[0]);
function moveCamera() {
  const currScrollPos = document.body.getBoundingClientRect().top;
  // jupiter.rotation.x += 0.01;
  // jupiter.rotation.y += 0.05;
  // jupiter.rotation.z += 0.01;

  torus.rotation.x += 0.01;

  wallpaper.rotation.y += 0.01;
  wallpaper.rotation.z += 0.01;

  camera.position.x = currScrollPos * -0.0001;
  camera.rotation.y = currScrollPos * -0.0001;
  camera.position.z = currScrollPos * -0.1;
}

document.body.onscroll = moveCamera;
moveCamera();
animate();
