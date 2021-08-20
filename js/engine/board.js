import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { FieldMesh, PawnMesh, RookMesh, KnightMesh, BishopMesh, QueenMesh, KingMesh } from './meshes.js';

function createBoard(scene, state) {
  
  const fieldMeshes = [];
  const pieceMeshes = []

  const colorFieldWhite = 'snow'
  const colorFieldBlack = 'gray'
  const colorFigureWhite = 'ivory'
  const colorFigureBlack = 'dimgray'


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
       
      const field = state.board[i][j];
      
      const position = {
        x: i,
        y: j,
        z: -0.05,
      }
      
      const color = field.color === 'white' ? colorFieldWhite : colorFieldBlack
      const mesh = FieldMesh(new THREE.MeshLambertMaterial({ color }), position);
      
      //
      field.mesh = mesh;
      mesh.state = field;
      
      fieldMeshes.push(mesh);

      scene.add(mesh);
    }
  }

  for (let piece of state.pieces) {

    const color = piece.color === 'white' ? colorFigureWhite : colorFigureBlack
    const material = new THREE.MeshLambertMaterial({ color })

    const position = {
      x: piece.col,
      y: piece.row,
      z: 0,
    }

    let mesh;

    if ( piece.type === "pawn") {
      mesh = PawnMesh( material, position )
    }

    if ( piece.type === "rook") {
      mesh = RookMesh( material, position )
    }

    if ( piece.type === "knight") {
      mesh = KnightMesh( material, position )
    }

    if ( piece.type === "bishop") {
      mesh = BishopMesh( material, position )
    }

    if ( piece.type === "queen") {
      mesh = QueenMesh( material, position )
    }

    if ( piece.type === "king") {
      mesh = KingMesh( material, position )
    }

    //
    piece.mesh = mesh;
    mesh.state = piece;

    pieceMeshes.push(mesh);

    scene.add(mesh);

  }


  return [ fieldMeshes, pieceMeshes ]
}

export default createBoard;