// Find the latest version by visiting https://cdn.skypack.dev/three.
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

import State from './state/state.js'
import createBoard from './engine/board.js';

let state

let container;
let camera, scene, raycaster, renderer, controls;
let fieldMeshes, pieceMeshes

let INTERSECTED;
let activeFigure;

const pointer = new THREE.Vector2();

init()
animate();









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


  addInterfaceEvents()


  
  state = new State();
  state.init();
  
  [ fieldMeshes, pieceMeshes ] = createBoard(scene, state)



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
  const intersects = raycaster.intersectObjects( activeFigure ? fieldMeshes : pieceMeshes );


  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );

    }

  } else {

    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    INTERSECTED = null;

  }

  renderer.render(scene, camera);

};



function addInterfaceEvents() {

  document.addEventListener('mousemove', onPointerMove);

  //

  window.addEventListener('resize', onWindowResize);

  //

  document.addEventListener("click", () => {

    if (INTERSECTED) {

      if (!activeFigure) {

        activeFigure = INTERSECTED;
        

      } else {

        moveFigure( activeFigure, INTERSECTED )

        activeFigure = null;

      }
    }

  })

  //

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


function moveFigure(pieceMesh, fieldMesh) {

  if (pieceMesh.state.field.mesh === fieldMesh) {

        return

  } else {

    state.move(pieceMesh.state, fieldMesh.state);

    pieceMesh.translateX( fieldMesh.position.x - pieceMesh.position.x )
    pieceMesh.translateY( fieldMesh.position.y - pieceMesh.position.y )

  }
}