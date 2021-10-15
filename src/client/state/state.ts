import Field from "./field";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./pieces";
type Figure = Pawn | Rook | Knight | Bishop | Queen | King

export default class State {
  players: object;
  turns: [];
  board!: Field[][];
  boardFlat: Field[];
  pieces: Figure[];

  finished: boolean;
  winner: null;
  duration: number;

  constructor() {
    this.players = {};
    this.turns = [];
    
    
    this.boardFlat = [];
    this.pieces = [];

    this.finished = false;
    this.winner = null;
    this.duration = 300;

    this.init();
  }


  init() {

    return this.createBoard()
               // Keep the order of piece creation as black first due to later 
               // ordering implementation
               .createPieces("black")
               .createPieces("white")
               .setupInitialPositions();

  }


  createBoard() {
    
    const board:Field[][] = []

    for (let row = 0; row < 8; row++) {

      const fields:Field[] = []

      for (let col = 0; col < 8; col++) {

        let fieldColor 
        if (row % 2 !== 0) {
          if (col % 2 !== 0) 
            fieldColor = "white"
          else 
            fieldColor = "black"
        } else {
          if (col % 2 !== 0) 
            fieldColor = "black"
          else 
            fieldColor = "white"
        }

        const field = new Field(fieldColor, row, col)
        fields.push(field);

      }

      board.push(fields);
      
    }

    this.board = board;
    this.boardFlat = board.flat(2);

    return this;
  }


  createPieces( color: string ) {
    const pieceSet: Figure[] = []

    for (let i = 0; i < 8; i++) {
      const figure = new Pawn(color);
      pieceSet.push(figure)
    } 

    for (let i = 0; i < 2; i++) {
      const figure = new Rook(color);
      pieceSet.splice(pieceSet.length, 0, figure)
    }

    for (let i = 0; i < 2; i++) {
      const figure = new Knight(color);
      pieceSet.splice(pieceSet.length - 1, 0, figure)
    }

    for (let i = 0; i < 2; i++) {
      const figure = new Bishop(color);
      pieceSet.splice(pieceSet.length - 2, 0, figure)
    }

    for (let i = 0; i < 1; i++) {
      const figure = new Queen(color);
      pieceSet.splice(pieceSet.length - 3, 0, figure)
    }

    for (let i = 0; i < 1; i++) {
      const figure = new King(color);
      pieceSet.splice(pieceSet.length - 3, 0, figure)
    }

    // Concat is used since this functions has to be run two times, for each piece color
    this.pieces = this.pieces.concat(pieceSet);
    
    return this;
  }


  setupInitialPositions() {

    const pieces = this.pieces;

    // Sorting fields per rows (figures are already sorted)
    const fields = [
      ...this.board[1],
      ...this.board[0],
      ...this.board[6],
      ...this.board[7],
    ]

    // Position each piece to their initial place
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].setFieldRef( fields[i] );
      fields[i].setPieceRef( pieces[i] );
    }

    return this;
  }


  move( piece: Figure, target: Field ) {

    if (target.isOccupied && target.piece?.color !== piece.color) {

      const pieceToRemove = this.pieces.find(item => item.row === target.row && item.col === target.col);
    
      if (pieceToRemove) this.removePieceFromGame(pieceToRemove);
    
    }

    // Old field clean-up
    piece.field?.removePieceRef();

    // Setting new field
    target.setPieceRef( piece );
    piece.setFieldRef( target );
    
    piece.updateMovedStatus();

  }

  removePieceFromGame( piece: Figure ) {

    // Field clean-up
    piece.field?.removePieceRef();

    // Piece clean-up
    piece.removeFromGame();

    return this;
  }


  getLegalMoves( piece: Figure ) {
    return piece.getAllValidMoves( this.board ); 
  }

}