import Figure from "./figure";
import { Pawn, Rook, Knight, Bishop, Queen, King } from "./pieces";

type Piece = Pawn | Rook | Knight | Bishop | Queen | King;

export default class Field {
  color: string;
  row: number;
  col: number;
  isOccupied: boolean;
  piece: Piece | null;

  constructor(color: string, row: number, col: number) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.piece = null;
    this.isOccupied = false;
  }

  removePieceRef() {
    this.isOccupied = false;
    this.piece = null;
  }

  setPieceRef(piece: Piece) {
    this.isOccupied = true;
    this.piece = piece;
  }

  isOccupiedByOpponent(testingPiece: Figure) {
    return this.isOccupied && this.piece && this.piece.color !== testingPiece.color;
  }

  isOccupiedByYou(testingPiece: Figure) {
    return this.isOccupied && this.piece && this.piece.color === testingPiece.color;
  }
}
