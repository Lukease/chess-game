import {
    DiagonalMovingStrategy,
    KnightMovingStrategy,
    LineMovingStrategy, PawnMovingStrategy
} from '../chess-possible-move'

export class MovingStrategies {

        static diagonalMoving = new DiagonalMovingStrategy()
        static lineMoving = new LineMovingStrategy()
        static knightMoving = new KnightMovingStrategy()
        static pawnMoving = new PawnMovingStrategy()
}