export default Field;

function Field(color, row, col) {  
  this.isOccupied = false;
  this.piece = null;
  this.color = color;
  this.row = row;
  this.col = col;
  this.mesh = null;

  /* this.name = () => {
    this.isOccupied = false;
    this.occupyingPiece = null;

    this.placePiece = (piece) => {
      if (!this.isOccupied) this.occupyingPiece = piece
    }
  } */
}


Field.prototype.removePiece = function() {
  this.isOccupied = false;
  this.piece = null;
}


Field.prototype.setPiece = function( piece ) {
  this.isOccupied = true;
  this.piece = piece;
}


