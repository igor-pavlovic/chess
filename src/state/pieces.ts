import Figure from './figure'
import Field from "./field"

export { Pawn, Rook, Knight, Bishop, Queen, King }

type Board = Field[][]

class Pawn extends Figure {
  oneRowForward: number
  twoRowsForward: number
  isFirstStepPossible: boolean
  
  constructor( color: string ) {
    super( color, 'pawn' );
    this.oneRowForward = this.color === 'white' ? -1 : 1;
    this.twoRowsForward = this.color === 'white' ? -2 : 2;
    this.isFirstStepPossible = false;
  }

  isValidMove( target: Field ) {

    // Target is one row away
    if ((this.isEmptyFieldInTheSameColumn( target ) && this.isOneRowAway( target )) ||
        (this.isInNeighbouringColumn( target ) && this.isOneRowAway( target ) && target.isOccupiedByOpponent( this )))
      return true

    // Target is two rows away
    if (this.isEmptyFieldInTheSameColumn( target ) && this.isTwoRowsAway( target ) && !this.hasMoved) 
      return true

    return false
  }

  isEmptyFieldInTheSameColumn( target: Field ) {
    return !target.isOccupied && target.col === this.col
  }

  isOneRowAway( target: Field ) {
    if (!this.col || !this.row) return
    return target.row === this.row + this.oneRowForward
  }

  isTwoRowsAway( target: Field ) {
    if (!this.col || !this.row) return
    return target.row === this.row + this.twoRowsForward
  }

  isInNeighbouringColumn( target: Field ) {
    if (!this.col || !this.row) return
    return target.col === this.col + 1 || target.col === this.col - 1
  }


  getAllValidMoves( board: Board ) {
    if (!this.col || !this.row) return
    const viableFields = [];

    // check for enpassante?
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
      let field: Field;
      
      try {
        field = board[ this.row + position.rowOffset ][ this.col + position.colOffset ];
      } catch (error) {}

      if (field! && position.checks.every(check => check(field))) viableFields.push(field);
    }   
    
    return viableFields
  }


  isValidOneStepMove = ( target: Field ) => {
    this.isFirstStepPossible = !target.isOccupied;
    return this.isFirstStepPossible
  }

  isValidTwoStepMove = ( target: Field ) => {
    return this.isFirstStepPossible && !target.isOccupied && !this.hasMoved
  }

  isValidAttackingMove = ( target: Field ) => {
    return target.isOccupiedByOpponent( this )
  }
}



class Rook extends Figure {
  constructor( color: string ) {
    super( color, 'rook' );
  }

  isValidMove( target: Field ) {
    return this.isInLineWith( target );
  }

  getAllValidMoves( board: Board ) {
    return this.getAllInlineMoves( board );
  }
}



class Knight extends Figure {
  constructor( color: string ) {
    super( color, 'knight' );
  }

  isValidMove( target: Field ) {
    if (!this.col || !this.row) return

    return (Math.abs( target.row - this.row ) === 2 && 
            Math.abs( target.col - this.col ) === 1 )    ||
           (Math.abs( target.col - this.col ) === 2 && 
            Math.abs( target.row - this.row ) === 1 ) 
  }

  getAllValidMoves( board: Board ) {
    if (!this.col || !this.row) return

    const viableFields = [];
    const fieldPositions = [
      {
        rowOffset: -2,
        colOffset: -1,
      }, 
      {
        rowOffset: -2,
        colOffset: 1,
      }, 
      {
        rowOffset: -1,
        colOffset: -2,
      }, 
      {
        rowOffset: -1,
        colOffset: 2,
      }, 
      {
        rowOffset: 1,
        colOffset: -2,
      }, 
      {
        rowOffset: 1,
        colOffset: 2,
      }, 
      {
        rowOffset: 2,
        colOffset: -1,
      }, 
      {
        rowOffset: 2,
        colOffset: -1,
      }, 
    ]

    for (let position of fieldPositions) {    
      let field: Field | undefined;
      
      try {
        field = board[ this.row + position.rowOffset ][ this.col + position.colOffset ];
      } catch (error) {}

      if (field && (!field.isOccupied || field.isOccupiedByOpponent( this ))) viableFields.push(field);
    }   
    
    return viableFields
  }
}



class Bishop extends Figure {
  constructor( color: string ) {
    super( color, 'bishop' );
  }

  isValidMove( target: Field ) {
    return this.isDiagonalTo( target );
  }

  getAllValidMoves( board: Board ) {
    return this.getAllDiagonalMoves( board );
  }
}



class Queen extends Figure {
  constructor( color: string ) {
    super( color, 'queen' );
  }

  isValidMove( target: Field ) {
    return this.isDiagonalTo( target ) || this.isInLineWith( target );
  }

  getAllValidMoves( board: Board ) {
    return [...this.getAllInlineMoves( board ), ...this.getAllDiagonalMoves( board )];
  }
}



class King extends Figure {
  constructor( color: string ) {
    super( color, 'king' );
  }

  isValidMove( target: Field ) {
    if (!this.col || !this.row) return
    return Math.abs( target.col - this.col ) < 2    &&
           Math.abs( target.row - this.row ) < 2
  }

  getAllValidMoves( board: Board ) {
    return [...this.getAllInlineMoves( board ), ...this.getAllDiagonalMoves( board )];
  }
}