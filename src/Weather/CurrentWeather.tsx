import "./Weather.css"

export interface CurrentWeatherProp {
    
}

function CurrentWeather(props: CurrentWeatherProp) {
    return (
        <div className="weather mvfr">
            <h1>Current Weather</h1>
            <div className="weather-row">
                <span className="weather-header">Airport: </span><span className="weather-data">KLAF</span>
            </div>
            <div className="weather-row">
                <span className="weather-header">Observation Time: </span><span className="weather-data">211415Z</span><br></br>
            </div>
            <div className="weather-row">
                <span className="weather-header">Clouds: </span><span className="weather-data">Broken</span><br></br>
            </div>
            <div className="weather-row">
                <span className="weather-header">Altimeter: </span><span className="weather-data">29.92</span><br></br>
            </div>
            <div className="weather-row">
                <span className="weather-header">Winds: </span><span className="weather-data">calm</span><br></br>
            </div>
            <div className="weather-row">
                <span className="weather-header">Temp/Dew Point: </span><span className="weather-data">10SM</span><br></br>
            </div>
        </div>
    )
}

export default CurrentWeather;