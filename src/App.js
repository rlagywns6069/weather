import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


//1.앱이 실행되면 현재 위치기반의 날씨 정보가 보인다.
//2. 현재 도시, 날씨 정보, 섭씨, 화씨 정보가 보인다.
//3. 5개의 버튼이 있다. (현재위치, 다른 도시 4개)
//4. 도시 버튼을 클릭시 그 도시의 날씨 정보가 나온다.

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const cities = ['paris', 'new york', 'tokyo', 'seoul']
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d1dcc258ae9718ab28751e80f56e6ad5&units=metric`
    setLoading(true);
    console.log(lat, lon);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async ()=>{
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1dcc258ae9718ab28751e80f56e6ad5&units=metric`
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log('data', data);
    setWeather(data);
    setLoading(false);
  }


  useEffect(() => {
    if(city ==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  }, [city]);


  const current = (city) => {
      if (city === "current") {
        setCity("");
      } else {
        setCity(city);
      }
    };
    

  return (
   <div>
    {loading ? (
    <div className='container'>
    <ClipLoader color="#f88c6b" loading={loading} size={150} />
    </div> 
    ) : ( 
    <div className='container'> 
    <WeatherBox weather = {weather}/>
    <WeatherButton cities={cities}  current ={current} selectedCity ={city}/>
  </div>
  )}
   
   </div>
  );
}

export default App;
