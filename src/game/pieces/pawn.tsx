import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Vector2d} from '../chess-possible-move'

export class Pawn extends Piece {

    constructor(color: string, id: string, name: string) {
        super(color, id, name, [MovingStrategies.pawnMoving])
    }

    getAllPossibleDirections(): Array<Vector2d> {
        return MovingStrategies.pawnMoving.getAllPossibleDirections()
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Pawn.svg`)
    }

    canJump(): boolean {
        return false;
    }

    canMoveMultipleSquares(): boolean {
        return false
    }
}