import {GameNavigation} from '../../UI/start-game'
import {AddPiecePanel} from '../../UI/new-figure'
import {Arena} from '../../UI/Arena'
import {Field} from '../../UI'
import {Board} from '../../UI/board'
import {Pawn, Piece} from '../pieces'
import {Coordinate, PromotePawnPanel, Vector2d} from '../chess-possible-move'

export class GameService {
    whiteTurn: boolean
    private activeField: Field | undefined
    private possibleMoves: Array<Field> = []
    private previousMove: Array<Field> = []
    allFields: Array<Field> = []
    gameNavigation: GameNavigation | undefined
    isPositionEditorDisplayed: boolean = false
    isTrashActive: boolean = false
    addPiecePanels: Array<AddPiecePanel> = []
    board: Board | undefined
    isGameStarted: boolean = false
    arena: Arena | undefined
    promotePawnPanel: PromotePawnPanel | undefined
    promotedField: Field | undefined

    constructor() {
        this.whiteTurn = true
        this.allFields = []
    }

    fieldClick(field: Field) {
        const isPiece: Piece = field.piece!

        if (isPiece) {
            if (this.isTrashActive && isPiece.canDelete()) {
                this.removePieceFromField(field)
            }

            if (this.isGameStarted) {
                if (isPiece.color === this.getColor()) {
                    if (this.activeField) {
                        this.activeField.setActive(false)
                    }

                    if (this.previousMove) {
                        this.setActiveFields(this.previousMove, true)
                    }

                    this.activeField = field
                    this.activeField.setActive(true)
                    this.setNewPossibleMoves(field)
                }
            }
        }

        if (field.state.correctMove) {
            this.makeMove(field)
            this.renderPawnPromotion(field)
        }
    }

    renderPawnPromotion(field: Field) {
        if (field.piece instanceof Pawn && (field.coordinate.y === 1 || field.coordinate.y === 8)) {
            this.promotePawnPanel?.setColorOfPieces(field.piece.color, field.coordinate.x)
            this.promotePawnPanel?.pawnPromotion(true)
            this.promotedField = field
        }
    }

    setPromotedFigureToField(piece: Piece) {
        this.promotedField?.setPiece(piece, false)
    }

    setGameStarted(isGameStarted: boolean) {
        this.isGameStarted = isGameStarted
        this.setPositionEditorDisplayed(false)
        this.isTrashActive = false
        this.allFields.forEach(field => {
            field.setGameStarted(true)
            field.setActiveTrash(false)
        })
        this.board?.setTrashToggle(false)
    }

    removePieceFromField(field: Field) {
        field.removePiece()
    }

    addFieldToGameService(field: Field) {
        this.allFields = this.allFields.concat(field)
    }

    getFieldByCoordinate(coordinate: Coordinate) {
        return this.allFields.find(field => field.coordinate === coordinate)!
    }

    getFieldByXY(x: number, y: number): Field | undefined {

        return this.allFields.find(field => field.coordinate.x === x && field.coordinate.y === y)
    }

    setNewPossibleMoves(field: Field) {
        const additionalCorrectMoves: Array<Field> = this.addCorrectMovesForField(field)!

        this.setPossibleMovesActive(false)
        this.possibleMoves = this.getCorrectMoves(field)
            .concat(additionalCorrectMoves ? additionalCorrectMoves : [])
        this.setPossibleMovesActive(true)
    }

    setPossibleMovesActive(isPossible: boolean) {
        this.possibleMoves.forEach(field => field?.setPossibleMove(isPossible))
    }

    makeMove(field: Field) {
        this.setActiveFields(this.previousMove, false)
        this.previousMove = []

        field.setPiece(this.activeField!.piece!, true)
        this.activeField!.removePiece()
        this.possibleMoves.forEach(field => field.setPossibleMove(false))
        this.changeColor()
        const previousMove = this.activeField!
        this.previousMove = [field, previousMove]
    }

    setActiveFields(fields: Array<Field>, active: boolean) {
        fields.forEach(move => {
            move.setActive(active)
        })
    }

    getColor() {
        return this.whiteTurn ? 'white' : 'black'
    }

    changeColor() {
        this.whiteTurn = !this.whiteTurn
        this.gameNavigation!.changeTurn(this.getColor())
    }

    getAllPossibleMovesFromDirection(currentField: Field, direction: Vector2d): Array<Field> {
        if (!currentField.piece?.canMoveMultipleSquares()) {
            const field = this.getFieldByXY(currentField.coordinate.x + direction.x, currentField.coordinate.y + direction.y)
            const isPawn = currentField.piece instanceof Pawn

            if (!isPawn) {
                if (field?.piece && field?.piece.color === currentField.piece?.color) {
                    return []
                } else {
                    return [field!].filter(field => field)
                }
            } else {
                let field = this.getFieldByXY(
                    currentField.coordinate.x + (direction.x),
                    currentField.coordinate.y + (direction.y))

                return field?.piece ? [] : [field!]
            }

        } else {
            let counter = 1
            let canGoFurther: boolean = true
            let field = this.getFieldByXY(
                currentField.coordinate.x + (direction.x * counter),
                currentField.coordinate.y + (direction.y * counter))
            let arrayField: Array<Field> = []
            while (field && field.piece?.color !== currentField.piece?.color && canGoFurther) {
                if (field?.piece) {
                    canGoFurther = false
                }

                counter++
                arrayField = arrayField.concat(field)
                field = this.getFieldByXY(
                    currentField.coordinate.x + (direction.x * counter),
                    currentField.coordinate.y + (direction.y * counter))
            }
            return arrayField
        }
    }


    getCorrectMoves(currentField: Field): Array<Field> {

        const correct = currentField.piece!.getAllPossibleDirectionsWithColor()
            .map(direction => this.getAllPossibleMovesFromDirection(currentField, direction))
        // .filter(filterField => {
        //     (this.canSee(filterField, currentField) || currentField.piece!.canJump())
        //     // &&
        //     // this.isEmptyOrEnemy(field) && (this.isCheck() && this.canPreventCheck(field, piece.coordinate)) && this.dontCauseCheck()
        // })

        return correct ? correct.flat(1) : []
    }

    dontCauseCheck(): boolean {
        return true
    }

    isCheck(): boolean {
        return false
    }

    canPreventCheck(field1: Field, field2: Field): boolean {
        return false
    }

    isEmptyOrEnemy(field: Field): boolean {
        return false
    }

    canSee(field: Field, currentField: Field): boolean {
        const boardColumn = field.coordinate.x - currentField.coordinate.x
        const boardRow = field.coordinate.y - currentField.coordinate.y

        if (Math.abs(boardRow) === Math.abs(boardColumn)) {
            const vectorX = boardColumn / Math.abs(boardColumn)
            const vectorY = boardRow / Math.abs(boardRow)
            let pieceArray: Array<Piece> = []
            for (let i = 1; i <= Math.abs(boardRow); i++) {
                const piece: Piece = this.getFieldByRowAndColumn(
                    (vectorX * i) + currentField.coordinate.x,
                    (vectorY * i) + currentField.coordinate.y)!
                    .piece!
                pieceArray = pieceArray.concat(piece)
                console.log(pieceArray.concat(piece))
                console.log(pieceArray.concat(piece).filter(piece => piece !== undefined))
                if (piece && pieceArray.length < 2) {
                    // console.log(this.getFieldByRowAndColumn(
                    //     (vectorX * i) + currentField.coordinate.x,
                    //     (vectorY * i) + currentField.coordinate.y)!)
                    console.log(pieceArray.concat(piece).filter(piece => piece !== undefined).length)
                    console.log(piece)
                    return false
                }
            }
        }
        console.log(true)
        return true
    }

    getFieldByRowAndColumn(boardColumn: number, boardRow: number) {
        return this.allFields.find(field => field.coordinate.x === boardColumn && field.coordinate.y === boardRow)
    }

    setPositionEditorDisplayed(isDisplayed: boolean) {
        this.isPositionEditorDisplayed = isDisplayed
        this.addPiecePanels?.forEach(panel => panel.isPositionEditorDisplayed())
    }

    setTrashActive(active: boolean) {
        this.isTrashActive = active
        this.addPiecePanels?.forEach(panel => panel.isDeleteIconActive(true))
        this.board?.setTrashToggle(active)
        this.allFields.forEach(field => field.setActiveTrash(active))
    }

    addCorrectMovesForField(field: Field) {
        if (field.piece instanceof Pawn) {
            return [...this.moveTwoFieldsForward(field)!, ...this.canCapture(field)]
        }
    }

    canCapture(field: Field) {
        const direction = field.piece?.color === 'white' ? 1 : -1
        const currentCoordinate: Coordinate = field.coordinate
        const leftX: number = currentCoordinate.x - 1
        const rightX: number = currentCoordinate.x + 1
        const fieldNumber: number = currentCoordinate.y + direction
        const leftSideCoordinate = this.allFields.find(field => field.coordinate.y === fieldNumber && field.coordinate.x === leftX)!
        const rightSideCoordinate = this.allFields.find(field => field.coordinate.y === fieldNumber && field.coordinate.x === rightX)!

        return [leftSideCoordinate, rightSideCoordinate].filter(field => field.piece !== undefined)
    }

    moveTwoFieldsForward(field: Field) {
        const direction = field.piece?.color === 'white' ? 1 : -1
        const currentPawn = field.piece
        const secondFieldCoordinateY = currentPawn!.currentCoordinate.y + (direction * 2)
        const currentBoardColumn = currentPawn!.currentCoordinate.x
        const firstField = this.allFields.find(field => field.coordinate.y === (currentPawn!.currentCoordinate.y + (direction * 1)) && field.coordinate.x === currentBoardColumn)!
        const secondField = this.allFields.find(field => field.coordinate.y === secondFieldCoordinateY && field.coordinate.x === currentBoardColumn)!

        if (currentPawn?.isInStartingPosition() && !firstField.piece && !secondField.piece) {
            return [secondField]
        }
        return []

    }

    /**
     *  roszada
     *      nie ma szacha (poprawne ruchy przeciwnika)
     *      pozycja startowa króla i wiezy (coordinate)
     *      król i wieża nie wykonywały ruchów (historia ruchów)
     *      pola pomiedzy sa puste  (field)
     *      nie moze byc szachowane pole wzdluz roszady oprocz wiezy (poprawne ruchy przeciwnika)
     *  bicie w przelocie
     *      przeciwny pionek wykonał specjany ruch o 2 na pole nr 5 lub 4 w zaleznośic od koloru
     *      pionek stoi na polu nr 4 lub 5 w zaleznośic od koloru
     *      pionek bijący stoi jedną kolumne w bok
     *  promocja pionka
     *      pionek wykonuje ruch na pole nr 8 lub 1 w zaleznośic od koloru
     *  ruch pionka o 2
     *      pionek jest na pozycji startowej (coordinate)
     *      pionek nie wykonywał wcześniej ruchów (historia ruchów)
     *      pierwsze i drugie pole przed pionkiem jest puste (field)
     *  bicie pionkiem po skosie
     *      po skosie znajduje się figura przeciwnika
     *      figura przeciwnika stoi jedną kolumnę obok i jedno pole w kierunku chodzenia pionka
     */
}