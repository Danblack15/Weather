import React, { Component } from 'react';
import '../css/CenterBlock.css';

export default class CenterBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            temp: null,
            img_src: null,
            desc: null
        }
    }

    render() {
        const { temp, img_src, desc } = this.props
        return (
            <div className="wrapper_center_block">
                <div className="up_block_center">
                    <img src={img_src} alt="" />
                    <p>{temp}<span className="o">°</span></p>
                </div>
                <div className="under_block_center">
                    <p>{desc}</p>
                </div>
            </div>
        )
    }
}
