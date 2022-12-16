import {GameNavigation} from '../../UI/start-game'
import {Arena, Field} from '../../UI'
import {Board} from '../../UI/board'
import {Piece} from '../pieces'

export class MovingService {
    arena: Arena | undefined
    isMovingPiece: boolean = false
    allFields: Array<Field> = []
    board: Board | undefined
    gameNavigation: GameNavigation | undefined
    isGameStarted: boolean = false
    isPieceFromBoard: boolean = true

    constructor() {
        this.allFields = []
    }

    movePiece(piece: Piece, coordinateX: number, coordinateY: number, fieldId: string, isFromBoard: boolean) {
        const isMoving = true

        this.isPieceFromBoard = isFromBoard
        this.isMovingPiece = isMoving
        this.arena?.setMovingPiece(isMoving, piece, coordinateX, coordinateY, fieldId)
    }

    setCurrentPiecePosition(newId: string, selectedPiece: Piece, oldId: string) {
        this.isMovingPiece = false
        const currentPiecePosition: Field = this.allFields.find(field => field.id === newId)!
        const oldPiecePosition: Field = this.allFields.find(field => field.id === oldId)!

        if (this.isPieceFromBoard) {
            if (currentPiecePosition && !currentPiecePosition.piece) {
                currentPiecePosition.setPiece(selectedPiece, false)
                oldPiecePosition.removePiece()
            }
            oldPiecePosition.restorePiece()
        } else if (currentPiecePosition && !currentPiecePosition.piece && !this.isPieceFromBoard) {
            currentPiecePosition.setPiece(selectedPiece, false)
        }
    }

    addFieldToMovingService(field: Field) {
        this.allFields = this.allFields.concat(field)
    }

    setGameStarted(isStarted: boolean) {
        this.isGameStarted = isStarted
    }
}