export default class Field {
  constructor( color, row, col ) {
    this.color = color;
    this.row = row;
    this.col = col;    
    this.piece = null;
    this.isOccupied = false;
  }

  removePieceRef() {
    this.isOccupied = false;
    this.piece = null;
  }

  setPieceRef( piece ) {
    this.isOccupied = true;
    this.piece = piece;
  }

  isOccupiedByOpponent( testingPiece ) {
    return this.isOccupied && this.piece.color !== testingPiece.color;
  }

  isOccupiedByYou( testingPiece ) {
    return this.isOccupied && this.piece.color === testingPiece.color;
  }

  isViableMoveFor( testingPiece ) {
    return !this.isOccupied || this.isOccupiedByOpponent( testingPiece );
  }
}