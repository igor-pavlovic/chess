export default Figure;

function Figure(type, color) {
  this.type = type;
  this.color = color;
  this.col = null;
  this.row = null;
  this.field = null;
  this.hasMoved = false;
  this.isRemoved = false;
}


Figure.prototype.removeFromGame = function() {

  this.field.removePiece();
  this.field = null;

  this.isRemoved = true;
  this.col = null;
  this.row = null;
}


Figure.prototype.moveToField = function( field )  {

  // Clear up piece's old field and set it to unoccupied
  if (this.field) this.field.removePiece();

  this.row = field.row;
  this.col = field.col;
  
  // Set up new links
  this.field = field;
  field.setPiece( this );

}


Figure.prototype.updateMovedStatus = function() { this.hasMoved = true; }


// Empty method, to be rewritten by implementation of each figure type
Figure.prototype.isValidMove = function() {
  console.log( "Method isValidMove() is not implemented for this figure type.")
}


Figure.prototype.move = function(target) {
  if (this.isValidMove(target)) {
    this.moveToField(target)
  } else {
    console.log("Move is not valid.")
  }
}



/* 
Utility functions
*/


Figure.prototype.isInLine = function( target ) {
  return this.col === target.col || this.row === target.row
}

Figure.prototype.isDiagonal = function( target ) {
  return (Math.abs( target.col - this.col ) === (Math.abs( target.row - this.row )))
}


