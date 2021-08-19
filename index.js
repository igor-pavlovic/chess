
// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

import createField from "./field.js";
import { createPawn, createRook, createKnight, createBishop, createQueen, createKing } from './figure.js';


let container;
let camera, scene, raycaster, renderer, controls;

let INTERSECTED;

const pointer = new THREE.Vector2();

init()
animate();


// testing
console.log(raycaster)
console.log(raycaster.ray)
console.log(raycaster.ray)




function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 10;
  camera.position.x = 3.5;
  camera.position.y = 3.5;

  /* const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );
  camera.position.z = 10;
  camera.position.x = 3.5;
  camera.position.y = 3.5; */


  scene = new THREE.Scene();
  scene.background = new THREE.Color('beige');

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  createBoard()

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);


  controls = new OrbitControls(camera, renderer.domElement);
  controls.target = new THREE.Vector3(3.5, 3.5, 0);
  controls.update();
  controls.saveState();
  controls.enabled = false;


  document.addEventListener('mousemove', onPointerMove);

  //

  window.addEventListener('resize', onWindowResize);


  //attachListeners()

}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}


function onPointerMove(event) {

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}


function animate() {

  requestAnimationFrame(animate);

  render();

}


function render() {

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( pointer, camera );

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects( scene.children );

  for (let i = 0; i < intersects.length; i++) {
    console.log(i)
    intersects[i].object.material.color.set(0xff0000);

  }
  renderer.render(scene, camera);
};


function createBoard() {

  const materialFieldWhite = new THREE.MeshBasicMaterial({ color: 'snow' });
  const materialFieldBlack = new THREE.MeshBasicMaterial({ color: 'gray' });
  const materialFigureWhite = new THREE.MeshBasicMaterial({ color: 'ivory' });
  const materialFigureBlack = new THREE.MeshBasicMaterial({ color: 'dimgray' });

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let colorField,
        position;

      position = {
        x: i,
        y: j,
        z: -0.1,
      }

      if (i % 2 !== 0) {
        if (j % 2 !== 0) {
          colorField = materialFieldWhite
        } else {
          colorField = materialFieldBlack
        }
      } else {
        if (j % 2 !== 0) {
          colorField = materialFieldBlack
        } else {
          colorField = materialFieldWhite
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

}

function attachListeners() {

  // Custom listeners
  const rotateButton = document.querySelector(".rotate");
  rotateButton.addEventListener("click", () => {
    controls.enabled = !controls.enabled;
  });


  const topViewButton = document.querySelector(".top");
  topViewButton.addEventListener("click", () => {
    controls.reset();
  });


  /* const sideViewButton = document.querySelector(".side");
  sideViewButton.addEventListener("click", () => {
    camera.position.z = 10;
    camera.position.x = 3.5;
    camera.position.y = 3.5;
  }); */

}