import Figure from './figure.js'

export { Pawn, Rook, Knight, Bishop, Queen, King }


class Pawn extends Figure {
  
  constructor( color ) {
    super( color, 'pawn' );
  }


  isValidMove( target ) {

    // Target is one row away
    if ((this.isEmptyFieldInTheSameColumn( target ) && this.isOneRowAway( target )) ||
        (this.isInNeighbouringColumn( target ) && this.isOneRowAway( target ) && target.isOccupiedByOpponent( this )))
      return true

    // Target is two rows away
    if (this.isEmptyFieldInTheSameColumn( target ) && this.isTwoRowsAway( target ) && !this.hasMoved) 
      return true

  }


  isEmptyFieldInTheSameColumn( target ) {
    return !target.isOccupied && target.col === this.col
  }

  isOneRowAway( target ) {
    if (this.color === 'white') {
      return target.row === this.row - 1
    } else {
      return target.row === this.row + 1
    }
  }

  isTwoRowsAway( target ) {
    if ( this.color === 'white' ) {
      return target.row === this.row - 2
    } else {
      return target.row === this.row + 2
    }
  }

  isInNeighbouringColumn( target ) {
    return target.col === this.col + 1 || target.col === this.col - 1
  }
}



class Rook extends Figure {
  constructor( color ) {
    super( color, 'rook' );
  }

  isValidMove( target ) {
    return this.isInLineWith( target );
  }
}



class Knight extends Figure {
  constructor( color ) {
    super( color, 'knight' );
  }

  isValidMove( target ) {

    return (Math.abs( target.row - this.row ) === 2 && 
            Math.abs( target.col - this.col ) === 1 )    ||
           (Math.abs( target.col - this.col ) === 2 && 
            Math.abs( target.row - this.row ) === 1 ) 

  }
}



class Bishop extends Figure {
  constructor( color ) {
    super( color, 'bishop' );
  }

  isValidMove( target ) {
    return this.isDiagonalTo( target );
  }
}



class Queen extends Figure {
  constructor( color ) {
    super( color, 'queen' );
  }

  isValidMove( target ) {
    return this.isDiagonalTo( target ) || this.isInLineWith( target );
  }
}



class King extends Figure {
  constructor( color ) {
    super( color, 'king' );
  }

  isValidMove( target ) {
    return Math.abs( target.col - this.col ) < 2    &&
           Math.abs( target.row - this.row ) < 2
  }
}