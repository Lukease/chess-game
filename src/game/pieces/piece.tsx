import {MovingStrategy} from '../chess-possible-move/moving-strategy'
import {Coordinate} from '../chess-possible-move/coordinate'
import {CoordinateService} from '../suppliers/coordinate-service'
import {Move} from '../chess-possible-move/move'
import {Vector2d} from '../chess-possible-move/2d-vestors'
import {Pawn} from "./pawn";

export abstract class Piece {
    color: string
    currentCoordinate: Coordinate
    startingCoordinate: Coordinate
    name: string
    movingStrategies: Array<MovingStrategy>

    protected constructor(color: string, id: string, name: string, movingStrategies: Array<MovingStrategy>) {
        this.color = color
        this.currentCoordinate = CoordinateService.getCoordinateById(id)
        this.name = name
        this.movingStrategies = movingStrategies
        this.startingCoordinate = this.currentCoordinate
    }

    abstract getAllPossibleDirections(): Array<Vector2d>

    getAllPossibleDirectionsWithColor(): Array<Vector2d> {
        if (this.name === 'Pawn' && this.color === 'black') {
            return this.getAllPossibleDirections().map(direction => new Vector2d(direction.x, direction.y * -1))
        } else {
            return this.getAllPossibleDirections()
        }

    }

    abstract getImageUrl(): string

    canDelete() {
        return true
    }

    isInStartingPosition() {
        return this.startingCoordinate === this.currentCoordinate
    }

    getSpecialMoves(): Array<Move> {
        return []
    }

    abstract canMoveMultipleSquares(): boolean
}

