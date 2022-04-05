const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const maintext = document.getElementById('main')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')

const cityInput = document.getElementById('city-input')
const historyElm = document.getElementById('history')
const masterHistory = document.getElementById('master-history')

const API_KEY = 'd4c6a9025476e90f3e50373bea373998';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`
const ICON_URL = 'http://openweathermap.org/img/wn/';
const DEFATULT_CITY = 'Dhaka,bd'

console.log("hello world");

window.onload = function () {
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords)
    }, e => {
        getWeatherData()
    })

    cityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (e.target.value) {
                getWeatherData(e.target.value);
                e.target.value = ''
            }
            else {
                alert("Please Enter the data!")
            }
        }

    })
}

function getWeatherData(city = DEFATULT_CITY, coords) {
    let url = BASE_URL;
    city === null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` :
        url = `${url}&q=${city}`;

    axios.get(url)
        .then(({ data }) => {
            console.log(data);
            let weather = {
                icon: data.weather[0].icon,
                name: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }
            setWeather(weather);
        })
        .catch(e => {
            console.log(e);
            alert('City not found')
        })
}

function setWeather(weather) {
    condition.src = `${ICON_URL}${weather.icon}.png`;
    city.innerHTML = weather.name;
    country.innerHTML = weather.country;
    maintext.innerHTML = weather.main;
    description.innerHTML = weather.description;
    temp.innerHTML = weather.temp;
    pressure.innerHTML = weather.pressure;
    humidity.innerHTML = weather.humidity;
}