import { useState, useEffect } from "react"


const Weather = ({ weather }) => {
    // const [weather, setWeather] = useState({})

    if (!weather) {
        return null
    }

    console.log("weather", weather)

    const values = weather.current
    const units = weather.current_units

    return (
        <div>
            <span>Temperature: {values.temperature_2m
            } {units.temperature_2m}</span><br />
            <span>Wind: {values.wind_speed_10m} {units.wind_speed_10m}</span>
        </div>
    )
}

export default Weather
