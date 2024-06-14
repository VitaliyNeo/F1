import * as React from "react";
import  { useState } from "react";
import axios from "axios";
import "../styles/Widget.css";

function Hourly(props) {
    const date = new Date();

    return (
        <div className="widget">
            <div className="panel">
                <div className="date">
                    {props.day === 0 && "Сейчас"}
                    {((date.getHours() + props.day) < 25) && props.day > 0 && `в ${date.getHours()+props.day}:00` }
                    {((date.getHours() + props.day) > 24) && `в ${date.getHours()+props.day-24}:00` }
                </div>
                <div className="temp">
                   <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" width="60"/>
                   {Math.round(props.temp)}&deg;
                </div>
            </div>
        </div>
    );
};

export default Hourly;

