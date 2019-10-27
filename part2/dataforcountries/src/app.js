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
        </div>
    )
}


const Countries = ({ countries, filter }) => {

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
            <Country key={index} country={country}></Country>
        )
        return (
            <div>
                {rows()}
            </div>
        )
    }

    const rows = () => countriesToShow.map((country, index) =>
        <p key={index}> {country.name}</p>
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all').then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
            </div>
            <Countries countries={countries} filter={filter}></Countries>
        </div>
    )
}


export default App