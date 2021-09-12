export default class Figure {
  constructor( color, type ) {
    this.color = color;
    this.type = type;

    this.col = null;
    this.row = null;
    this.field = null;
    this.hasMoved = false;
    this.isRemoved = false;
  }
  

  move( target ) {
    if (this.isValidMove( target )) {
      this.setFieldRef( target )
    } else {
      console.error('Either this is not a valid move or isValidMove method is not yet implemented for this figure.')
    }  
  }


  removeFromGame() {

    this.removeFieldRef();

    this.isRemoved = true;

    return this;
  }


  setFieldRef( field ) {
    this.row = field.row;
    this.col = field.col;
    
    this.field = field;

    return this;
  }


  removeFieldRef() {
    this.col = null;
    this.row = null;
    
    this.field = null;

    return this;
  }


  updateMovedStatus() {
    this.hasMoved = true;

    return this;
  }


  /* 
  Utility methods
  */

  isValidMove() {
    // To be rewritten by implementation of each figure type, defaults to false
    return false;
  }


  isInLineWith( target ) {
    return this.col === target.col || this.row === target.row
  }


  getAllMovesInLine( boardFlat ) {
    let viableFields = boardFlat.filter( field  =>  this.isInLineWith( field ))
    const occupiedFields = viableFields.filter( field => field.isOccupied)

    occupiedFields.forEach( occupiedField => {
      
      viableFields = viableFields.filter( field => {
        return (this.col - occupiedField.col > this.col - field.col) ||
               (this.row - occupiedField.row > this.row - field.row)
      })

    })

    return viableFields
  }


  isDiagonalTo( target ) {
    return (Math.abs( target.col - this.col ) === (Math.abs( target.row - this.row )))
  }

}