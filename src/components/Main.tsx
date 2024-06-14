import * as React from "react";
import "../styles/Main.css";
import  {useState, useEffect} from "react";
import axios from "axios";
import Current from "./Current_weather";
import Hourly from "./Hourly_weather";
import Week from "./5days_weather";

function Main() {
    const [isLoading, setLoading] = useState(true);  // Флаг готовности результата axios
    const [city, setCity] = useState('Москва'); // отслеживаем изменение города
    const [lat, setLat] = useState(55.7522); // отслеживаем изменение текущих координат, по умолчанию - Москва
    const [lon, setLon] = useState(37.6156);
    const [widget, setWidget] = useState('current'); // Отслеживаем какой виджет (компонент) показывать
    const [current, setCurrent] = useState([]);
    const [feels_like, setFeels_like] = useState([]);
    const [temp, setTemp] = useState([]);
    const [wind_speed, setWind_speed] = useState([]);
    const [description, setDescription] = useState([]);
    const [day, setHourly] = useState([]);
    const [week, setWeek] = useState([]);
    const [pict, setIcon] = useState('03n');
    const citilist = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород',
    'Челябинск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Омск', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'];

    // Наполняем содержимое select
    const options = citilist.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    // Функции вычисления текущей геопозиции
    function getMyPosition() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    function onSuccess(geolocationData) {
        setLoading(true);
        setLat(geolocationData.coords.latitude);
        setLon(geolocationData.coords.longitude);
        axios.get(`https://api.ipgeolocation.io/timezone?apiKey=2276cdea63e34c4b934b8ff777748b3a&lat=${lat}&lng=${lon}`).then(res => {
            setCity(res.data.geo.city);
            setLoading(false);
            console.log('город по IP', res.data.geo.city)
            });
    };
    function onError(error) {
      console.log('Информация о местоположении недоступна');
      console.log(error.message);
    };

    // Получаем координаты выбранного города
    useEffect(() => {

//         if (key_openweathermap == undefined) {
            axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}','RUS'&limit=1&appid=2d19c4453ac225fde9e9d87f8fdfb201`).then(res => {
                setLat(res.data[0].lat);
                setLon(res.data[0].lon);
                console.log('координаты выбранного города', res.data[0].lat, res.data[0].lon)
            });
//         };


//         Получаем данные о погоде на «сейчас»; «ближайшие два дня» (почасово на двое суток); «на этой неделе» (следующие семь дней).
//         if (key_openweathermap == undefined) {
            axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=2d19c4453ac225fde9e9d87f8fdfb201&units=metric`).then(res => {
                setCurrent(res.data.current);
                setDescription(res.data.current.weather[0].description);
                setFeels_like(res.data.current.feels_like);
                setTemp(res.data.current.temp);
                setWind_speed(res.data.current.wind_speed);
                setHourly(res.data.hourly);
                setWeek(res.data.daily);
                setIcon(res.data.current.weather[0].icon);
                setLoading(false);
                console.log('res.data ', res.data.current)
            });
//         };
    }, [city,]);

//     Если флаг isLoading = false то выводим "Loading..."
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    // Иначе выводим полученные из axios данные
    return (
        <main>
            <div className="cover">

                <div className='button'>
                    <button onClick={getMyPosition}>Найти меня</button>
                    <select value={city} onChange={e=>setCity(e.target.value)}>
                        <option disabled>Выберите город</option>
                        {options}
                    </select>

                    <button onClick={e=>setWidget("current")}>Сегодня</button>
                    <button onClick={e=>setWidget("24hours")}>На ближайшие 24 часа</button>
                    <button onClick={e=>setWidget("5days")}>На 5 дней </button>
                </div>

                {(widget === "current" ) &&
                    <div>
                        <Current  lat={lat} lon={lon} city={city} icon={pict}
                        description={description} feels_like={feels_like} temp={temp} wind_speed={wind_speed}/>
                    </div>
                }

                {widget === "24hours" &&
                    <div>
                        <div className="city">{city}</div>
                        <div className="widgets">
                        {day.slice(0,24).map((value,index) =>
                            <Hourly day={index} temp={value.temp} icon={value.weather[0].icon} key={value.dt}/>
                        )}
                        </div>
                    </div>
                }

                {widget === "5days" &&
                    <div>
                        <div className="city">{city}</div>
                        <div className="widgets">
                            {week.slice(0, 5).map((value,index) =>
                                <Week day={index} temp={value.temp.day} icon={value.weather[0].icon} key={value.dt}/>,

                            )}
                        </div>
                    </div>
                }
            </div>
        </main>
    );
};

export default Main;
