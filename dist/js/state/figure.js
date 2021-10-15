"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
class Figure {
    constructor(color, type) {
        this.color = color;
        this.type = type;
        this.col = null;
        this.row = null;
        this.field = null;
        this.hasMoved = false;
        this.isRemoved = false;
    }
    /* move(target: Field) {
      if (this.isValidMove(target)) {
        this.setFieldRef(target);
      } else {
        console.error(
          "Either this is not a valid move or isValidMove method is not yet implemented for this figure."
        );
      }
    } */
    removeFromGame() {
        this.removeFieldRef();
        this.isRemoved = true;
        return this;
    }
    setFieldRef(field) {
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
    isValidMovee(target) {
        // To be rewritten by implementation of each figure type, defaults to false
        return false;
    }
    isInLineWith(target) {
        return this.col === target.col || this.row === target.row;
    }
    isDiagonalTo(target) {
        if (!this.row || !this.col)
            return;
        return Math.abs(target.col - this.col) === Math.abs(target.row - this.row);
    }
    getAllDiagonalMoves(board) {
        return this.getMoves((direction, offset) => {
            if (!this.row || !this.col)
                return;
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
            }
            catch (error) {
                return;
            }
        });
    }
    getAllInlineMoves(board) {
        return this.getMoves((direction, offset) => {
            if (!this.row || !this.col)
                return;
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
            }
            catch (error) {
                return;
            }
        });
    }
    getMoves(findField) {
        const viableFields = [];
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
                }
                else
                    break;
            }
        }
        return viableFields;
    }
}
exports.default = Figure;
