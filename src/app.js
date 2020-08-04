let now = new Date();
console.log(now);
let hours = now.getHours();
let min = now.getMinutes();
if (hours < 10) {
  hours = "0" + hours;
} else {
  hours = hours + "";
}
if (min < 10) {
  min = "0" + min;
} else {
  min = min + "";
}

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
let dayTime = document.querySelector("#dayTime");
dayTime.innerHTML = `${day}, ${hours}:${min}`;
let today = now.getDate();
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
let dateMonth = document.querySelector("#dateMonth");
dateMonth.innerHTML = `${today} ${month}`;

function displayTemperature(response) {
  let mainTemp = document.querySelector("#mainTemperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let maxTemp = document.querySelector("#maxTemp");
  let minTemp = document.querySelector("#minTemp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let mainIcon = document.querySelector("#main-icon");

  mainTemp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIcon.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "bc621a3a3a6238705b7e128b25c68a1a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
search("Madrid");
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);
