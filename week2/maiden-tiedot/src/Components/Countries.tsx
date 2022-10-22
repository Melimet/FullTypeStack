import React, { Dispatch, SetStateAction, useEffect } from "react"
import { Country } from "../App"
import { CountryInfoBig } from "./CountryInfoBig"
import { CountryInfoSmall } from "./CountryInfoSmall"

interface CountriesProps {
  countries: Country[]
  filter: string
  displayCountry: Map<string, boolean>
  setDisplayCountry: Dispatch<SetStateAction<Map<string, boolean>>>
}

function Countries({
  countries,
  filter,
  displayCountry,
  setDisplayCountry,
}: CountriesProps) {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  function handleClick(targetCountry: string): void {
    if (filteredCountries.length == 1) return
    const copy = new Map(displayCountry)
    copy.set(targetCountry, !copy.get(targetCountry))
    setDisplayCountry(new Map(copy))
  }

  if (filteredCountries.length > 10) {
    return (
      <div>
        <h2>Countries</h2>
        <p>Too many matches</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Countries</h2>
      {filteredCountries.map((country) => (
        <div key={country.name}>
          {displayCountry.get(country.name) || filteredCountries.length==1
            ? <CountryInfoBig country={country} handleClick={handleClick} />
            : <CountryInfoSmall country={country} handleClick={handleClick}/>}
        </div>
      ))}
    </div>
  )
}

export { Countries }
