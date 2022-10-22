import { Dispatch, SetStateAction } from "react"
import { Country } from "../App"

export interface CountryProps {
  country: Country
  handleClick: (targetCountry: string) => void
}

function CountryInfoSmall({country, handleClick}: CountryProps) {
  return (
    <>
      {country.name}
      <button onClick={() => handleClick(country.name)} type="button">
        display country
      </button>
    </>
  )
}

export { CountryInfoSmall }
