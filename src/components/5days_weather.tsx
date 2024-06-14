import * as React from "react";
import  { useState } from "react";
import axios from "axios";
import "../styles/Widget.css";

function Week(props) {
    const days =["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const date = new Date();

    return (
        <div className="widget">
            <div className="panel">
                <div className="date2">
                    {props.day === 0 && "Сегодня"}
                    {(date.getDay()+props.day) < 7 && props.day > 0 && `${date.getDate()+props.day}.${date.getMonth()}.${date.getFullYear()}, ${days[date.getDay()+props.day]}`}
                    {(date.getDay()+props.day) > 6 && props.day > 0 && `${date.getDate()+props.day}.${date.getMonth()}.${date.getFullYear()}, ${days[date.getDay()+props.day-7]}`}
                </div>
                <div className="temp">
                    <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="60"/>
                      {Math.round(props.temp)}&deg;
                </div>
            </div>
        </div>
    );
};

export default Week;

