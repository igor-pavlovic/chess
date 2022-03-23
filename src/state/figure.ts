import Field from "./field";

enum Direction {
  Up,
  Left,
  Down,
  Right,
}

export default class Figure {
  color: string;
  type: string;
  col: number | null;
  row: number | null;
  field: Field | null;
  hasMoved: boolean;
  isRemoved: boolean;

  constructor(color: string, type: string) {
    this.color = color;
    this.type = type;

    this.col = null;
    this.row = null;
    this.field = null;
    this.hasMoved = false;
    this.isRemoved = false;
  }

  removeFromGame() {
    this.removeFieldRef();
    this.isRemoved = true;
    return this;
  }

  setFieldRef(field: Field) {
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

  isInLineWith(target: Field) {
    return this.col === target.col || this.row === target.row;
  }

  isDiagonalTo(target: Field) {
    if (!this.row || !this.col) return;
    return Math.abs(target.col - this.col) === Math.abs(target.row - this.row);
  }

  getAllDiagonalMoves(board: Field[][]) {
    return this.getMoves((direction: Direction, offset: number) => {
      if (!this.row || !this.col) return;

      try {
        switch (direction) {
          case Direction.Up:
            return board[this.row + offset][this.col + offset];
          case Direction.Down:
            return board[this.row + offset][this.col - offset];
          case Direction.Left:
            return board[this.row - offset][this.col + offset];
          case Direction.Right:
            return board[this.row - offset][this.col - offset];
          default:
            return;
        }
      } catch (error) {
        return;
      }
    });
  }

  getAllInlineMoves(board: Field[][]) {
    return this.getMoves((direction: Direction, offset: number) => {
      if (!this.row || !this.col) return;

      try {
        switch (direction) {
          case Direction.Up:
            return board[this.row][this.col + offset];
          case Direction.Down:
            return board[this.row][this.col - offset];
          case Direction.Left:
            return board[this.row - offset][this.col];
          case Direction.Right:
            return board[this.row + offset][this.col];
          default:
            return;
        }
      } catch (error) {
        return;
      }
    });
  }

  getMoves(findField: (direction: Direction, offset: number) => Field | undefined) {

    const viableFields: Field[] = [];
    const directions = [
      Direction.Up,
      Direction.Down,
      Direction.Left,
      Direction.Right,
    ];

    for (let direction of directions) {
      for (let i = 1; i < 8; i++) {

        const field = findField(direction, i);

        if (field) {
          if (field.isOccupiedByYou(this)) 
            break;

          if (field.isOccupiedByOpponent(this)) {
            viableFields.push(field);
            break;
          }

          if (!field.isOccupied) 
            viableFields.push(field);
        } else break;
      }
    }

    return viableFields;
  }
}
