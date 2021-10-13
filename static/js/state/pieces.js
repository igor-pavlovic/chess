import Figure from './figure.js'

export { Pawn, Rook, Knight, Bishop, Queen, King }


class Pawn extends Figure {
  
  constructor( color ) {
    super( color, 'pawn' );
    this.oneRowForward = this.color === 'white' ? -1 : 1;
    this.twoRowsForward = this.color === 'white' ? -2 : 2;
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
    return target.row === this.row + this.oneRowForward
  }

  isTwoRowsAway( target ) {
    return target.row === this.row + this.twoRowsForward
  }

  isInNeighbouringColumn( target ) {
    return target.col === this.col + 1 || target.col === this.col - 1
  }


  getAllValidMoves( board ) {

    // check for enpassante?

    this.isFirstStepPossible = false;
    const viableFields = [];

    const fieldPositions = [
      {
        rowOffset: this.oneRowForward,
        colOffset: 0,
        checks: [ this.isValidOneStepMove ]
      }, 
      {
        rowOffset: this.twoRowsForward,
        colOffset: 0,
        checks: [ this.isValidTwoStepMove ]
      },
      { 
        rowOffset: this.oneRowForward,
        colOffset: -1,
        checks: [ this.isValidAttackingMove ]
      },
      {
        rowOffset: this.oneRowForward,
        colOffset: 1,
        checks: [ this.isValidAttackingMove ]
      }
    ]

    for (let position of fieldPositions) {    
      let field;
      
      try {
        field = board[ this.row + position.rowOffset ][ this.col + position.colOffset ];
      } catch (error) {}

      if (field && position.checks.every(check => check(field))) viableFields.push(field);
    }   
    
    return viableFields
  }


  isValidOneStepMove = ( target ) => {
    this.isFirstStepPossible = !target.isOccupied;
    return this.isFirstStepPossible
  }

  isValidTwoStepMove = ( target ) => {
    return this.isFirstStepPossible && !target.isOccupied && !this.hasMoved
  }

  isValidAttackingMove = ( target ) => {
    return target.isOccupiedByOpponent( this )
  }
}



class Rook extends Figure {
  constructor( color ) {
    super( color, 'rook' );
  }

  isValidMove( target ) {
    return this.isInLineWith( target );
  }

  getAllValidMoves( board ) {
    return this.getAllInlineMoves( board );
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

  getAllValidMoves( board ) {
    return this.getAllDiagonalMoves( board );
  }
}



class Queen extends Figure {
  constructor( color ) {
    super( color, 'queen' );
  }

  isValidMove( target ) {
    return this.isDiagonalTo( target ) || this.isInLineWith( target );
  }

  getAllValidMoves( board ) {
    return [...this.getAllInlineMoves( board ), ...this.getAllDiagonalMoves( board )];
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