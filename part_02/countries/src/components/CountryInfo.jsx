import { useState, useEffect } from "react"
import axios from "axios"

import Weather from "./Weather"

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState(null)

    const [lat, long] = country.capitalInfo.latlng
    useEffect(() => {
        axios
            .get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms`
            )
            .then((response) => {
                console.log("getting data")
                setWeather(response.data)
            })
    }, [lat, long])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                <span>Capital: {country.capital.join(", ")}</span><br />
                <span>Area: {country.area}</span>
            </div>
            <p style={{ fontWeight: "bold" }}>Languages:</p>
            <ul>
                {Object.values(country.languages).map(
                    (l) => <li key={l}>{l}</li>
                )}
            </ul>
            <svg role="image" width="200" height="200" xmlns="http://www.w3.org/2000/svg" aria-label={country.flags.alt}>
                <image href={country.flags.svg} height="200" width="200" />
            </svg>
            <div>
                <h2>Weather in {country.capital}</h2>
                <Weather weather={weather} />
            </div>

        </div>
    )
}

export default CountryInfo
