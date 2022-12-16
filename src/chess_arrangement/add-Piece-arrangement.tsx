import {Bishop, Knight, Pawn, Piece, Queen, Rook} from '../game/pieces'

export const addPieceArrangement = (color: string): Array<Piece> => {
    return [
        new Queen(color, '', 'Queen'),
        new Bishop(color, '', 'Bishop'),
        new Knight(color, '', 'Knight'),
        new Rook(color, '', 'Rook'),
        new Pawn(color, '', 'Pawn')
    ]
}