import Figure from './figure.js'

export { Pawn, Rook, Knight, Bishop, Queen, King }





/* 
Pawn 
*/

function Pawn(color) {
  Figure.apply(this, [ "pawn", color ] );
};


Pawn.prototype = new Figure();

Pawn.prototype.isValidMove = function(target) {
  
  if ((this.color === "black" && 
          ((target.row === this.row + 1) || 
          (!this.hasMoved && target.row === this.row + 2))) ||
      (this.color === "white" && 
          ((target.row === this.row - 1) || 
          (!this.hasMoved && target.row === this.row - 2)))) {


    if (!target.occupied && target.col === this.col) return true;

    if (target.occupied &&
      (target.col === this.col + 1 || target.col === this.col - 1)) return true;

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
  return this.isInLine( target );
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
  return this.isDiagonal( target );
}



/* 
Queen 
*/

function Queen(color) {
  Figure.apply(this, [ "queen", color ]);
};

Queen.prototype = new Figure();

Queen.prototype.isValidMove = function( target ) {
  return this.isDiagonal( target ) || this.isInLine( target );
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

