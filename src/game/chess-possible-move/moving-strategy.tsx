import {Vector2d} from './2d-vestors'

export abstract class MovingStrategy {
    abstract getAllPossibleDirections(): Array<Vector2d>
}

export class DiagonalMovingStrategy extends MovingStrategy {

    getAllPossibleDirections(): Array<Vector2d> {
        return [
            new Vector2d(1,1),
            new Vector2d(-1,-1),
            new Vector2d(1,-1),
            new Vector2d(-1,1),
        ]
    }

}

export class LineMovingStrategy extends MovingStrategy {

    getAllPossibleDirections(): Array<Vector2d> {
        return [
            new Vector2d(0,1),
            new Vector2d(0,-1),
            new Vector2d(1,0),
            new Vector2d(-1,0)]
    }
}

export class KnightMovingStrategy extends MovingStrategy {
    getAllPossibleDirections(): Array<Vector2d> {
        return [
            new Vector2d(-1,2),
            new Vector2d(-1,-2),
            new Vector2d(1,-2),
            new Vector2d(1,2),
            new Vector2d(2,1),
            new Vector2d(2,-1),
            new Vector2d(-2,1),
            new Vector2d(-2,-1)
        ]
    }
}

export class PawnMovingStrategy extends MovingStrategy {
    getAllPossibleDirections(): Array<Vector2d> {
        return [
            new Vector2d(0,1),
        ]
    }


}