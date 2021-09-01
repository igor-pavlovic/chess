import Figure from './figure.js'

function Pawn(color) {
  Figure.apply(this, [ "pawn", color ] );
};


Pawn.prototype = new Figure();

Pawn.prototype.checkMove = function(target) {
  
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

Pawn.prototype.move = function(target) {
  if (this.checkMove(target)) {
    this.moveToField(target)
  } else {
    console.log("Move is not valid.")
  }
}



function Rook(color) {
  Figure.apply(this, [ "rook", color ]);
};

Rook.prototype = new Figure();



function Knight(color) {
  Figure.apply(this, [ "knight", color ]);
};

Knight.prototype = new Figure();



function Bishop(color) {
  Figure.apply(this, [ "bishop", color ]);
};

Bishop.prototype = new Figure();



function Queen(color) {
  Figure.apply(this, [ "queen", color ]);
};

Queen.prototype = new Figure();



function King(color) {
  Figure.apply(this, [ "king", color ]);
};

King.prototype = new Figure();


export { Pawn, Rook, Knight, Bishop, Queen, King }