import * as THREE from 'three';
import { CSS2DObject } from '../lib/CSS2DRenderer.js';

const loadPlanet = (loader, scene, SunSystem) => (name, radius, position, speed) => {
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

export default loadPlanet
