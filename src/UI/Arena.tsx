import React from 'react'
import '../Arena.css'
import {GameNavigation} from './start-game'
import {defaultChessArrangement} from '../chess_arrangement'
import {GameService, MovingService} from '../game/suppliers'
import {AddPiecePanel} from './new-figure'
import {SelectPlayer} from './start-game'
import {PromotePawnPanel} from '../game/chess-possible-move'
import {HistoryOfMoves} from './history'
import {Board} from './board'
import {King, Piece} from '../game/pieces'

export class Arena extends React.Component<any, any> {
    pieces: Array<Piece>
    gameService: GameService
    kings: Array<Piece>
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.gameService = this.props.gameService
        this.movingService = this.props.movingService
        this.pieces = defaultChessArrangement
        this.kings = this.pieces.filter(piece => piece instanceof King)
        this.setDefaultChessPosition = this.setDefaultChessPosition.bind(this)
        this.state = {
            isMovingPiece: false,
            selectedPiece: '',
            coordinateX: 0,
            coordinateY: 0,
            movingId: '',
            newPieceId: ''
        }
        this.gameService.arena = this
        this.movingService.arena = this
    }

    setDefaultChessPosition() {
        window.location.reload()
    }

    setMovingPiece(isMoving: boolean, piece: Piece, x: number, y: number, id: string) {
        this.setState({
            isMovingPiece: isMoving,
            selectedPiece: piece,
            movingId: id ? id : '',
            coordinateX: x - 30,
            coordinateY: y - 30,
        })
    }

    editorMouseMoveFigure = (event: any) => {
        if (this.state.isMovingPiece) {
            let x: number = event.clientX - 30
            let y: number = event.clientY - 30

            this.setState({
                coordinateX: x,
                coordinateY: y
            })
        }
    }

    addNewPieceToField() {
        if (this.state.isMovingPiece) {
            this.setState({isMovingPiece: false})
            document.body.style.cursor = 'auto'
            let newPieceId: string

            const mouseUpTarget = document.elementsFromPoint(this.state.coordinateX, this.state.coordinateY)

            mouseUpTarget.forEach(element => {
                if (element.id !== '' && element.id !== 'root') {
                    this.setState({newPieceId: element.id})
                    newPieceId = element.id
                }
            })
            this.movingService.setCurrentPiecePosition(newPieceId!, this.state.selectedPiece, this.state.movingId)
        }
    }

    render() {
        return (
            <div className={'content'}
                 onMouseMove={this.editorMouseMoveFigure}
                 onMouseUp={() => this.addNewPieceToField()}
            >
                {
                    this.state.isMovingPiece ?
                        <img
                            className={'figure'}
                            style={
                                {
                                    left: this.state.isMovingPiece ? `${this.state.coordinateX}px` : '',
                                    top: this.state.isMovingPiece ? `${this.state.coordinateY}px` : '',
                                    position: 'absolute',
                                    display: this.state.isMovingPiece ? 'flex' : 'none'
                                }
                            }
                            src={this.state.selectedPiece!.getImageUrl()}
                            alt={''}
                            draggable={false}
                        >

                        </img> :
                        <div
                            style={{position: 'absolute'}}
                        >
                        </div>
                }
                <GameNavigation
                    gameService={this.gameService}
                    movingService={this.movingService}
                />
                <HistoryOfMoves/>
                <div className={'game__arena'}>
                    <AddPiecePanel
                        color={'black'}
                        pieces={this.pieces}
                        gameService={this.gameService}
                        movingService={this.props.movingService}
                    />
                    <Board
                        gameService={this.gameService}
                        movingService={this.props.movingService}
                        pieces={this.pieces}
                    />
                    <AddPiecePanel
                        color={'white'}
                        pieces={this.pieces}
                        gameService={this.gameService}
                        movingService={this.movingService}
                    />
                    <PromotePawnPanel
                        gameService={this.gameService}
                        arena={this}
                    />
                </div>
                <SelectPlayer
                    kings={this.kings}
                />
                <div
                    className={'refresher'}
                    onClick={this.setDefaultChessPosition}
                >
                </div>
            </div>
        )
    }
}

export default Arena