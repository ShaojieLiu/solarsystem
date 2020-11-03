import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { CSS2DObject } from './lib/CSS2DRenderer.js';
import World from './src/world';

new World(document.getElementById('main'))
