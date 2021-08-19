import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';

const baseSize = 0.6;
const secondarySize = Math.sqrt((baseSize / 2) ** 2 * 2)


const createPawn = (color, fieldPosition) => {
  // Pythagora
  const secondarySize = Math.sqrt((baseSize / 2) ** 2 * 2)

  // Geometry
  const geometry = new THREE.BoxGeometry(secondarySize, secondarySize, secondarySize);

  // Mesh
  const mesh = new THREE.Mesh(geometry, color);

  // Borders
  const wireframe = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }))
  edges.renderOrder = 1;

  const figure = new THREE.Group();
  figure.add(mesh);
  figure.add(edges);

  // Positioning
  const x = fieldPosition.x;
  const y = fieldPosition.y;
  const z = fieldPosition.z + secondarySize / 2;

  // edges.position.set(x, y, z)
  figure.position.set(x, y, z)

  return figure
}


const createRook = (color, fieldPosition) => {
  // Geometry
  const geometry = new THREE.BoxGeometry(baseSize, baseSize, baseSize);

  // Mesh
  const mesh = new THREE.Mesh(geometry, color);

  // Borders
  const wireframe = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }))
  edges.renderOrder = 1;

  const figure = new THREE.Group();
  figure.add(mesh);
  figure.add(edges);

  // Positioning
  const x = fieldPosition.x;
  const y = fieldPosition.y;
  const z = fieldPosition.z + baseSize / 2;

  figure.position.set(x, y, z)

  return figure
}

const createKnightBase = (color) => {
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

  // Borders
  const wireframe = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }))
  edges.renderOrder = 1;

  const figure = new THREE.Group();
  figure.add(mesh);
  figure.add(edges);

  return figure
}

const createKnight = (color, fieldPosition) => {
  const base = createKnightBase(color);
  const crown = createKnightBase(color);

  crown.position.set(baseSize, baseSize, baseSize / 2);
  crown.rotateZ( THREE.MathUtils.degToRad( 180 ) )


  const figure = new THREE.Group();
  figure.add(base);
  figure.add(crown);

  // Positioning
  const x = fieldPosition.x - baseSize / 2;
  const y = fieldPosition.y - baseSize / 2;
  const z = fieldPosition.z;

  figure.position.set(x, y, z);

  return figure
}

const createBishop = (color, fieldPosition) => {
  const shape = new THREE.Shape();

  shape.moveTo(0, 0);
  shape.lineTo(0, 0.2);
  shape.lineTo(0.3, 0.5);
  shape.lineTo(0, 0.8);
  shape.lineTo(0, 1);

  shape.lineTo(0.2, 1);
  shape.lineTo(0.5, 0.7);
  shape.lineTo(0.8, 1);
  shape.lineTo(1, 1);

  shape.lineTo(1, 0.8);
  shape.lineTo(0.7, 0.5);
  shape.lineTo(1, 0.2);
  shape.lineTo(1, 0);

  shape.lineTo(0.8, 0);
  shape.lineTo(0.5, 0.3);
  shape.lineTo(0.2, 0);
  shape.lineTo(0, 0);

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

  // Borders
  const wireframe = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }))
  edges.renderOrder = 1;

  const figure = new THREE.Group();
  figure.add(mesh);
  figure.add(edges);

  // Positioning
  const x = fieldPosition.x - baseSize / 2;
  const y = fieldPosition.y - baseSize / 2;
  const z = fieldPosition.z;

  figure.position.set(x, y, z);

  return figure
}

const createQueen = (color, fieldPosition) => {
  const base = createRook(color, { x: 0, y: 0, z: 0 });

  const geometry = new THREE.SphereGeometry(baseSize / 2, 32, 16);
  const mesh = new THREE.Mesh(geometry, color);

  // Borders
  const wireframe = new THREE.EdgesGeometry(geometry);
  const edges = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 }))
  edges.renderOrder = 1;

  const crown = new THREE.Group();
  crown.add(mesh);
  crown.add(edges);
  crown.position.set(0, 0, baseSize * 1.5)

  const figure = new THREE.Group();
  figure.add(base);
  figure.add(crown);

  // Positioning
  const x = fieldPosition.x;
  const y = fieldPosition.y;
  const z = fieldPosition.z;

  figure.position.set(x, y, z)

  return figure
}

const createKing = (color, fieldPosition) => {
  const base = createRook(color, { x: 0, y: 0, z: 0 });

  const crownPosition = { x: 0, y: 0, z: 0 }
  crownPosition.z += baseSize;
  const crown = createPawn(color, crownPosition);
  crown.rotateZ( THREE.MathUtils.degToRad( 45 ) )

  const figure = new THREE.Group();
  figure.add( base );
  figure.add( crown );

  // Positioning
  const x = fieldPosition.x;
  const y = fieldPosition.y;
  const z = fieldPosition.z;

  figure.position.set(x, y, z)

  return figure
}

export { createPawn, createRook, createKnight, createBishop, createQueen, createKing }