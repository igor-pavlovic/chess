import Field from "./field.js";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./pieces.js";

function State() {
  this.players = {};
  this.turns = [];
  this.finished = false;
  this.winner = null;
  this.duration = 300;
  this.board = [];
  this.pieces = [];

  /* Configuration */

  /* this.setDuration = (duration) => {
    this.duration = duration;
    this.updateTimers(duration)
  }

  this.updateTimers = (duration) => {
    for (player in this.players) {
      player.setTime(duration);
    }
  }

  this.setPlayers = (white, black) => {
    this.players = { white, black };
    white.joinGame(this);
    black.joinGame(this);
  } */

  /* Activities */
 /*  this.play = () => {
    this.finished = false;

    while (!this.finished) {
      const turn = new Turn(this);
      this.turns.push(turn);
    }

    console.log("Game is finished.");
    console.log("Winner is: ", this.winner);
  }

  this.finishGame = (loser) => {
    this.finished = true;
    this.winner = this.players.white === loser ? 
                            this.players.black : 
                            this.players.white;
  }  */


  this.init = function() {

    this.createBoard()

    const pieces = [
      ...this.createPieces("black"),
      ...this.createPieces("white")
    ] 
   
    this.pieces = pieces

    // Sorting fields per rows (figures are already sorted)
    const fields = [
      ...this.board[1],
      ...this.board[0],
      ...this.board[6],
      ...this.board[7],
    ]

    // Position each piece to their initial place
    for (let i = 0; i < pieces.length; i++) {
      pieces[i].moveToField( fields[i] );
    }

  }


  this.createBoard = function() {

    const board = []

    for (let row = 0; row < 8; row++) {

      const fields = []

      for (let col = 0; col < 8; col++) {

        let color 
        if (row % 2 !== 0) {
          if (col % 2 !== 0) {
            color = "white";
          } else {
            color = "black";
          }
        } else {
          if (col % 2 !== 0) {
            color = "black";
          } else {
            color = "white";
          }
        }

        const field = new Field(color, row, col)
        fields.push(field);

      }

      board.push(fields);
      
    }

    this.board = board
    this.boardFlat = board.flat(2)

    return this.board

  }


  this.createPieces = function( color ) {

    const pieces = []

    for (let i = 0; i < 8; i++) {
      const figure = new Pawn(color);
      pieces.push(figure)
    }

    for (let i = 0; i < 2; i++) {
      const figure = new Rook(color);
      pieces.splice(pieces.length, 0, figure)
    }

    for (let i = 0; i < 2; i++) {
      const figure = new Knight(color);
      pieces.splice(pieces.length - 1, 0, figure)
    }

    for (let i = 0; i < 2; i++) {
      const figure = new Bishop(color);
      pieces.splice(pieces.length - 2, 0, figure)
    }

    for (let i = 0; i < 1; i++) {
      const figure = new Queen(color);
      pieces.splice(pieces.length - 3, 0, figure)
    }

    for (let i = 0; i < 1; i++) {
      const figure = new King(color);
      pieces.splice(pieces.length - 3, 0, figure)
    }

    return pieces

  }

 /*  this.placePiece = function( piece, target ) {

    if (piece.field) piece.field.removePiece();
    

    // Move the piece to new position and set new links
    piece.moveToField( target )
    target.setPiece( piece )
 
  } */


  this.move = function( piece, target ) {

    if (target.isOccupied && target.piece.color !== piece.color) {

      const pieceToRemove = this.pieces.find(item => item.row === target.row && item.col === target.col);
    
      if (pieceToRemove) pieceToRemove.removeFromGame();
    
    }

    piece.moveToField( target );
    piece.updateMovedStatus();

  }


  this.getLegalMoves = function ( piece ) {

    return this.boardFlat.filter( field  =>  {
      return piece.isValidMove( field ) && (!field.isOccupied || (field.isOccupied && field.piece.color !== piece.color))
    }) 

  }

  
}

/* module.exports = Game; */
export default State;