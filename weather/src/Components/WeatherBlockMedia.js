import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import CenterBlockMedia from './CenterBlockMedia';
import UnderBlockMedia from './UnderBlockMedia';
import '../css/WeatherBlockMedia.css';
import deg from '../svg/deg.svg';
import str from '../svg/geo_str.svg';
import cloud from '../imagesw/cloud.svg';
import partly_cloudy from '../imagesw/partly_cloudy.svg';
import rain from '../imagesw/rain.svg';
import storm from '../imagesw/storm.svg';
import sun from '../imagesw/sun.svg';

export default class WeatherBlockMedia extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Город',
            stl: false,
            bol: false,
            temp: 0,
            city: null,
            desc: 'погода',
            img_src: sun,
            wind: null
        }
        this.far = this.far.bind(this);
        this.cel = this.cel.bind(this);
        this.ModalActive = this.ModalActive.bind(this);
        this.SerthCity = this.SerthCity.bind(this);
        this.ClickBody = this.ClickBody.bind(this);
        this.Weatheritems = this.Weatheritems.bind(this);
        this.winddeg = this.winddeg.bind(this);
        this.geopoz = this.geopoz.bind(this);
    }


    //FARENGATE TEMP
    far() {
        if (!this.state.bol) {
            this.setState({
                temp: Math.floor(this.state.temp * 9 / 5 + 32),
                bol: true,
                stl: true
            });

        }
    }

    //CELSIUS TEMP
    cel() {
        if (this.state.bol) {
            this.setState({
                temp: Math.round((this.state.temp - 32) * 5 / 9),
                bol: false,
                stl: false,
            })
        }
    }


    //MODAL WINODW 'ON'
    ModalActive() {
        const modal = document.getElementById('modal');
        modal.style.display = 'block'
    }

    //text from CLICK BOX CITY to GENERAL INPUT SEARCH
    cityItem() {
        let input = document.getElementById('city_item_modal').innerText;
        document.getElementsByTagName('input')[0].value = input
    }

    //SEARCH CITY from another API from INPUT
    SerthCity() {
        let input = document.getElementsByTagName('input')[0].value;//GENERAL INPUT
        let input_1 = document.getElementById('city_item_modal');//CLICK BLOCK CITY
        if (input.length > 2) {
            input_1.style.display = 'block'

            var token = "8605fb1642fbad9b50c8ebdf2be5a828eb69f327";
            var query = input;

            var options = {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + token
                },
                body: JSON.stringify({ query: query })
            }

            fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`, options)
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.suggestions.length !== 0) {//IF INFO SUCCESS
                            if (result.suggestions[0].data.city) {
                                this.setState({
                                    city: result.suggestions[0].data.city//IF MAIN CITY (city)
                                });
                            } else {
                                this.setState({
                                    city: result.suggestions[0].data.region//IF NOT MAIN CITY (region)
                                });
                            }
                        } else {
                            this.setState({
                                city: ''
                            });
                            input_1.style.display = 'none';//CLOSE CLICK BLOCK CITY
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )


        } else {
            input_1.style.display = 'none';//CLOSE CLICK BLOCK CITY
        }
    }



    //SEARCH INFO of CITY
    ClickBody(event) {
        let input = document.getElementsByTagName('input')[0].value;

        if (input.length > 2) {
            this.cel();
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=` + input + `&appid=1a18ebe8ba117aab79abc3b3685b4c57&units=metric&lang=ru`)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        if (result.wind) {
                            this.cel();
                            this.winddeg(result.wind.deg);//WIND DEG ('north','south'..)
                            this.setState({
                                isLoaded: true,
                                wind: result.wind.speed,//speed wind
                                pressure: Math.floor(result.main.pressure / 1.33),//pressure
                                humidity: result.main.humidity,//humidity
                                name: result.name,//name city
                                temp: Math.floor(result.main.temp),//temp
                                desc: result.weather[0].description//description
                            });
                            this.Weatheritems(result.weather);//IMG for CENTER BLOCK
                        }

                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )


        }
        const modal = document.getElementById('modal');
        modal.style.display = 'none';//CLOSE MODAL WINDOW
        event.preventDefault();//UnLoadPage
        return false;
    }

    //IMG CENTER BLOCK
    Weatheritems(result) {
        let i = result[0].icon;
        if (i === '01d' || i === '01n') {
            this.setState({ img_src: sun });
        } else if (i === '02d' || i === '02n' || i === '03d' || i === '03n') {
            this.setState({ img_src: partly_cloudy });
        } else if (i === '04d' || i === '04n') {
            this.setState({ img_src: cloud });
        } else if (i === '09d' || i === '09n' || i === '10d' || i === '10n') {
            this.setState({ img_src: rain });
        } else if (i === '11d' || i === '11n') {
            this.setState({ img_src: storm });
        }
    }


    //GEOPOSITION
    geopoz() {
        navigator.geolocation.getCurrentPosition(position => {//NOW GEO (coords)

            let lat = position.coords.latitude,
                lon = position.coords.longitude;


            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=` + lat + `&lon=` + lon + `&appid=1a18ebe8ba117aab79abc3b3685b4c57&units=metric&lang=ru`)
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.wind) {
                            this.winddeg(result.wind.deg);//WIND DEG ('north','south'..)
                            this.setState({
                                isLoaded: true,
                                wind: result.wind.speed,//speed wind
                                pressure: Math.floor(result.main.pressure / 1.33),//pressure
                                humidity: result.main.humidity,//humidity
                                name: result.name,//name city
                                temp: Math.floor(result.main.temp),//temp
                                desc: result.weather[0].description//description
                            });
                            this.Weatheritems(result.weather);//IMG for CENTER BLOCK
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        },

            function (error) {
                alert('Разрешите доступ к геопозиции')
            }
        )
    }

    //WIND DEGREES to WIND TEXT 
    winddeg(deg) {
        let d;//intermediate
        if (deg >= 330 || deg < 30) { d = 'северный' } else
            if (deg >= 30 && deg < 60) { d = 'северо-в' } else
                if (deg >= 60 && deg < 120) { d = 'восточный' } else
                    if (deg >= 120 && deg < 150) { d = 'юго-в' } else
                        if (deg >= 150 && deg < 210) { d = 'южный' } else
                            if (deg >= 210 && deg < 240) { d = 'юго-з' } else
                                if (deg >= 240 && deg < 300) { d = 'западный' } else
                                    if (deg >= 300 && deg < 330) { d = 'северо-з' }
        this.setState({
            winddeg: d
        })
    }



    render() {
        //STYLES for SELECT TEMP
        const styleT = {
            color: 'white',
            backgroundColor: '#fff3'
        }
        const styleF = {
            color: '#fff6',
            backgroundColor: '#fff0'
        }

        const { name, city } = this.state;

        return (
            <>
                <div className="wrapper_media">
                    <div className="left_block_modal">
                        <p className="city_name_modal">{name}</p>
                        <button
                            className="openModalBtn"
                            onClick={this.ModalActive}
                            id="clickBox"
                        >Сменить город</button>
                    </div>
                    <div className="right_block_modal">
                        <div className="temperature_media">
                            <img src={deg} alt="deg" />
                            <div className="wrap_deg">
                                <ButtonGroup aria-label="First group" className="wrap_icon">
                                    <Button
                                        onClick={this.cel}
                                        className="F"
                                        style={this.state.stl ? styleF : null}
                                    >C</Button>
                                    <Button
                                        onClick={this.far}
                                        style={this.state.stl ? styleT : null}
                                    >F</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                        <div>
                            <img
                                src={str}
                                alt="str"
                                onLoad={this.geopoz}
                                className="str_geo"
                            />
                            <button onClick={this.geopoz} className="my_geo_click">Мое местоположение</button>
                        </div>
                    </div>

                    <div className="modal_media" id="modal">
                        <div className="select_city_media">
                            <form>
                                <input required
                                    type="text"
                                    placeholder="Город"
                                    id="clickBox"
                                    className="input_media"
                                    onChange={this.SerthCity}
                                />
                                <input
                                    type="button"
                                    onClick={this.ClickBody} className="close_modal_media"
                                    value="OK"
                                />
                            </form>
                            <p id="city_item_modal" onClick={this.cityItem}>{city}</p>
                        </div>
                    </div>
                </div>

                <CenterBlockMedia
                    temp={this.state.temp}
                    img_src={this.state.img_src}
                    desc={this.state.desc}
                />
                <UnderBlockMedia
                    wind={this.state.wind}
                    pressure={this.state.pressure}
                    humidity={this.state.humidity}
                    winddeg={this.state.winddeg}
                />
            </>
        )
    }
}
