import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { FieldMesh, PawnMesh, RookMesh, KnightMesh, BishopMesh, QueenMesh, KingMesh } from './meshes.js';
import { createMaterialFieldWhite, createMaterialFieldBlack, createMaterialFigureWhite, createMaterialFigureBlack } from "./materials.js"

function createBoard(scene, state) {
  
  const fieldMeshes = [];
  const pieceMeshes = []

  const colorFieldWhite = 0xFFFFFF || 'snow'
  const colorFieldBlack = 0x828382 || 'gray'
  const colorFigureWhite = 0xFFFDE9 || 'ivory'
  const colorFigureBlack = 0x545454 || 'dimgray'


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
       
      const field = state.board[i][j];
      
      const position = {
        x: j,
        y: i,
        z: -0.05,
      }
      
      const material = field.color === 'white' ? createMaterialFieldWhite() : createMaterialFieldBlack()
      const mesh = FieldMesh(material, position);
      
      //
      field.mesh = mesh;
      mesh.state = field;
      
      fieldMeshes.push(mesh);

      scene.add(mesh);
    }
  }
  

  for (let piece of state.pieces) {

    const material = piece.color === 'white' ? createMaterialFigureWhite() : createMaterialFigureBlack()

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