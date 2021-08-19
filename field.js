import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';

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

export default createField