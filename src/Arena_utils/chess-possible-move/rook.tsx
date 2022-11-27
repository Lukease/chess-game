import {getAllPossibleMoves} from '../possible-moves-utils'
import {getCorrectIds} from './possible-move-utils'
import {Move} from './move'
import {Piece} from './piece'

export class Rook extends Piece {
    getAllPossibleMoves(): Move[] {
        let rook: Move = new Move(false, 'A1')
        return [rook]
    }

    getImageUrl(): string {
        return `${this.color}-Rook`
    }
}

export const correctMovesOfRook = (columnNumber: number, fieldNumber: number, color: string) => {
    const movesTop: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [0, index + 1]
        })
    const movesBottom: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [0, -(index + 1)]
        })
    const movesLeft: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [-(index + 1), 0]
        })
    const movesRight: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [index + 1, 0]
        })

    const getCorrectFieldsIdTop = getAllPossibleMoves(movesTop, columnNumber, fieldNumber)
    const getCorrectFieldsIdBottom = getAllPossibleMoves(movesBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdLeft = getAllPossibleMoves(movesLeft, columnNumber, fieldNumber)
    const getCorrectFieldsIdRight = getAllPossibleMoves(movesRight, columnNumber, fieldNumber)
    const leftSide = getCorrectIds(getCorrectFieldsIdLeft, color)
    const rightSide = getCorrectIds(getCorrectFieldsIdRight, color)
    const topSide = getCorrectIds(getCorrectFieldsIdTop, color)
    const bottomSide = getCorrectIds(getCorrectFieldsIdBottom, color)

    return [...leftSide,...rightSide,...topSide,...bottomSide].filter(id => id !== 'last')
}


