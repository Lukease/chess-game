import React from 'react'
import '../Arena.css'
import {GameService,MovingService,CoordinateService} from '../game/suppliers'
import {Coordinate} from '../game/chess-possible-move'
import {Piece} from '../game/pieces'

export class Field extends React.Component<any, any> {
    private rowNumber: number
    id: string
    private columnNumber: number
    private color: string
    coordinate: Coordinate
    piece: Piece | undefined
    gameService: GameService
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.id = props.id
        this.columnNumber = props.columnNumber
        this.rowNumber = props.rowNumber
        this.color = props.color
        this.piece = props.piece
        this.coordinate = CoordinateService.getCoordinateById(this.id)
        this.gameService = props.gameService
        this.movingService = props.movingService
        this.state = {
            isChosen: false,
            correctMove: false,
            imageLoaded: false,
            isMoving: false,
            isGameStarted: false,
            img: this.props.piece ? this.props.piece.getImageUrl() : '',
            isTrashActive: false
        }
        props.gameService.addFieldToGameService(this)
        props.movingService.addFieldToMovingService(this)

    }

    getActive() {
        return this.state.isChosen
    }

    printCoordinate() {
        console.log(this.coordinate.boardColumn, this.coordinate.boardRow)
    }

    setActiveTrash(active: boolean) {
        this.setState({isTrashActive: active})
    }

    setActive(active: boolean) {
        this.setState({isChosen: active})
    }

    setPossibleMove(correct: boolean) {
        this.setState({correctMove: correct})
    }

    restorePiece() {
        this.setMoving(false)
    }

    setPiece(piece: Piece, active: boolean) {
        this.piece = piece
        this.piece.currentCoordinate = this.coordinate
        this.setState({img: this.piece.getImageUrl()})

        if (active) {
            this.setActive(true)
        }
            this.setMoving(false)
    }

    removePiece() {
        this.piece = undefined
        this.setState({img: ''})
        this.setMoving(false)
    }

    setMoving(move: boolean) {
        this.setState({isMoving: move})
    }

    setPiecePosition(field: Field, event: any) {
        if (field.piece) {
            const coordinateX = event.clientX
            const coordinateY = event.clientY

            this.setMoving(true)
            document.body.style.cursor = 'none'
            this.movingService.movePiece(field.piece, coordinateX, coordinateY, field.id, true)
        }
    }

    setGameStarted(isGameStarted: boolean) {
        this.setState({isGameStarted: isGameStarted})
    }

    render() {

        return (
            <div
                className={this.state.isChosen ? `field  field__${this.props.color} field__chosen` : `field  field__${this.props.color}`}
                onClick={() => {
                    this.gameService.fieldClick(this)
                }}
                onMouseDown={event => this.state.isGameStarted || this.state.isTrashActive ? '' : this.setPiecePosition(this!, event)}
                id={this.props.id}
            > {this.piece ?

                <img
                    className={this.state.correctMove ? `figure figure__move-figure` : 'figure'}
                    id={this.props.id}
                    alt={''}
                    src={this.state.img}
                    draggable={false}
                    style={{display: this.state.isMoving ? 'none' : 'block'}}

                    // onMouseDown={event => moveFigure(event,props.className,props.id)}
                    // onMouseMove={event => mouseMoveFigure(event)}
                    // onMouseUp={event => moveChess(event)}
                >

                </img>
                : <div
                    className={this.state.correctMove ? `figure figure__move-empty` : 'figure'}
                ></div>
            }
            </div>
        )
    }
}
