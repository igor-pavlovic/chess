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


  isDiagonalTo( target ) {
    return (Math.abs( target.col - this.col ) === (Math.abs( target.row - this.row )))
  }


  getAllInlineMoves( board ) {
    const viableFields = [];
    const directions = ["up", "right", "down", "left"]

    for (let direction of directions) {

      for (let i = 1; i < 8; i++) {
        let field;
        
        try {
          switch (direction) {
            case "up":
              field = board[this.row][this.col + i]
              break
            case "down":
              field = board[this.row][this.col - i]
              break
            case "left":
              field = board[this.row - i][this.col]
              break
            case "right":
              field = board[this.row + i][this.col]
              break
            default: 
              console.log("Something is wrong with provided directions.")
          }
        } catch (error) {
          break
        }
        
       /*  if (field && field.isViableMoveFor( this )) viableFields.push(field)
        else break
 */
        if (field) {
          if (field.isOccupiedByYou( this )) break
          if (field.isOccupiedByOpponent( this )) {
            viableFields.push(field)
            break
          }
          if (!field.isOccupied) viableFields.push(field)
        } else break
      }
    }

    return viableFields
  }


  getAllDiagonalMoves( board ) {
    const viableFields = [];
    const directions = ["up-left", "up-right", "down-left", "down-right"]

    for (let direction of directions) {

      for (let i = 1; i < 8; i++) {
        let field;
        
        try {
          switch (direction) {
            case "up-left":
              field = board[this.row - i][this.col + i]
              break
            case "up-right":
              field = board[this.row + i][this.col + i]
              break
            case "down-left":
              field = board[this.row - i][this.col - i]
              break
            case "down-right":
              field = board[this.row + i][this.col - i]
              break
            default: 
              console.log("Something is wrong with provided directions.")
          }
        } catch (error) {
          break
        }
        
        if (field) {
          if (field.isOccupiedByYou( this )) break
          if (field.isOccupiedByOpponent( this )) {
            viableFields.push(field)
            break
          }
          if (!field.isOccupied) viableFields.push(field)
        } else break
      }
    }

    return viableFields
  }
}