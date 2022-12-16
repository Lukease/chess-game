import React from 'react'
import {GameService, MovingService, CoordinateService} from '../../game/suppliers'
import {Piece} from '../../game/pieces'
import {Field} from '../field'

export class Board extends React.Component<any, any> {
    pieces: Array<Piece>
    gameService: GameService
    allFields: Array<Field>
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.deletePiece = this.deletePiece.bind(this)
        this.pieces = props.pieces
        this.gameService = props.gameService
        this.movingService = props.movingService
        this.allFields = []
        this.state = {
            isTrashOn: false,
        }

        this.movingService.board = this
        this.gameService.board = this
    }

    getPieceById(id: string) {
        const coordinate = CoordinateService.getCoordinateById(id)

        return this.pieces.find(piece => piece.currentCoordinate === coordinate)!
    }

    removePieceFromArray(piece: Piece) {
        this.pieces = this.pieces.filter(chess => chess !== piece)
    }

    selectActive(field: Field) {

    }

    deletePiece(field: Field) {
        if (this.state.isTrashOn) {
            const pieceId = field.id

            this.removePieceFromArray(this.getPieceById(pieceId))
        }
    }

    setTrashToggle(active: boolean) {
        this.setState({isTrashOn: !active})
    }

    renderAllFields(letter: string, boardColumn: number) {
        let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
            const boardRow: number = -index + 8
            const currentPiece: Piece = this.getPieceById(`${letter}${boardRow}`)

            return (
                <Field
                    rowNumber={boardRow}
                    id={`${letter}${boardRow}`}
                    columnNumber={boardColumn}
                    piece={currentPiece}
                    key={`${letter}${boardRow}`}
                    color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
                    gameService={this.gameService}
                    movingService={this.movingService}
                />
            )
        })
        return output
    }

    renderAllColumns() {
        let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
            const letter: string = String.fromCharCode(64 + (index + 1))
            const boardColumn: number = index + 1

            return (
                <div className='field__column'
                     key={letter}
                >
                    {this.renderAllFields(letter, boardColumn)}
                </div>
            )

        })

        return output
    }

    render() {
        return (
            <div className={'game'}
                 onClick={() => this.deletePiece}
            >
                {this.renderAllColumns()}
            </div>
        )
    }
}