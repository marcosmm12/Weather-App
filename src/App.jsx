import './App.css';
import { useState } from 'react';
import { get_temperature, get_precipitation, get_wind } from "./api";

//Coordinates of some cities
const cities = {
  "Madrid": { Lat: 40.4168, Lon: 3.7038}, 
  "Barcelona": { Lat: 41.3887, Lon: 2.1725},
  "Sevilla": { Lat: 37.3719, Lon: -5.9561},
  "Bilbao": { Lat: 43.2629, Lon: -2.9369},
  "Palma": { Lat: 39.5665, Lon: 2.651},
  "Santander": { Lat: 43.4622, Lon: -3.8037},
  "Las Palmas": {Lat: 28.0936, Lon: -15.4199},
  "Granada": { Lat: 37.1887, Lon: -3.6025},
  "Murcia": { Lat: 37.9887, Lon: -1.13},
  "Oviedo": { Lat: 43.3666, Lon: -5.84},
  "Gijon": { Lat: 43.5333, Lon: -5.65},
  "Cartagena": { Lat: 37.5081, Lon: -0.9469},
  "Vitoria": { Lat: 42.8833, Lon: -2.72},
  "San Sebastian": {Lat: 43.3056, Lon: -1.9444},
  "Almeria": { Lat: 36.8475, Lon: -2.3794},
  "Jerez": { Lat: 36.7431, Lon: -6.0644},
  "Cádiz": { Lat: 36.5275, Lon: -6.2911},
  "Valencia": { Lat: 39.4697, Lon: 0.3292},
  "Toledo": { Lat: 39.8617, Lon: -4.0267}};

function App() {
  //Store the current city
  let [city, setCity] = useState(); //State to store the city --> city is the variable, setCity is the function to change the value and the default value is null
  //Store Hourly --> true if hourly is selected, false otherwise
  let [hourly, setHourly] = useState(false);
  //Store the quantity of hours
  let [quantHours, setQuantHours] = useState(1);
  //Store Daily --> true if daily is selected, false otherwise
  let [daily, setDaily] = useState(false);
  //Store the quantity of Days
  let [quantDays, setQuantDays] = useState(1);
  //Store temperature --> true if temperature is selected, false otherwise
  let [temperature, setTemperature] = useState(false);
  //Store precipitation --> true if precipitation is selected, false otherwise
  let [precipitation, setPrecipitation] = useState(false);
  //Store wind --> true if wind is selected, false otherwise
  let [wind, setWind] = useState(false);
  //Store the weather data
  let [weatherData, setWeatherData] = useState(null);
  //Global variable for the keys of the components
  let index = 0;

  //Function to handle city change
  const handleCityChange = (event) => {
    setCity(event.target.value);  //Change the value of the city to the value of the selected option
                                  //setCity is a function of the useState hook
                                  //event.target is the select, the element that triggered the event
  }

  //Function to handle hourly change
  const handleHourlyChange = (event) => {
    setHourly(event.target.checked);
  }

  //Function to handle the quantity of hours change
  const handleQuantHoursChange = (event) => {
    setQuantHours(Number(event.target.value));
  }

  //Function to handle daily change
  const handleDailyChange = (event) => {
    setDaily(event.target.checked);
  }

  //Function to handle the quantity of Days change
  const handleQuantDaysChange = (event) => {
    setQuantDays(Number(event.target.value));
  }

  //Function to handle temperature change
  const handleTemperatureChange = (event) => {
    setTemperature(event.target.checked);
  }

  //Function to handle precipitation change
  const handlePrecipitationChange = (event) => {
    setPrecipitation(event.target.checked);
  }

  //Function to handle wind change
  const handleWindChange = (event) => {
    setWind(event.target.checked);
  }

  //Function to get the data from the API and store it in the variable weatherData
  const getData = async () => {
    //Imprimir por terminal que entramos aqui
    console.log("Entro en getData");
    //Check if hourly data is wanted
    let result = {};
    if (hourly && city) {
      if (temperature) {
        const responseTemp = await get_temperature(cities[city].Lat, cities[city].Lon, "HOURLY", quantHours);
        result.hourlyTemp = responseTemp;
      }
      if (precipitation) {
        const responsePrecip = await get_precipitation(cities[city].Lat, cities[city].Lon, "HOURLY", quantHours);
        result.hourlyPrecip = responsePrecip;
      }
      if (wind) {
        const responseWind = await get_wind(cities[city].Lat, cities[city].Lon, "HOURLY", quantHours);
        result.hourlyWind  = responseWind;
      }
    }
    if (daily && city) {
      if (temperature) {
        const responseTemp = await get_temperature(cities[city].Lat, cities[city].Lon, "DAILY", quantDays);
        result.dailyTemp = responseTemp;
      }
      if (precipitation) {
        const responsePrecip = await get_precipitation(cities[city].Lat, cities[city].Lon, "DAILY", quantDays);
        result.dailyPrecip = responsePrecip;
      }
      if (wind) {
        const responseWind = await get_wind(cities[city].Lat, cities[city].Lon, "DAILY", quantDays);
        result.dailyWind = responseWind;
      }
    }
    //Store the result
    setWeatherData(result);
  }

  const showHourlyData = () => {
    let date_shown = false;    
    
    return (
      <div id="data-section">
        <div id="hourly-section">
          {hourly && temperature && weatherData && weatherData.hourlyTemp ? (
            <div id="h-temperature-section">
              {/* Put the dates of all hours */}
              <div id="h-dates">
                <label id="d-date">Hour</label>
                {weatherData.hourlyTemp.hourly.time.map((date) => (
                  <label key={`temp-date-${index++}`} id="label-date">{date}</label>
                ))}
                {date_shown = true}
              </div>
              {/* Put temperatures of all hours */}
              <div id="h-temperatures">
                <label>Temperature</label>
                {weatherData.hourlyTemp.hourly.apparent_temperature.map((temp) => (
                  <label key={`temp-${index++}`} id="label-temp">{temp} ºC</label>
                ))}
              </div>
            </div>)
            : <></>}

          {hourly && precipitation && weatherData && weatherData.hourlyPrecip ? (
            <div id="h-precipitation-section">
              {/* If not, put the dates of all hours */}
              {!date_shown ? (
                <div id="h-dates">
                  <label id="d-date">Hour</label>
                  {weatherData.hourlyPrecip.hourly.time.map((date) => (
                    <label key={`precip-date-${index++}`} id="label-date">{date}</label>
                  ))}
                  {date_shown = true}
                </div>) 
              : <></>}
              {/* Put cloud cover of all hours */}
              <div id="h-cloud-cover">
                <label>Cloud cover</label>
                {weatherData.hourlyPrecip.hourly.cloud_cover.map((clouds) => (
                  <label key={`precip-clouds-${index++}`} id="label-clouds">{clouds}%</label>
                ))}
              </div>
              {/* Put precipitation of all hours */}
              <div id="h-precipitations">
                <label>Precipitations</label>
                {weatherData.hourlyPrecip.hourly.precipitation.map((precip) =>(
                  <label key={`precip-${index++}`} id="label-precip">{precip} mm</label>
                ))}
              </div>
              {/* Put the precipitation probability of all hours */}
              <div id="h-precipitation-prob">
                <label>Precipitation probability</label>
                {weatherData.hourlyPrecip.hourly.precipitation_probability.map((prec_prob) => (
                  <label key={`precip-prob-${index++}`} id="label-precip-prob">{prec_prob}%</label>
                ))}
              </div>
              {/* Put the rain of all hours */}
              <div id="h-rain">
                <label>Rain</label>
                {weatherData.hourlyPrecip.hourly.rain.map((rain) => (
                  <label key={`rain-${index++}`} id="label-rain">{rain} mm</label>
                ))}
              </div>
              {/* Put the snowfall of all hours */}
              <div id="h-snowfall">
                <label>Snowfall</label>
                {weatherData.hourlyPrecip.hourly.snowfall.map((snowfall) => (
                  <label key={`snowfall-${index++}`} id="label-snowfall">{snowfall} cm</label>
                ))}
              </div>
              {/* Put the snow depth of all hours */}
              <div id="h-snow-depth">
                <label>Snow depth</label>
                {weatherData.hourlyPrecip.hourly.snow_depth.map((snow_depth) => (
                  <label key={`snow-depth-${index++}`} id="label-snow-depth">{snow_depth} m</label>
                ))}
              </div>
            </div>)
          : <></>}
          
          {hourly && wind && weatherData && weatherData.hourlyWind ? (
            <div id="h-wind-section">
              {/* If not, put the dates of all hours */}
              {!date_shown ? (
                <div id="h-dates">
                  <label id="d-date">Hour</label>
                  {weatherData.hourlyWind.hourly.time.map((date) => (
                    <label key={`wind-date-${index++}`} id="label-date">{date}</label>
                  ))}
                  {date_shown = true}
                </div>
              ) : <></>}
              {/* Wind speed at 10m of altitude of all hours */}
              <div id="h-wind-speed-10m">
                <label>Wind speed at 10m of altitude</label>
                {weatherData.hourlyWind.hourly.wind_speed_10m.map((wind) => (
                  <label key={`wind-10m-${index++}`} id="label-wind-speed-10m">{wind} km/h</label>
                ))}
              </div>         
              {/* Wind speed at 120m of altitude of all hours */}
              <div id="h-wind-speed-120m">
                <label>Wind speed at 120m of altitude</label>
                {weatherData.hourlyWind.hourly.wind_speed_120m.map((wind) => (
                  <label key={`wind-120m-${index++}`} id="label-wind-speed-120m">{wind} km/h</label>
                ))}
              </div>          
            </div>
          ) : <></>}
        </div>
      </div>
    );
  }

  const showDailyData = () => {
    let date_shown = false;    
    
    return (
      <div id="data-section">
        <div id="daily-section">
          {daily && temperature && weatherData && weatherData.dailyTemp ? (
            <div id="d-temperature-section">
              {/* Put the dates of all days */}
              <div id="d-dates">
                <label id="d-date">Day</label>
                {weatherData.dailyTemp.daily.time.map((dates) => (
                  <label key={`temp-date-${index++}`} id="label-date">{dates}</label>
                ))}
                {date_shown = true}
              </div>
              {/* Put the min temperature of all days */}
              <div id="d-min-temperature">
                <label>Min temperature</label>
                {weatherData.dailyTemp.daily.apparent_temperature_min.map((temp) => (
                  <label key={`temp-min-${index++}`} id="label-temp-min">{temp} ºC</label>
                ))}
              </div>
              {/*Put the max temperature of all days */}
              <div id="d-max-temperature">
                <label>Max temperature</label>
                {weatherData.dailyTemp.daily.apparent_temperature_max.map((temp) => (
                  <label key={`temp-max-${index++}`} id="label-temp-max">{temp} ºC</label>
                ))}
              </div>  
            </div>
          ) : <></>}

          {daily && precipitation && weatherData && weatherData.dailyPrecip ? (
            <div id="d-precipitation-section">
              {/* If not, show the dates */}
              {!date_shown ? (
                <div id="d-dates">
                  <label id="d-date">Day</label>
                  {weatherData.dailyPrecip.daily.time.map((date) => (
                    <label key={`date-${index++}`} id="label-date">{date}</label>
                  ))}
                  {date_shown = true}
                </div>
              ) : <></>}
              {/* Show the precipitation sum of all the days */}
              <div id="d-precipitation-sum">
                <label>Precipitation accumulation</label>
                {weatherData.dailyPrecip.daily.precipitation_sum.map((precip) => (
                  <label key={`precip-sum-${index++}`} id="label-precip-sum">{precip} mm</label>
                ))}
              </div>
              {/* Show the rain sum of all the days */}
              <div id="d-rain-sum">
                <label>Rain accumulation</label>
                {weatherData.dailyPrecip.daily.rain_sum.map((rain) => (
                  <label key={`rain-sum${index++}`} id="label-rain-sum">{rain} mm</label>
                ))}
              </div>
              {/* Show the snowfall sum of all the days */}
              <div id="d-snowfall-sum">
                <label>Snowfall accumulation</label>
                {weatherData.dailyPrecip.daily.snowfall_sum.map((snowfall) => (
                  <label key={`snowfall-sum-${index++}`} id="label-snowfall-sum">{snowfall} cm</label>
                ))}
              </div>
              {/* Show the precipitation hours of all the days */}
              <div id="d-precipitation-hours">
                <label>Precipitations hours</label>
                {weatherData.dailyPrecip.daily.precipitation_hours.map((hours) => (
                  <label key={`precip-hours-${hours}`} id="label-precip-hours">{hours} hours</label>
                ))}
              </div>
              {/* Show the average precipitation probability of all the days */}
              <div id="d-precipitation-prob-mean">
                <label>Average precipitation probability</label>
                {weatherData.dailyPrecip.daily.precipitation_probability_mean.map((prob) => (
                  <label key={`precip-prob-${index++}`} id="label-precip.prob">{prob}%</label>
                ))}
              </div>
            </div>
          ) : <></>}

          {daily && wind && weatherData && weatherData.dailyWind ? (
            <div id="d-wind-section">
              {/* If not, show the dates */}
              {!date_shown ? (
                <div id="d-dates">
                  <label id="d-date">Day</label>
                  {weatherData.dailyWind.daily.time.map((date) => (
                    <label key ={`wind-date-${index++}`} id="label-date">{date}</label>
                  ))}
                  {date_shown = true}
                </div>
              ) : <></>}
              {/* Show the wind speed at 10m of altitude of all the days */}
              <div id="d-wind-speed-10m">
                <label>Wind speed at 10m of altitude</label>
                {weatherData.dailyWind.daily.wind_speed_10m_max.map((wind) => (
                  <label key={`wind-10m-${index++}`} id="label-wind-speed-10m">{wind} km/h</label>
                ))}
              </div>
            </div>
          ) : <></>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Weather App</h1>
      <label htmlFor="city-select">Choose a city:</label>   {/* Label for the select --> htmlFor is to associate the label to the select ("Desplegable") using the id of the select */}
      
      <select id="city-select" value={city} onChange={handleCityChange}>  {/* Add your select element here --> value is the default value (current city for default), onChange is the function to change the value when the user selects something */}
          <option value="">--Please choose a city--</option>   {/* This is a row in the select with no value that asks you to choose a city */}
          {Object.entries(cities).map(([cityName, coords]) =>(  //Iterate over the elements of the cities object (the element of the current iteration is cityName)
            <option key={cityName} value={cityName}>{cityName}</option>   // This is a row in the select with the value of the cityName, the text of the cityName and the key of the cityName to identify row
          ))}
      </select>

      <div id="daily-hourly_section">
        <div id="hourly-checbox" className="label-container">
          {/* Checkbox to select hourly data */}
          <input
              type="checkbox"
              id="hourly"
              checked={hourly}
              onChange={handleHourlyChange}
          />
          <label htmlFor="hourly">Hourly</label>

          {/* Input of the quantity of hours */}
          <label id="label-hours">Hours:</label>
          <input
              type="number"
              value={quantHours}
              onChange={handleQuantHoursChange}
              min="1"
              max="24"
          />
        </div>

        <div id="daily-checkbox" className="label-container">
          {/* Checkbox to select daily data */}
            <input
              type="checkbox"
              id="daily"
              checked={daily}
              onChange={handleDailyChange}
              />
            <label htmlFor="daily">Daily</label>

          {/* Input of the quantity of days */}
          <label id="label-days">Days:</label>
          <input
              type="number"
              value={quantDays}
              onChange={handleQuantDaysChange}
              min="1"
              max="7"
          />
        </div>
      </div>
      <div id="parameters-section">
        
        <div id="temperature-section">
          <input
            type="checkbox"
            id="temperature"
            checked={temperature}
            onChange={handleTemperatureChange}
            />
          <label htmlFor="temperature">Temperature</label>
        </div>

        <div id="precipitation-section">
          <input
            type="checkbox"
            id="precipitation"
            checked={precipitation}
            onChange={handlePrecipitationChange}
          />
          <label htmlFor="precipitation">Precipitation</label>
        </div>

        <div id="wind-section">
          <input
            type="checkbox"
            id="wind"
            checked={wind}
            onChange={handleWindChange}
          />
          <label htmlFor="wind">Wind</label>
        </div>
      </div>

      <button id="get-data" onClick={getData}>Get Weather Data</button>

      <div id="data-section">
        {
        city === undefined || city === "" ? <p>Please select a city</p> :
        weatherData ? (
          <div>
            {hourly ? (
              <div>
                <h2>Hourly predictions</h2>
                {showHourlyData()}
              </div>) : <></>}
            {daily ? (
              <div>
                <h2>Daily predictions</h2>
                {showDailyData()} 
              </div>): <></>}
            {/* The code below allows you to see the data returned by the API in the web page. It's useful for debugging purposes. */}
            {/*{weatherData.hourlyTemp && <p>Hourly Temperature: {JSON.stringify(weatherData.hourlyTemp)}</p>}
            {weatherData.hourlyPrecip && <p>Hourly Precipitation: {JSON.stringify(weatherData.hourlyPrecip)}</p>}
            {weatherData.hourlyWind && <p>Hourly Wind: {JSON.stringify(weatherData.hourlyWind)}</p>} 
            {weatherData.dailyTemp && <p>Daily Temperature: {JSON.stringify(weatherData.dailyTemp)}</p>}
            {weatherData.dailyPrecip && <p>Daily Precipitation: {JSON.stringify(weatherData.dailyPrecip)}</p>}
            {weatherData.dailyWind && <p>Daily Wind: {JSON.stringify(weatherData.dailyWind)}</p>} */}
        </div>) : <p>No data available</p>}
      </div>

    </div>
  )



};

export default App;