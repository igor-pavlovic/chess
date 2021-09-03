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


Figure.prototype.removeFromField = function() {
  this.isRemoved = true;
  this.col = null;
  this.row = null;
  this.field = null;
}


Figure.prototype.moveToField = function( field )  {
  this.field = field;
  this.row = field.row;
  this.col = field.col;
  this.hasMoved = true;
}


// Empty method, to be rewritten by each figure
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


