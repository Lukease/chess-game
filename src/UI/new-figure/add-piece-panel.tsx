import React from 'react'
import {addPieceArrangement} from '../../chess_arrangement'
import {GameService, MovingService} from '../../game/suppliers'
import {Piece} from '../../game/pieces'

export class AddPiecePanel extends React.Component<any, any> {
    color: string
    pieces: Array<Piece>
    addNewPiece: Array<Piece>
    gameService: GameService
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.movingService = props.movingService
        this.pieces = props.pieces
        this.color = this.props.color
        this.addNewPiece = addPieceArrangement(this.color)
        this.state = {
            isTrashActive: false,
            isPositionEditorDisplayed: false,
            isMoving: false,
            coordinateX: 0,
            coordinateY: 0,
        }
        this.gameService.addPiecePanels = this.gameService.addPiecePanels.concat(this)
    }


    isDeleteIconActive = (isFromOtherService: boolean) => {
        const isActive: boolean = this.state.isTrashActive

        this.setState({isTrashActive: !isActive})

        if (!isFromOtherService) {
            this.gameService.setTrashActive(!isActive)
        }
    }

    isPositionEditorDisplayed = () => {
        const isDisplayed = this.gameService.isPositionEditorDisplayed

        this.setState({isPositionEditorDisplayed: isDisplayed})
    }

    selectPiece = (piece: Piece, event: any) => {
        const coordinateX = event.clientX
        const coordinateY = event.clientY
        this.setMoving(true)
        this.setCoordinate(event)

        document.body.style.cursor = 'none'
        this.movingService.movePiece(piece, coordinateX, coordinateY, '', false)
    }

    setCoordinate = (event: any) => {
        this.setState({coordinateX: event.screenX - 50, coordinateY: event.screenY - 30})
    }

    setMoving(isMoving: boolean) {
        this.setState({isMoving: isMoving})
    }

    removePiece() {
        this.setMoving(false)
    }

    renderPieces() {
        let output: Array<JSX.Element> = this.addNewPiece.map((piece, index) => {

            return (
                <div
                    className={'field'}
                    key={index}
                >
                    <img
                        className={'figure'}
                        src={piece.getImageUrl()}
                        key={index}
                        alt={''}

                        onMouseDown={event => this.state.isTrashActive ? '' : this.selectPiece(piece, event)}
                    >
                    </img>
                </div>
            )

        })

        return output
    }

    render() {
        return (
            <div
                className={'panel'}
                style={{display: this.state.isPositionEditorDisplayed ? `flex` : `none`}}
                onChange={this.isPositionEditorDisplayed}
            >
                <div className={'field'}
                ></div>
                <div className={'panel__add'}>
                    {
                        this.renderPieces()
                    }
                    <div
                        className={'content__trash'}
                        style={{backgroundColor: this.state.isTrashActive ? `firebrick` : ``}}
                        onClick={() => this.isDeleteIconActive(false)}
                        id={'trashIcon'}
                    >
                    </div>
                </div>
                <div className={'field'}
                ></div>
            </div>
        )
    }

}