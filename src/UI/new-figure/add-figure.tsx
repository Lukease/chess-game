import {Bishop, King, Knight, Queen, Rook, Pawn} from '../../game/pieces'

export const addPiece = (figureName: string, columnNumber: number, fieldNumber: number, color: string, id: string) => {

    switch (figureName) {
        case 'Queen': {

            return new Queen(color, id, figureName)
        }

        case 'King': {

            return new King(color, id, figureName)
        }

        case 'Bishop': {

            return new Bishop(color, id, figureName)
        }

        case 'Knight': {

            return new Knight(color, id, figureName)
        }

        case 'Pawn': {

            return new Pawn(color, id, figureName)
        }

        case 'Rook': {

            return new Rook(color, id, figureName)
        }
        default:
            return null
    }
}