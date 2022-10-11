function formatedDate(date) {
  let lastUpdateDate = new Date(date * 1000);
  let day = lastUpdateDate.getDay();
  let hour = lastUpdateDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = lastUpdateDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${hour}`;
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

  return `${days[day]}, ${hour}:${minutes}`;
}

function displayWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = response.data.dt;
  let dateElement = document.querySelector("#date");
  let icon = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let iconElement = document.querySelector("#icon");

  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

  dateElement.innerHTML = formatedDate(date);
}

function search(city) {
  let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

search("London");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
