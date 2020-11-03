import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { CSS2DObject } from './lib/CSS2DRenderer.js';

import initParticle from "./src/initParticle"
import initLabel from "./src/initLabel"
import initPlanets from "./src/initPlanets"
import { resizeRendererToDisplaySize } from './src/utils'

import './index.css';

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
// scene.add(camera);

const AxesHelper = new THREE.AxesHelper(500);
scene.add(AxesHelper);

const loader = new THREE.TextureLoader();

const SunSystem = new THREE.Object3D();
// scene.add(SunSystem);

// const planets = initPlanets(scene, SunSystem);

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


const particleSystem = initParticle();
scene.add(particleSystem);

function render(time) {
  time *= 0.000001;

  // if (resizeRendererToDisplaySize(renderer)) {
  //   const canvas = renderer.domElement;
  //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //   camera.updateProjectionMatrix();
  // }

  // SunSystem.rotation.y = -time;
  // for (var i = 0; i < planets.length; i++) {
  //   planets[i].rotation.y -= planets[i].speed;
  //   const planet = planets[i].children[0];
  //   planet.rotation.y -= 0.1;
  // }

  // orbitcontrols.update();

  renderer.render(scene, camera);
  // labelRenderer.render(scene, camera);

  requestAnimationFrame(render);
}

var orbitcontrols, labelRenderer

const init = () => {
  // labelRenderer = initLabel(canvas.clientWidth, canvas.clientHeight)
  // labelRenderer.domElement.style.pointerEvents = 'none'
  orbitcontrols = new OrbitControls(camera, canvas);
  orbitcontrols.update();
  requestAnimationFrame(render);
}

init()
