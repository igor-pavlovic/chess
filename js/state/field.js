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

export default Field