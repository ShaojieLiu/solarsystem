import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import {CSS2DRenderer, CSS2DObject} from './lib/CSS2DRenderer.js';

import initParticle from "./src/initParticle"
import initLabel from "./src/initLabel"
import { resizeRendererToDisplaySize } from './src/utils'

import './index.css';
import './img/earth_bg.jpg';
import './img/jupiter_bg.jpg';
import './img/mars_bg.jpg';
import './img/mercury_bg.jpg';
import './img/neptune_bg.jpg';
import './img/pluto_bg.jpg';
import './img/saturn_bg.jpg';
import './img/saturn_ring.jpg';
import './img/sun_bg.jpg';
import './img/uranus_bg.jpg';
import './img/venus_bg.jpg';

const canvas = document.getElementById('main');

/*画布大小*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*renderer*/
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true; //辅助线
renderer.shadowMapSoft = true; //柔和阴影
renderer.setClearColor(0xffffff, 0);

/*scene*/
const scene = new THREE.Scene();

/*camera*/
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
camera.position.set(-200, 50, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// const AxesHelper = new THREE.AxesHelper(500);
// scene.add(AxesHelper);

const loader = new THREE.TextureLoader();

const SunSystem = new THREE.Object3D();
scene.add(SunSystem);

const planets = [];

/*sun*/
const sunMaterial = new THREE.MeshBasicMaterial({
  map: loader.load('./img/sun_bg.jpg')
});
const Sun = new THREE.Mesh(new THREE.SphereGeometry(14, 30, 30), sunMaterial);
Sun.name = 'Sun';
SunSystem.add(Sun);

const planetDiv = document.createElement('div');
planetDiv.className = 'label';
planetDiv.textContent = 'Sun';
planetDiv.style.marginTop = '-0.3em';
const planetLabel = new CSS2DObject(planetDiv);
planetLabel.position.set(0, 14, 0);
Sun.add(planetLabel);

//添加水星
const Mercury = loadPlanet('mercury', 2, 20, 0.02);
planets.push(Mercury);
//添加金星
const Venus = loadPlanet('venus', 4, 30, 0.012);
planets.push(Venus);
//添加地球
const Earth = loadPlanet('earth', 5, 40, 0.010);
planets.push(Earth);
//添加火星
const Mars = loadPlanet('mars', 4, 50, 0.008);
planets.push(Mars);
//添加木星
const Jupiter = loadPlanet('jupiter', 9, 70, 0.006);
planets.push(Jupiter);
//添加土星
const Saturn = loadPlanet('saturn', 7, 100, 0.005);
planets.push(Saturn);
//添加天王星
const Uranus = loadPlanet('uranus', 4, 120, 0.003);
planets.push(Uranus);
//添加海王星
const Neptune = loadPlanet('neptune', 3, 150, 0.002);
planets.push(Neptune);
//添加冥王星
const Pluto = loadPlanet('pluto', 4, 160, 0.0016);
planets.push(Pluto);

const particleSystem = initParticle();
scene.add(particleSystem);

function loadPlanet(name, radius, position, speed) {
  const planetSystem = new THREE.Mesh(new THREE.SphereGeometry(1, 1, 1), new THREE.MeshLambertMaterial()); //材质设定
  planetSystem.speed = speed;

  const material = new THREE.MeshBasicMaterial({
    map: loader.load(`./img/${name}_bg.jpg`)
  });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(radius, 30, 30), material);
  planet.position.z = -position;
  // planet.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -23.36 * Math.PI / 180)
  planetSystem.add(planet);

  if (name === 'saturn') {
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: loader.load(`./img/${name}_ring.jpg`),
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius * 1.2, radius * 1.5, 64, 1), ringMaterial);
    ring.rotation.x = - Math.PI / 2;
    planet.add(ring);
  }

  const track = new THREE.Mesh(new THREE.RingGeometry(position, position + 0.05, 64, 1), new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide
  }));
  track.rotation.x = - Math.PI / 2;
  scene.add(track);

  const planetDiv = document.createElement('div');
  planetDiv.className = 'label';
  planetDiv.textContent = name;
  planetDiv.style.marginTop = '-0.3em';
  const planetLabel = new CSS2DObject(planetDiv);
  planetLabel.position.set(0, radius, 0);
  planet.add(planetLabel);

  SunSystem.add(planetSystem);

  return planetSystem;
}
function render(time) {
  time *= 0.000001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  SunSystem.rotation.y = -time;
  for (var i = 0; i < planets.length; i++) {
    planets[i].rotation.y -= planets[i].speed;
    const planet = planets[i].children[0];
    planet.rotation.y -= 0.1;
  }

  // orbitcontrols.update();

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);

  requestAnimationFrame(render);
}

var orbitcontrols, labelRenderer

const init = () => {
  labelRenderer = initLabel(canvas.clientWidth, canvas.clientHeight)
  orbitcontrols = new OrbitControls(camera, labelRenderer.domElement);
  orbitcontrols.update();
  requestAnimationFrame(render);
}

init()
