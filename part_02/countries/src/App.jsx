import { useState, useEffect } from 'react'
import axios from "axios"

import Search from "./components/Search"
import CountryList from './components/CountryList'

function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])

  // retrieve country data
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        // console.log("response", response)
        setCountries(
          response.data.sort(
            (a, b) => {
              const nameA = a.name.common
              const nameB = b.name.common
              return (nameA < nameB ? -1 : 1)
            })
        )
      })
  }, [])

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <CountryList countries={countries} search={search} setSearch={setSearch} />
    </div>

  )
}

export default App
