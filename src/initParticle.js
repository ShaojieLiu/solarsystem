import * as THREE from 'three';

export default function initParticle() {
  /*背景星星*/
  const particles = 20000;  //星星数量
  /*buffer做星星*/
  let bufferGeometry = new THREE.BufferGeometry();

  let positions = new Float32Array(particles * 3);
  let colors = new Float32Array(particles * 3);

  let color = new THREE.Color();

  const gap = 900; // 定义星星的最近出现位置

  for (let i = 0; i < positions.length; i += 3) {

    // positions

    /*-2gap < x < 2gap */
    let x = (Math.random() * gap * 2) * (Math.random() < .5 ? -1 : 1);
    let y = (Math.random() * gap * 2) * (Math.random() < .5 ? -1 : 1);
    let z = (Math.random() * gap * 2) * (Math.random() < .5 ? -1 : 1);

    /*找出x,y,z中绝对值最大的一个数*/
    let biggest = Math.abs(x) > Math.abs(y) ? Math.abs(x) > Math.abs(z) ? 'x' : 'z' :
      Math.abs(y) > Math.abs(z) ? 'y' : 'z';

    let pos = { x, y, z };

    /*如果最大值比n要小（因为要在一个距离之外才出现星星）则赋值为n（-n）*/
    if (Math.abs(pos[biggest]) < gap) pos[biggest] = pos[biggest] < 0 ? -gap : gap;

    x = pos['x'];
    y = pos['y'];
    z = pos['z'];

    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = z;

    // colors

    /*70%星星有颜色*/
    let hasColor = Math.random() > 0.3;
    let vx, vy, vz;

    if (hasColor) {
      vx = (Math.random() + 1) / 2;
      vy = (Math.random() + 1) / 2;
      vz = (Math.random() + 1) / 2;
    } else {
      vx = 1;
      vy = 1;
      vz = 1;
    }

    color.setRGB(vx, vy, vz);

    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  bufferGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  bufferGeometry.computeBoundingSphere();

  /*星星的material*/
  let material = new THREE.PointsMaterial({ size: 6, vertexColors: THREE.VertexColors });
  const particleSystem = new THREE.Points(bufferGeometry, material);

  return particleSystem;
}
