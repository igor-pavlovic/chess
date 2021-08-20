import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';

const fieldSize = 1;
const baseSize = fieldSize * 0.6;
// Pythagora's theorem to get size of the crown and pawn elements
const secondarySize = Math.sqrt((baseSize / 2) ** 2 * 2)


function FieldMesh(color, { x, y, z }) {

  const geometry = new THREE.BoxGeometry(1, 1, 0.1);

  const mesh = new THREE.Mesh(geometry, color);

  mesh.position.set(x, y, z);

  return mesh;

}

function PawnMesh( color, { x, y, z } ) {

  const geometry = new THREE.BoxGeometry(secondarySize, secondarySize, secondarySize);
  const mesh = new THREE.Mesh(geometry, color);

  mesh.position.set(x, y, z + secondarySize / 2)

  return mesh

}



function RookMesh( color, { x, y, z } ) {

  const geometry = new THREE.BoxGeometry(baseSize, baseSize, baseSize);
  const mesh = new THREE.Mesh(geometry, color);

  mesh.position.set(x, y, z + baseSize / 2)

  return mesh

}



function KnightBaseMesh( color ) {

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
  const mesh = new THREE.Mesh(geometry, color);

  return mesh

}



function KnightMesh( color, { x, y, z } ) {

  const base = KnightBaseMesh(color);
  const top = KnightBaseMesh(color);

  top.position.set(baseSize, baseSize, baseSize / 2);
  top.rotateZ( THREE.MathUtils.degToRad( 180 ) )
  
  // Join two meshes
  const figure = base.add(top);

  figure.position.set( x - baseSize / 2, y - baseSize / 2, z );

  return figure

}



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


  mesh.position.set( x, y, z );

  return mesh

}



function QueenMesh(color, { x, y, z } ) {

  const base = RookMesh(color, { x: 0, y: 0, z: 0});

  const geometry = new THREE.SphereGeometry(baseSize / 2, 32, 16);
  const crown = new THREE.Mesh(geometry, color);

  crown.position.set(0, 0, baseSize)

  // Join the crown to the base
  const figure = base.add(crown);
 

  figure.position.set( x, y, z + baseSize / 2 )

  return figure

}



function KingMesh(color,  { x, y, z } ) {

  const base = RookMesh(color, { x: 0, y: 0, z: 0 });

  const crown = PawnMesh(color, { x: 0, y: 0, z: baseSize / 2 });
  crown.rotateZ( THREE.MathUtils.degToRad( 45 ) )

  // Join the crown to the base
  const figure = base.add( crown );

  figure.position.set( x, y, z + baseSize / 2 )

  return figure

}



export { FieldMesh, PawnMesh, RookMesh, KnightMesh, BishopMesh, QueenMesh, KingMesh }