import * as THREE from 'three';
import initParticle from './initParticle';
import { resizeRendererToDisplaySize } from './utils';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default class World {

  constructor(canvas) {
    this.scene = new THREE.Scene()
    this.canvas = this.initCanvas(canvas);
    this.camera = this.initCamera()
    this.renderer = this.initRenderer()
    this.init()
  }

  initCanvas(canvas) {
    document.body.style.margin = '0'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.outline = "1px dashed blue"
    canvas.style.width = `${canvas.width}px`
    canvas.style.height = `${canvas.height}px`
    return canvas
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.set(-200, 50, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    new OrbitControls(camera, this.canvas).update();
    return camera
  }

  initRenderer() {
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    resizeRendererToDisplaySize(renderer)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; //辅助线
    renderer.shadowMapSoft = true; //柔和阴影
    renderer.setClearColor(0xffffff, 0);
    return renderer
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  init() {
    this.scene.add(new THREE.AxesHelper(500));
    const particleSystem = initParticle();
    this.scene.add(particleSystem);
    requestAnimationFrame(this.render.bind(this));
  }
}
