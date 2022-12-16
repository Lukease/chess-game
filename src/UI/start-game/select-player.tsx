import React from 'react'
import {Piece} from '../../game/pieces'

export class SelectPlayer extends React.Component<any, any> {
    kings: Array<Piece>

    constructor(props: any) {
        super(props)

        this.kings = props.kings
    }

    renderKings() {
        return  this.kings.map((kings,index) =>{
            return (
                    <img
                        alt={''}
                        src={kings.getImageUrl()}
                        draggable={false}
                        key={index}
                    ></img>
            )
        })
    }

    render() {
        return (
            <div className={'select__player'}
            >
                {this.renderKings()}
            </div>
        )
    }

}