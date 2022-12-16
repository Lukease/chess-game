export class Coordinate {
    x: number
    y:number
    boardColumn: string
    boardRow: string


    constructor(x: number, y: number, boardColumn: string, boardRow: string) {
        this.x = x
        this.y = y
        this.boardColumn = boardColumn
        this.boardRow = boardRow
    }

    getPossibleMove() {

    }

}