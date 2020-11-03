import * as THREE from 'three';

import loadPlanet from './loadPlanet'
const loader = new THREE.TextureLoader();

import '../img/earth_bg.jpg';
import '../img/jupiter_bg.jpg';
import '../img/mars_bg.jpg';
import '../img/mercury_bg.jpg';
import '../img/neptune_bg.jpg';
import '../img/pluto_bg.jpg';
import '../img/saturn_bg.jpg';
import '../img/saturn_ring.jpg';
import '../img/sun_bg.jpg';
import '../img/uranus_bg.jpg';
import '../img/venus_bg.jpg';

export default function initPlanets(scene, SunSystem) {

  const planetLoader = loadPlanet(loader, scene, SunSystem)

  //添加水星
  const Mercury = planetLoader('mercury', 2, 20, 0.02);
  //添加金星
  const Venus = planetLoader('venus', 4, 30, 0.012);
  //添加地球
  const Earth = planetLoader('earth', 5, 40, 0.010);
  //添加火星
  const Mars = planetLoader('mars', 4, 50, 0.008);
  //添加木星
  const Jupiter = planetLoader('jupiter', 9, 70, 0.006);
  //添加土星
  const Saturn = planetLoader('saturn', 7, 100, 0.005);
  //添加天王星
  const Uranus = planetLoader('uranus', 4, 120, 0.003);
  //添加海王星
  const Neptune = planetLoader('neptune', 3, 150, 0.002);
  //添加冥王星
  const Pluto = planetLoader('pluto', 4, 160, 0.0016);

  return [Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto]
}
