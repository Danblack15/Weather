import React, { Component } from 'react';
import '../css/UnderBlockMedia.css'

export default class UnderBlockMedia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            wind: null,
            pressure: null,
            humidity: null,
            winddeg: null
        }
    }


    render() {
        const { wind, pressure, humidity, winddeg } = this.props;

        return (
            <div className="wrapper_under_block_media">
                <div className="under_left_block">
                    <div className="wind_media">
                        <p>Ветер</p>
                        <p>{Math.floor(wind)} м/с, {winddeg}</p>
                    </div>
                    <div className="pressure_media">
                        <p>Влажность</p>
                        <p>{humidity}%</p>
                    </div>
                </div>
                <div className="under_right_block">
                    <div className="humidity_media">
                        <p>Давление</p>
                        <p>{pressure} мм рт. ст.</p>
                    </div>
                    <div className="rain_media">
                        <p>Вероятность дождя</p>
                        <p>10%</p>
                    </div>
                </div>
            </div>
        )
    }
}
