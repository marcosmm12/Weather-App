import './App.css';
import { useState, useEffect } from 'react';
import { get_temperature, get_precipitation, get_wind } from "./api";

//Coordinates of some cities
const cities = {
  "Madrid": { Lat: 40.4168, Lon: 3.7038}, 
  "Barcelona": { Lat: 41.3887, Lon: 2.1725},
  "Sevilla": { Lat: 37.3719, Lon: -5.9561},
  "Bilbao": { Lat: 43.2629, Lon: -2.9369},
  "Palma": { Lat: 39.5665, Lon: 2.651},
  "Santander": { Lat: 43.4622, Lon: -3.8037},
  "Las Palma": {Lat: 28.0936, Lon: -15.4199},
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
  //Logic to choose a city
  let [city, setCity] = useState(); //State to store the city --> city is the variable, setCity is the function to change the value and the default value is null

  //Function to handle city change
  let handleCityChange = (event) => {
    setCity(event.target.value);  //Change the value of the city to the value of the selected option
                                  //setCity is a function of the useState hook
                                  //event.target is the select, the element that triggered the event
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
    </div>
  )



};

export default App

{/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
  */}