import React, { Component } from 'react';
import '../css/CenterBlockMedia.css';

export default class CenterBlockMedia extends Component {
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
            <div className="wrapper_center_block_media">
                <div className="up_block_center_media">
                    <img src={img_src} alt="" />
                    <p>{temp}<span className="o_media">°</span></p>
                </div>
                <div className="under_block_center_media">
                    <p>{desc}</p>
                </div>
            </div>
        )
    }
}
