// import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
// import { BufferGeometryUtils } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';



const fieldSize = 1;
const baseSize = fieldSize * 0.6;

// Pythagora's theorem to get size of the crown and pawn elements
const secondarySize = Math.sqrt((baseSize / 2) ** 2 * 2)


function FieldMesh(color, { x, y, z }) {

  const geometry = new THREE.BoxGeometry(1, 1, 0.1);

  const mesh = new THREE.Mesh(geometry, color);
  mesh.receiveShadow = true;

  mesh.position.set(x, y, z);

  return mesh;

}

function PawnMesh(color, { x, y, z }) {

  const geometry = new THREE.BoxGeometry(secondarySize, secondarySize, secondarySize);
  const mesh = new THREE.Mesh(geometry, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.position.set(x, y, z + secondarySize / 2);

  return mesh

}



function RookMesh(color, { x, y, z }) {

  const geometry = new THREE.BoxGeometry(baseSize, baseSize, baseSize);
  const mesh = new THREE.Mesh(geometry, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.position.set(x, y, z + baseSize / 2);

  return mesh

}



function KnightBaseGeometry() {

  const shape = new THREE.Shape();

  shape.moveTo(0, 0);
  shape.lineTo(0, baseSize);
  shape.lineTo(baseSize / 2, baseSize);
  shape.lineTo(baseSize / 2, baseSize / 2);
  shape.lineTo(baseSize, baseSize / 2);
  shape.lineTo(baseSize, 0);
  shape.lineTo(0, 0);

  const extrudeSettings = {
    steps: 1,
    depth: baseSize / 2,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  // Reposition the geometry to be in central position
  geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(- baseSize / 2, - baseSize / 2, 0));

  return geometry

}



function KnightMesh(color, { x, y, z }) {

  const base = KnightBaseGeometry();
  const top = KnightBaseGeometry();

  top.rotateZ(THREE.MathUtils.degToRad(180));
  top.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, baseSize / 2));

  const geometry = mergeBufferGeometries([ base, top ])

  const mesh = new THREE.Mesh(geometry, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;


  mesh.position.set(x, y, z);

  return mesh

}



function BishopMesh(color, { x, y, z }) {

  const firstDiagonal = new THREE.BoxGeometry(1.1313, 0.2843, 1);
  const secondDiagonal = new THREE.BoxGeometry(1.1313, 0.2843, 1);
  const firstCorner = new THREE.BoxGeometry(0.2, 0.2, 1);
  const secondCorner = new THREE.BoxGeometry(0.2, 0.2, 1);
  const thirdCorner = new THREE.BoxGeometry(0.2, 0.2, 1);
  const fourthCorner = new THREE.BoxGeometry(0.2, 0.2, 1);

  firstDiagonal.rotateZ(THREE.MathUtils.degToRad(45));
  secondDiagonal.rotateZ(THREE.MathUtils.degToRad(-45));

  firstCorner.applyMatrix4(new THREE.Matrix4().makeTranslation(0.4, 0.4, 0));
  secondCorner.applyMatrix4(new THREE.Matrix4().makeTranslation(-0.4, 0.4, 0));
  thirdCorner.applyMatrix4(new THREE.Matrix4().makeTranslation(0.4, -0.4, 0));
  fourthCorner.applyMatrix4(new THREE.Matrix4().makeTranslation(-0.4, -0.4, 0));

  const geometry = mergeBufferGeometries([
    firstDiagonal,
    secondDiagonal,
    firstCorner,
    secondCorner,
    thirdCorner,
    fourthCorner
  ])

  geometry.scale(baseSize, baseSize, baseSize);

  const mesh = new THREE.Mesh(geometry, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.position.set(x, y, z + baseSize / 2);

  return mesh

}

/* 
function BishopMesh( color, { x, y, z } ) {

  const displacement = 1 / 2;

  const shape = new THREE.Shape();

  shape.moveTo(0 - displacement, 0 - displacement);
  shape.lineTo(0 - displacement, 0.2 - displacement);
  shape.lineTo(0.3 - displacement, 0.5 - displacement);
  shape.lineTo(0 - displacement, 0.8 - displacement);
  shape.lineTo(0 - displacement, 1 - displacement);

  shape.lineTo(0.2 - displacement, 1 - displacement);
  shape.lineTo(0.5 - displacement, 0.7 - displacement);
  shape.lineTo(0.8 - displacement, 1 - displacement);
  shape.lineTo(1 - displacement, 1 - displacement);

  shape.lineTo(1 - displacement, 0.8 - displacement);
  shape.lineTo(0.7 - displacement, 0.5 - displacement);
  shape.lineTo(1 - displacement, 0.2 - displacement);
  shape.lineTo(1 - displacement, 0 - displacement);

  shape.lineTo(0.8 - displacement, 0 - displacement);
  shape.lineTo(0.5 - displacement, 0.3 - displacement);
  shape.lineTo(0.2 - displacement, 0 - displacement);
  shape.lineTo(0 - displacement, 0 - displacement);

  const extrudeSettings = {
    steps: 1,
    depth: 1,
    bevelEnabled: false,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1
  };

  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.scale(baseSize, baseSize, baseSize);
  const mesh = new THREE.Mesh(geometry, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.position.set( x, y, z );

  return mesh

} */

/* 
function BishopMesh( color, { x, y, z } ) {

  const sqrt2 = Math.sqrt(2)
  const longSide = 0.8 * sqrt2;
  const shortSide = 0.2 * sqrt2;

  const firstDiagonal = new THREE.BoxGeometry( longSide, shortSide, 1 );
  firstDiagonal.rotateZ( THREE.MathUtils.degToRad( -45 ) );

  const secondDiagonal = new THREE.BoxGeometry( longSide, shortSide, 1 );
  secondDiagonal.rotateZ( THREE.MathUtils.degToRad( 45 ) );

  const firstAngle = new THREE.BoxGeometry( shortSide, shortSide, baseSize );
  firstAngle.applyMatrix4(new THREE.Matrix4().makeTranslation(- longSide / 2, - longSide / 2, 0 ));

  const secondAngle = new THREE.BoxGeometry( shortSide, shortSide, baseSize );
  secondAngle.applyMatrix4(new THREE.Matrix4().makeTranslation(longSide / 2, - longSide / 2, 0 ));

  const thirdAngle = new THREE.BoxGeometry( shortSide, shortSide, baseSize );
  thirdAngle.applyMatrix4(new THREE.Matrix4().makeTranslation(- longSide / 2, longSide / 2, 0 ));

  const fourthAngle = new THREE.BoxGeometry( shortSide, shortSide, baseSize );
  fourthAngle.applyMatrix4(new THREE.Matrix4().makeTranslation( longSide / 2, longSide / 2, 0 ));


  const geometry = mergeBufferGeometries([ 
    firstDiagonal, 
    secondDiagonal, 
    firstAngle, 
    secondAngle, 
    thirdAngle, 
    fourthAngle
  ])

  geometry.scale(baseSize, baseSize, baseSize);


  const mesh = new THREE.Mesh(geometry, color);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  mesh.position.set( x, y, z );

  return mesh

} */



function QueenMesh(color, { x, y, z }) {

  const base = RookMesh(color, { x: 0, y: 0, z: 0 });

  const geometry = new THREE.SphereGeometry(baseSize / 2, 32, 16);
  const crown = new THREE.Mesh(geometry, color);
  crown.castShadow = true;
  crown.receiveShadow = true;
  crown.position.set(0, 0, baseSize)

  const figure = base.add(crown);
  figure.position.set(x, y, z + baseSize / 2)

  return figure

}



function KingMesh(color, { x, y, z }) {

  const base = RookMesh(color, { x: 0, y: 0, z: 0 });

  const crown = PawnMesh(color, { x: 0, y: 0, z: baseSize / 2 });
  crown.rotateZ(THREE.MathUtils.degToRad(45))

  const figure = base.add(crown);
  figure.position.set(x, y, z + baseSize / 2)

  return figure

}



export { FieldMesh, PawnMesh, RookMesh, KnightMesh, BishopMesh, QueenMesh, KingMesh }