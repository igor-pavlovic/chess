import Figure from './figureProt.js'

export { Pawn, Rook, Knight, Bishop, Queen, King }





/* 
Pawn 
*/

function Pawn(color) {
  Figure.apply(this, [ "pawn", color ] );
};


Pawn.prototype = new Figure();

Pawn.prototype.isValidMove = function(target) {
  
  if (this.color === "black") {

    if ((!target.isOccupied && target.col === this.col && target.row === this.row + 1) ||
         (target.isOccupied && target.piece.color !== "black" && (target.col === this.col + 1 || target.col === this.col - 1) && target.row === this.row + 1)) 
      return true


    if (!this.hasMoved && !target.isOccupied && target.col === this.col && target.row === this.row + 2) 
      return true
    
  } 


  if (this.color === "white") {

    if ((!target.isOccupied && target.col === this.col && target.row === this.row - 1) ||
         (target.isOccupied && target.piece.color !== "white" && (target.col === this.col + 1 || target.col === this.col - 1) && target.row === this.row - 1)) 
      return true


    if (!this.hasMoved && !target.isOccupied && target.col === this.col && target.row === this.row - 2) 
      return true
    
  } 

}



/* 
Rook 
*/

function Rook(color) {
  Figure.apply(this, [ "rook", color ]);
};

Rook.prototype = new Figure();

Rook.prototype.isValidMove = function( target ) {
  return this.isInLineWith( target );
}
  

/* 
Knight 
*/

function Knight(color) {
  Figure.apply(this, [ "knight", color ]);
};

Knight.prototype = new Figure();

Knight.prototype.isValidMove = function( target ) {

  return (Math.abs( target.row - this.row ) === 2 && 
          Math.abs( target.col - this.col ) === 1 )    ||
         (Math.abs( target.col - this.col ) === 2 && 
          Math.abs( target.row - this.row ) === 1 ) 

}



/* 
Bishop 
*/

function Bishop(color) {
  Figure.apply(this, [ "bishop", color ]);
};

Bishop.prototype = new Figure();

Bishop.prototype.isValidMove = function( target ) {
  return this.isDiagonalTo( target );
}



/* 
Queen 
*/

function Queen(color) {
  Figure.apply(this, [ "queen", color ]);
};

Queen.prototype = new Figure();

Queen.prototype.isValidMove = function( target ) {
  return this.isDiagonalTo( target ) || this.isInLineWith( target );
}

/* 
King 
*/

function King(color) {
  Figure.apply(this, [ "king", color ]);
};

King.prototype = new Figure();

King.prototype.isValidMove = function( target ) {
  return Math.abs( target.col - this.col ) < 2    &&
         Math.abs( target.row - this.row ) < 2
}

