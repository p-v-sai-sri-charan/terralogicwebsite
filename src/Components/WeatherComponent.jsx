import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Clock from "./Clock";
import { Button } from "primereact/button";
import "../App.css";
import "./WeatherComponent.css";
import {
  WiDayCloudyHigh,
  WiDayCloudy,
  WiDayHail,
  WiDayRainMix,
  WiDaySunny,
} from "react-icons/wi";

import { InputText } from "primereact/inputtext";

const WeatherComponent = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [hour, setHour] = useState([]);
  const [hours, setHours] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [weather, setWeather] = useState(null);

  const searchLocation = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
        )
        .then((response) => {
          setData(response.data);
          setWeather(response.data.weather[0].main);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=895284fb2d2c50a520ea537456963d9c`
        )
        .then((response) => {
          setHourlyData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    });
    const hour = DateTime.now()
      .toLocaleString(DateTime.TIME_SIMPLE)
      .split(":")[0];
    const hours = Array.from({ length: 6 }, (_, i) => {
      if (i + parseInt(hour) > 12) {
        return `${i + parseInt(hour) - 12}pm`;
      } else if (i + parseInt(hour) === 12) {
        return `${i + parseInt(hour)}pm`;
      } else {
        return `${i + parseInt(hour)}am`;
      }
    });
    setHour(hour);
    setHours(hours);
  }, [location]); // Add 'location' to the dependency array

  useEffect(() => {
    console.log(data?.weather[0].main, "weather");
  }, [data?.weather[0].main]); // Add 'data?.weather[0].main' to the dependency array

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center relative">
      <div className={`w-full h-full`}>
        <div
          className={`flex flex-col justify-start items-left h-2/3 ${
            data?.weather[0].main == "Clear"
              ? "clear-background"
              : data?.weather[0].main == "Clouds"
              ? "cloudy-background"
              : data?.weather[0].main == "Mist"
              ? "mist-background"
              : data?.weather[0].main == "Rain"
              ? "drizzle-background"
              : "default-background"
          }`}
        >
          {/* <div className="flex flex-col justify-center items-center h-1/2"> */}
          {/* <div className="flex flex-col justify-center items-center">
              <h1 className="text-6xl text-white font-bold">Weather App</h1>
              <h2 className="text-2xl text-white font-bold">Enter a location to get the weather</h2>
              </div>
              <div className="flex flex-col justify-center items-center">
              <InputText
                className="w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a location"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{borderRadius:"35px"}} onClick={searchLocation}>Search</button>
                </div> */}
          {/* </div> */}
          <div className="flex justify-center items-center pt-4">
            <InputText
              className="w-1/3 rounded-xl"
              placeholder="Enter a location"
              value={location}
              style={{borderRadius:"35px"}}
              onChange={(e) => setLocation(e.target.value)}
              
            />
            <Button icon="pi pi-search" onClick={searchLocation} />
          </div>
          <div className="flex flex-col justify-between items-left p-4 h-1/2">
            <div className="flex flex-col justify-center items-center md:px-8">
              <Clock timezone={data?.timezone ? data?.timezone : 0} />
            </div>
            {data && (
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-6xl text-white font-bold">{data.name}</h1>
                <h2 className="text-md md:text-2xl text-white font-bold">
                  {data.weather[0].main}
                </h2>
                <h2 className="text-md md:text-2xl text-white font-bold">
                  {data.main.temp}°F
                </h2>
                <h2 className="text-md md:text-2xl text-white font-bold">
                  Humidity: {data.main.humidity}%{" "}
                </h2>
                <h2 className="text-md md:text-2xl text-white font-bold">
                  Wind Speed: {data.wind.speed} mph{" "}
                </h2>
                <h2 className="text-md md:text-2xl text-white font-bold">
                  Max: {data.main.temp_max}°F High
                </h2>
                <h2 className="text-md md:text-2xl text-white font-bold">
                  Min: {data.main.temp_min}°F Low
                </h2>
              </div>
            )}
            {/* align button at half of the page*/}
            <div className="z-30 flex justify-end pt-4">
              <Button
                icon="pi pi-plus"
                rounded
                severity="primary"
                aria-label="Add location"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full ">
          <div className="flex flex-row justify-between items-center w-full ">
            <div className="flex flex-col justify-center items-center w-1/2">
              <span className="text-xl md:text-2xl text-balck font-bold">
                Today
              </span>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2">
              {data ? data.name : null}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-fit h-8 scroll-x-auto pt-16 gap-4 ">
            {hours.map((hour, index) => {
              return (
                <div
                  className="flex flex-col justify-center items-center w-full h-full "
                  key={index}
                >
                  <span className="text-2xl text-gray">{hour}</span>
                  <div>
                    <WiDayCloudyHigh size={32} className="text-gray-800" />
                  </div>
                  <span className="text-2xl text-gray">70°</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
