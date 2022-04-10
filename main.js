//Get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloutOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationinput');
const search = document.querySelector('.search');
const btn = document.querySelector('.button');
const cities = document.querySelectorAll('.city');

//Default city when the page Loads
let cityInput = "London";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //Change from default city to the clicked one
        cityInput = e.target.innerHTML;
        /*Function that fetches and displays
        all the data from the weather API*/
        fetchWeatherData();
        //Fade out the app (simple animation)
        app.style.opacity = "0";
    });
})

form.addEventListener('submit', (e) => {
    /*If the input field (search bar)
    is empty, throw an error*/
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        /*Change from default city to the 
        one written in the input field*/
        cityInput = search.value;

        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

/*Function that returns a day of the week
from the date*/
function dayofTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let currentTime = new Date();
    let Day = weekday[currentTime.getDay()];
    return Day;
};

function fetchWeatherData() {
    /*Fetch the data and dynamically add
    the city name with template Literals*/
    fetch(`http://api.weatherapi.com/v1/current.json?key=4ec1da348daa470f9e081323220704&q=${cityInput}`)
        /*Take the data and convert into object*/
        .then(response => response.json())
        .then(data => {
            console.log(data);

            /*Let's start by adding the temperature
            and weather condition to the page*/
            temp.innerHTML = data.current.temp_c + "&#176"
            conditionOutput.innerHTML = data.current.condition.text;

            /*Get the date and time from the city and extract
            day, month, year and time into individual variables*/
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);
            /*Reformating the date onto something more appealing
            and add it to the page */

            dateOutput.innerHTML = `${dayofTheWeek(d, m, y)} ${d}/${m}/${y}`;
            timeOutput.innerHTML = time;
            /*Add the name of the city into the page*/
            nameOutput.innerHTML = data.location.name;
            /* Get the corresponding icon url for 
            the weather and extract a part of it */
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./icons/" + iconId;

            //Add the weather details to the page
            cloutOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/hr";

            let timeOfDay = "day";
            const code = data.current.condition.code;
            if (!data.current.is_day) {
                timeOfDay = "night";
            }
            if (code == 1000) {
                /*Set the background image to
                clear if the weather is clear */
                app.style.backgroundImage = `url(./Images/${timeOfDay}/clear.jpg)`
            }
            //cloudy
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./Images/${timeOfDay}/cloudy.jpg)`;
            }
            else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./Images/${timeOfDay}/rain.jpg)`;
            }
            else {
                app.style.backgroundImage = `url(./Images/${timeOfDay}/snowy.jpg)`
            }
            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found');
            app.style.opacity = "1";
        });
}
fetchWeatherData();
app.style.opacity = "1";
