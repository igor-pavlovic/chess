"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = exports.Queen = exports.Bishop = exports.Knight = exports.Rook = exports.Pawn = void 0;
const figure_1 = __importDefault(require("./figure"));
class Pawn extends figure_1.default {
    constructor(color) {
        super(color, 'pawn');
        this.isValidOneStepMove = (target) => {
            this.isFirstStepPossible = !target.isOccupied;
            return this.isFirstStepPossible;
        };
        this.isValidTwoStepMove = (target) => {
            return this.isFirstStepPossible && !target.isOccupied && !this.hasMoved;
        };
        this.isValidAttackingMove = (target) => {
            return target.isOccupiedByOpponent(this);
        };
        this.oneRowForward = this.color === 'white' ? -1 : 1;
        this.twoRowsForward = this.color === 'white' ? -2 : 2;
        this.isFirstStepPossible = false;
    }
    isValidMove(target) {
        // Target is one row away
        if ((this.isEmptyFieldInTheSameColumn(target) && this.isOneRowAway(target)) ||
            (this.isInNeighbouringColumn(target) && this.isOneRowAway(target) && target.isOccupiedByOpponent(this)))
            return true;
        // Target is two rows away
        if (this.isEmptyFieldInTheSameColumn(target) && this.isTwoRowsAway(target) && !this.hasMoved)
            return true;
    }
    isEmptyFieldInTheSameColumn(target) {
        return !target.isOccupied && target.col === this.col;
    }
    isOneRowAway(target) {
        if (!this.col || !this.row)
            return;
        return target.row === this.row + this.oneRowForward;
    }
    isTwoRowsAway(target) {
        if (!this.col || !this.row)
            return;
        return target.row === this.row + this.twoRowsForward;
    }
    isInNeighbouringColumn(target) {
        if (!this.col || !this.row)
            return;
        return target.col === this.col + 1 || target.col === this.col - 1;
    }
    getAllValidMoves(board) {
        if (!this.col || !this.row)
            return;
        const viableFields = [];
        // check for enpassante?
        const fieldPositions = [
            {
                rowOffset: this.oneRowForward,
                colOffset: 0,
                checks: [this.isValidOneStepMove]
            },
            {
                rowOffset: this.twoRowsForward,
                colOffset: 0,
                checks: [this.isValidTwoStepMove]
            },
            {
                rowOffset: this.oneRowForward,
                colOffset: -1,
                checks: [this.isValidAttackingMove]
            },
            {
                rowOffset: this.oneRowForward,
                colOffset: 1,
                checks: [this.isValidAttackingMove]
            }
        ];
        for (let position of fieldPositions) {
            let field;
            try {
                field = board[this.row + position.rowOffset][this.col + position.colOffset];
            }
            catch (error) { }
            if (field && position.checks.every(check => check(field)))
                viableFields.push(field);
        }
        return viableFields;
    }
}
exports.Pawn = Pawn;
class Rook extends figure_1.default {
    constructor(color) {
        super(color, 'rook');
    }
    isValidMove(target) {
        return this.isInLineWith(target);
    }
    getAllValidMoves(board) {
        return this.getAllInlineMoves(board);
    }
}
exports.Rook = Rook;
class Knight extends figure_1.default {
    constructor(color) {
        super(color, 'knight');
    }
    isValidMove(target) {
        if (!this.col || !this.row)
            return;
        return (Math.abs(target.row - this.row) === 2 &&
            Math.abs(target.col - this.col) === 1) ||
            (Math.abs(target.col - this.col) === 2 &&
                Math.abs(target.row - this.row) === 1);
    }
    getAllValidMoves(board) {
        if (!this.col || !this.row)
            return;
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
        ];
        for (let position of fieldPositions) {
            let field;
            try {
                field = board[this.row + position.rowOffset][this.col + position.colOffset];
            }
            catch (error) { }
            if (field && (!field.isOccupied || field.isOccupiedByOpponent(this)))
                viableFields.push(field);
        }
        return viableFields;
    }
}
exports.Knight = Knight;
class Bishop extends figure_1.default {
    constructor(color) {
        super(color, 'bishop');
    }
    isValidMove(target) {
        return this.isDiagonalTo(target);
    }
    getAllValidMoves(board) {
        return this.getAllDiagonalMoves(board);
    }
}
exports.Bishop = Bishop;
class Queen extends figure_1.default {
    constructor(color) {
        super(color, 'queen');
    }
    isValidMove(target) {
        return this.isDiagonalTo(target) || this.isInLineWith(target);
    }
    getAllValidMoves(board) {
        return [...this.getAllInlineMoves(board), ...this.getAllDiagonalMoves(board)];
    }
}
exports.Queen = Queen;
class King extends figure_1.default {
    constructor(color) {
        super(color, 'king');
    }
    isValidMove(target) {
        if (!this.col || !this.row)
            return;
        return Math.abs(target.col - this.col) < 2 &&
            Math.abs(target.row - this.row) < 2;
    }
}
exports.King = King;
