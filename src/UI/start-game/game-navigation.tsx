import React from 'react'
import {GameService} from '../../game/suppliers/game-service'
import {MovingService} from "../../game/suppliers/moving-service";

export class GameNavigation extends React.Component<any, any> {
    gameService: GameService
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.movingService = props.movingService
        this.gameService = props.gameService
        this.state = {
            isGameStarted: false,
            isPieceEditorDisplayed: false,
            color: 'white'
        }
        this.gameService.gameNavigation = this
        this.movingService.gameNavigation = this
    }

    startGame = () => {
        this.setState({isGameStarted: true})
        this.gameService.setGameStarted(true)
        this.movingService.setGameStarted(true)
    }

    changeTurn(color: string) {
        this.setState({color: color})
    }

    changePositionEditorDisplayed = () => {
        const isDisplayed: boolean = this.state.isPieceEditorDisplayed

        this.setState({isPieceEditorDisplayed: !isDisplayed})
        this.gameService.setPositionEditorDisplayed(!isDisplayed)
    }

    render() {
        return (
            <div className={'game__navigation'}>
                <button
                    onClick={this.startGame}
                    disabled={this.state.isGameStarted}
                >
                    Start Game
                </button>
                <button
                    onClick={this.changePositionEditorDisplayed}
                    disabled={this.state.isGameStarted}
                >
                    Position Editor
                </button>
            </div>
        )
    }
}