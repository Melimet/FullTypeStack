import axios from "axios"
import { useEffect, useState } from "react"
import { CountryProps } from "./CountryInfoSmall"

interface Weather {
  current: {
    temperature: number
    weather_icons: string[]
    weather_descriptions: string[]
  }
}

function CountryInfoBig({ country, handleClick }: CountryProps) {
  const [weather, setWeather] = useState<Weather>()


  useEffect(() => {
    getWeatherDataFromApi()
    async function getWeatherDataFromApi() {

      try {
        const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY
        const address = `http://api.weatherstack.com/current?access_key=${api_key}&query=`
        const res = await axios.get<Weather>(
          address+country.capital
        )

        const data = res.data

        const newWeather = {
          current: {
            temperature: data.current.temperature,
            weather_icons: data.current.weather_icons,
            weather_descriptions: data.current.weather_descriptions,
          },
        }
        console.log(newWeather)
        setWeather(newWeather)

      } catch (err) {
        console.log("error", err)
      }
    }
  },[])

  return (
    <div>
      <h1>
        {country.name}
        <button onClick={() => handleClick(country.name)}>hide</button>
      </h1>

      <p>capital: {country.name}</p>
      <h2>Spoken languages:</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="country flag" height="50" />

      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {weather?.current.temperature} deg celsius</p>
        <img src={weather?.current.weather_icons[0]} />
        <p>{weather?.current.weather_descriptions[0]}</p>
      </div>
    </div>
  )
}

export { CountryInfoBig }
