import axios from "axios"
import React, { useEffect, useState } from "react"
import { Countries } from "./Components/Countries"
import { Filter } from "./Components/Filter"

export interface Country {
  name: string
  capital: string
  languages: {
    name: string
  }[]
  flag: string
}

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [filter, setFilter] = useState("")
  const [displayCountry, setDisplayCountry] = useState(
    new Map<string, boolean>()
  )
  useEffect(() => {
    getCountriesFromApi()

    async function getCountriesFromApi() {
      try {
        const res = await axios.get<Country[]>(
          "https://restcountries.com/v2/all"
        )

        const newCountries = res.data.map((country) => ({
          name: country.name,
          capital: country.capital,
          languages: country.languages,
          flag: country.flag,
        }))
        const newCountryDisplays = new Map<string, boolean>()

        newCountries.forEach((country) =>
          newCountryDisplays.set(country.name, false)
        )

        setDisplayCountry(newCountryDisplays)
        setCountries(newCountries)
      } catch (err) {
        console.log(`error`, err)
      }
    }
  }, [])

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>): void {
    setFilter(event.target.value)
  }

  return (
    <div className="App">
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries
        countries={countries}
        filter={filter}
        displayCountry={displayCountry}
        setDisplayCountry={setDisplayCountry}
      />
    </div>
  )
}

export default App
