import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Vector2d} from "../chess-possible-move/2d-vestors";

export class Rook extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.lineMoving])
    }
    getAllPossibleDirections(): Array<Vector2d> {
        return MovingStrategies.lineMoving.getAllPossibleDirections()
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Rook.svg`)
    }

    canMoveMultipleSquares(): boolean {
        return true;
    }
}
