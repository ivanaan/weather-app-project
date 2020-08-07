function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let today = now.getDate();
  if (today < 10) {
    today = `0${today}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[now.getMonth()];
  return `${today} ${month}, ${day} ${formatTime(timestamp)}`;
}
function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let min = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hours}:${min}`;
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let mainTemp = document.querySelector("#mainTemperature");
  let description = document.querySelector("#description");
  let maxTemp = document.querySelector("#maxTemp");
  let minTemp = document.querySelector("#minTemp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let mainIcon = document.querySelector("#main-icon");
  let todayDate = document.querySelector("#today-date");

  celsiusTemp = response.data.main.temp;

  city.innerHTML = response.data.name;
  mainTemp.innerHTML = Math.round(celsiusTemp);
  description.innerHTML = response.data.weather[0].description;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
}
function displayForecast(response) {
  let forecastDays = document.querySelector("#forecast");
  forecastDays.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];

    forecastDays.innerHTML += ` <div class="col-3">
            <span id="time-one">${formatTime(
              forecast.dt * 1000
            )}</span> <br /><img
              src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"
              
              alt=""
              id="img-one"
            /><br /><span id="temp-max1">${Math.round(
              forecast.main.temp_max
            )}</span>°/<span id="temp-min1">${Math.round(
      forecast.main.temp_min
    )}</span>°
          </div>`;
  }
}
function search(city) {
  let apiKey = "bc621a3a3a6238705b7e128b25c68a1a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(formatDate);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

function getCurrentLocationTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bc621a3a3a6238705b7e128b25c68a1a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemp);
}
let button = document.querySelector("#button");
button.addEventListener("click", getCurrentLocation);

let celsiusTemp = null;

function displayFahreheitTemp(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temp = document.querySelector("#mainTemperature");
  let fahrenheitElement = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitElement);
}
function displayCelsiusTemp(even) {
  even.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#mainTemperature");
  temp.innerHTML = Math.round(celsiusTemp);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahreheitTemp);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);

search("Prilep");
