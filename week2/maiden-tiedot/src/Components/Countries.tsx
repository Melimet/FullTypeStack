import { Country } from "../App"

interface CountryProps {
  countries: Country[]
  filter: string
}

function Countries({
  countries,
  filter,
}: CountryProps) {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Countries</h2>
      {filteredCountries.map((country) => (
        <div key={country.name}>{country.name}</div>
      ))}
    </div>
  )
}

export { Countries }
