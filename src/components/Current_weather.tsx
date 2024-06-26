import * as React from "react";
import  { useState } from "react";
import axios from "axios";
import "../styles/Widget.css";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


function Current(props) {
    const days =["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const date = new Date();
    const mapCursor = [props.lat, props.lon]
    const yaMap = {
          center: (mapCursor),
          zoom: 5,
          }

    return (
        <div className="current">
            <div className="weather-left">
                <div className="weather-city">{props.city}</div>
                <h2 className="date"> {date.toLocaleDateString()}, {days[date.getDay()]} </h2>
                <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="100" />
                <div className="desc-main">{props.description}</div>
                <div className="feels-like">Ощущается как: {props.feels_like}°</div>
            </div>

            <div className="weather-right">
                <div className="temp-main">{props.temp}°</div>
                <div className="wind">Ветер: {props.wind_speed}m/s</div>
            </div>
                  <YMaps>
                      <Map state={yaMap}>
                          <Placemark geometry={mapCursor} />
                      </Map>
                  </YMaps>
            </div>
    );
};

export default Current;

