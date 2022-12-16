import {Coordinate} from '../chess-possible-move'

export class CoordinateService {
    static createAllCoordinate(): Array<Coordinate> {
        let arrayCoordinates: Array<Coordinate> = []

        for (let y = 1; y < 9; y++) {
            const boardColumn: string = String.fromCharCode(64 + y)

            for (let i = 1; i < 9; i++) {
                arrayCoordinates = arrayCoordinates.concat(new Coordinate(y, i, boardColumn, String(i)))
            }
        }

        return arrayCoordinates
    }

    static allCoordinate = CoordinateService.createAllCoordinate().flat(1)

    static getCoordinateById(id: string): Coordinate {
        const column: string = id.charAt(0)
        const row: string = id.charAt(1)

        return this.allCoordinate.find(coordinate => coordinate.boardColumn === column && coordinate.boardRow === row)!
    }

    static getCoordinateByColumnAndRow(column: number, row: number): Coordinate {
        return this.allCoordinate.find(coordinate => coordinate.x === column && coordinate.y === row)!
    }
}