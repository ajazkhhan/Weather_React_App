import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assects/search.png";
import clear_icon from "../Assects/clear.png";
import cloud_icon from "../Assects/clouds.png";
import drizzle_icon from "../Assects/drizzle.png";
import rain_icon from "../Assects/rain.png";
import snow_icon from "../Assects/snow.png";
import wind_icon from "../Assects/snow.png";
import humidity_icon from "../Assects/humidity.png";

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud_icon);

  const search = () => {
    const element = document.getElementsByClassName("cityInput");

    let apiKey = "6e5e511605eb5fb9791811404666126b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    if (element === "") return null;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        humidity[0].innerHTML = `${data.main.humidity} %`;
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon == "01n") {
          setWicon(clear_icon);
        } else if (
          data.weather[0].icon === "02d" ||
          data.weather[0].icon == "02n"
        ) {
          setWicon(cloud_icon);
        } else if (
          data.weather[0].icon === "03d" ||
          data.weather[0].icon == "03n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "04d" ||
          data.weather[0].icon == "04n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "09d" ||
          data.weather[0].icon == "09n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "10d" ||
          data.weather[0].icon == "10n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "13d" ||
          data.weather[0].icon == "13n"
        ) {
          setWicon(snow_icon);
        } else {
          setWicon(clear_icon);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">24°C</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">50%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon wind-icon" />
          <div className="data">
            <div className="wind-rate"> 13km/h</div>
            <div className="text">Wind Speed </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
