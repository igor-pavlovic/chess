
// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

import { createPawn, createRook, createKnight, createBishop, createQueen, createKing } from './figure.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.x = 3.5;
camera.position.y = 3.5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(3.5, 3.5, 0);
controls.update();

const colorBeige = new THREE.Color('beige');
const materialFieldWhite = new THREE.MeshBasicMaterial({ color: 'snow' });
const materialFieldBlack = new THREE.MeshBasicMaterial({ color: 'gray' });
const materialFigureWhite = new THREE.MeshBasicMaterial({ color: 'ivory' });
const materialFigureBlack = new THREE.MeshBasicMaterial({ color: 'dimgray' });
/* const materialWhite = new THREE.MeshToonMaterial({ color: 0xffafaf });
const materialBlack = new THREE.MeshToonMaterial({ color: 0x696969 }); */

const scene = new THREE.Scene();
scene.background = colorBeige;


const createField = (color, { x, y, z }) => {
  const geometry = new THREE.BoxGeometry(1, 1, 0.1);

  // Mesh
  const mesh = new THREE.Mesh(geometry, color);

  // Borders
  const wireframe = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }))
  edges.renderOrder = 1;

  const field = new THREE.Group();
  field.add(mesh);
  field.add(edges);

  // Positioning
  field.position.set(x, y, z)

  return field
}

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let colorField,
      colorFigure,
      position;

    position = {
      x: i,
      y: j,
      z: -0.1,
    }

    if (i % 2 !== 0) {
      if (j % 2 !== 0) {
        colorField = materialFieldWhite
        colorFigure = materialFigureWhite
      } else {
        colorField = materialFieldBlack
        colorFigure = materialFigureBlack
      }
    } else {
      if (j % 2 !== 0) {
        colorField = materialFieldBlack
        colorFigure = materialFigureBlack
      } else {
        colorField = materialFieldWhite
        colorFigure = materialFigureWhite
      }
    }

    const field = createField(colorField, position);
    scene.add(field);
  }
}

for (let i = 0; i < 8; i++) {
  const whitePawn = createPawn(materialFigureWhite, { x: i, y: 1, z: -0.1 })
  const blackPawn = createPawn(materialFigureBlack, { x: i, y: 6, z: -0.1 })
  scene.add(whitePawn, blackPawn)
}

scene.add(
  createRook(materialFigureWhite, { x: 0, y: 0, z: -0.1 }),
  createRook(materialFigureWhite, { x: 7, y: 0, z: -0.1 }),
  createRook(materialFigureBlack, { x: 0, y: 7, z: -0.1 }),
  createRook(materialFigureBlack, { x: 7, y: 7, z: -0.1 })
)

scene.add(
  createKnight(materialFigureWhite, { x: 1, y: 0, z: -0.1 }),
  createKnight(materialFigureWhite, { x: 6, y: 0, z: -0.1 }),
  createKnight(materialFigureBlack, { x: 1, y: 7, z: -0.1 }),
  createKnight(materialFigureBlack, { x: 6, y: 7, z: -0.1 })
)

scene.add(
  createBishop(materialFigureWhite, { x: 2, y: 0, z: -0.1 }),
  createBishop(materialFigureWhite, { x: 5, y: 0, z: -0.1 }),
  createBishop(materialFigureBlack, { x: 2, y: 7, z: -0.1 }),
  createBishop(materialFigureBlack, { x: 5, y: 7, z: -0.1 })
)

scene.add(
  createQueen(materialFigureWhite, { x: 3, y: 0, z: -0.1 }),
  createQueen(materialFigureBlack, { x: 3, y: 7, z: -0.1 }),
)

scene.add(
  createKing(materialFigureWhite, { x: 4, y: 0, z: -0.1 }),
  createKing(materialFigureBlack, { x: 4, y: 7, z: -0.1 }),
)


const animate = function () {
  requestAnimationFrame(animate);

  /* cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  edges.rotation.x += 0.01;
  edges.rotation.y += 0.01; */

  renderer.render(scene, camera);
};

animate();
