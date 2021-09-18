import React, { Component } from 'react';
import '../css/UnderBlock.css'

export default class UnderBlock extends Component {
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
            <div className="wrapper_under_block">
                <div className="wind">
                    <p>Ветер</p>
                    <p>{Math.floor(wind)} м/с, {winddeg}</p>
                </div>
                <div className="pressure">
                    <p>Давление</p>
                    <p>{pressure} мм рт. ст.</p>
                </div>
                <div className="humidity">
                    <p>Влажность</p>
                    <p>{humidity}%</p>
                </div>
                <div className="rain">
                    <p>Вероятность дождя</p>
                    <p>10%</p>
                </div>
            </div>
        )
    }
}
