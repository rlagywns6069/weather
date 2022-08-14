import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, selectedCity, current}) => {
  console.log(cities);
  return (
    <div className='menu-container'>
      <Button variant={`${selectedCity == null ? "outline-warning" : "warning"}`} onClick={() => current("current")}>Current Location</Button>

      {cities.map((city) =>(
        <Button variant={`${selectedCity == null ? "outline-warning" : "warning"}`} onClick={() => current(city)}>{city}</Button>
      ))}
    </div>
  );
};

export default WeatherButton
