import React, { useState } from 'react'
import '../Arena.css'
import { Figure } from '../types'
import { defaultChessArrangement } from '../chess_arrangement/default_chess_arrangement'
import { checkPossibleMoves } from './possible-moves-utils'

let coordinateOfChess: Array<any> = []
let arrayOfSelectedNames: Array<string> = []
let arrayOfSelectedFigures: Array<any> = []
let arrayOfCorrectIds: Array<string> = []

const fillField = (chessArray: Array<Figure>, fieldId: string) => {
    const figure: Array<string> = chessArray.map(figure => {
        const column: number = (fieldId.charAt(0)).charCodeAt(0) - 64
        const number: number = parseInt(fieldId.charAt(1))
        const [figureColumn, figureField] = figure.id

        if (column === figureColumn && number === figureField) {

            return `figure__${figure.name}`
        }
        return 'figure__empty'
    })

    const figureName = figure.find(name => name !== 'figure__empty')

    return (figureName ? figureName : 'figure__empty')
}

const selectChess = (id: string, event: any) => {
    if (arrayOfSelectedFigures.length !== 0) {
        const [, parentOfFirstFigure, , parentOfSecondFigure] = arrayOfSelectedFigures
        parentOfFirstFigure.classList.remove('field__chosen')
        parentOfSecondFigure.classList.remove('field__chosen')
        arrayOfSelectedFigures = []
    }

    const columnNumber: number = (id.charAt(0)).charCodeAt(0) - 64
    const fieldNumber: number = parseInt(id.charAt(1))
    const figureClass: string = event.target.className.split(' ')[1]
    const figureNameAndColor: string = figureClass.split('__')[1]
    const figureNameAndColorSplit: Array<string> = figureNameAndColor.split('-')
    const [figureColor, figureName] = figureNameAndColorSplit
    const coordinate: Array<string> = checkPossibleMoves(figureName, columnNumber, fieldNumber, figureColor)!

    coordinateOfChess = coordinateOfChess.concat(id)
    arrayOfCorrectIds = arrayOfCorrectIds.concat(coordinate)
    arrayOfSelectedNames = arrayOfSelectedNames.concat(figureNameAndColor)
    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.target, event.currentTarget)

    return
}

const unCheckChess = () => {
    coordinateOfChess = []
    arrayOfSelectedNames = []
    arrayOfSelectedFigures = []
    arrayOfCorrectIds = []

    return
}

const moveChess = (event: any) => {
    const [figure] = arrayOfSelectedNames
    const [previousField,] = arrayOfSelectedFigures
    const currentFieldImg = event.target

    event.currentTarget.classList.add('field__chosen')
    previousField.classList.remove(`figure__${figure}`)
    previousField.classList.add('figure__empty')

    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.target, event.currentTarget)

    currentFieldImg.className = ''
    currentFieldImg.classList.add('figure')
    currentFieldImg.classList.add(`figure__${figure}`)
    arrayOfSelectedNames = []
    coordinateOfChess = []
    arrayOfCorrectIds = []

    let whoseTour = document.querySelector('.game__color')!

    if (whoseTour.innerHTML === 'white') {
        whoseTour.innerHTML = 'black'

    } else if (whoseTour.innerHTML === 'black') {
        whoseTour.innerHTML = 'white'
    }

    return
}

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)
    const game = (id: string, event: any) => {
        const color = document.querySelector('.game__color')!.innerHTML

        if (event.target.className.includes(`figure__${color}`) && coordinateOfChess.length === 0) {
            setIsChosen(!isChosen)
            selectChess(id, event)

        } else if (event.target.className !== 'figure__empty' && coordinateOfChess.includes(id)) {
            setIsChosen(!isChosen)
            unCheckChess()

        } else if (arrayOfCorrectIds.some(id => id === props.id) && coordinateOfChess.length !== 0) {
            moveChess(event)
        }
    }

    return (
        <div
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => {
                game(props.id, event)
            }}
        >
            <img
                // ${fillField(defaultChessArrangement, props.id)}
                className={`figure ${fillField(defaultChessArrangement, props.id)}`}
                id={props.id}
                alt={''}
            >
            </img>
        </div>
    )
}
