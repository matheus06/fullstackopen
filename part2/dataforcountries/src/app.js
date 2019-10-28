import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const languages = () => country.languages.map((language, index) =>
        <li key={index} >{language.name}</li>
    )

    return (

        <div>
            <h1>{country.name}</h1>
            <div>
                capital {country.capital}
            </div>
            <div>
                population {country.population}
            </div>
            <h2>languages</h2>
            <ul>
                {languages()}
            </ul>
            <img src={country.flag} alt="flag" height="150" width="150" ></img >
            <Weather capital={country.capital}></Weather>
        </div>

    )
}

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=f9a4ae27b938fc9c314a2136043a93d1&query=${capital}`).then(response => {
                setWeather(response.data)
            })
    }, [])
    return (

        <div>
            <h2>Weather in {capital}</h2>
            {weather && <div>
                <div>
                    <strong>temperature:</strong>
                    {weather.current.temperature} Celsius
                </div>
                <img src={weather.current.weather_icons} alt="flag" />
                <div>
                    <strong>wind:</strong>
                    {weather.current.wind_speed} kph direction {weather.current.wind_dir}
                </div>
            </div>}
        </div>
    )
}

const Countries = ({ countries, filter, onClick }) => {

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    if (countriesToShow.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countriesToShow.length === 1) {
        const rows = () => countriesToShow.map((country, index) =>
            <Country key={index} country={country} ></Country>
        )
        return (
            <div>
                {rows()}
            </div>
        )
    }

    const rows = () => countriesToShow.map((country, index) =>
        <div key={index}>
            {country.name}  <Button onClick={() => onClick(country.name)} text="show" />
        </div>
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Button = ({ onClick }) => (
    <button onClick={onClick}>show</button>
)

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const showCountry = (value) => {
        const copy = [...countries]
        setCountries(copy.filter(c => c.name === value))
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all').then(response => {
                setCountries(response.data)
            })
    }, [])


    return (
        <div>
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            <Countries countries={countries} filter={filter} onClick={showCountry} ></Countries>
        </div>
    )
}


export default App