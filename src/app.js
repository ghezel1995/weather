function formattedDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day}, ${hour}:${minutes} `;
}

function formatForecastDays(time) {
  let date = new Date(time * 1000);
  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
              <div class="col-2 forecast-card">
                <div class="forecast-date">${formatForecastDays(
                  forecastDay.time
                )}</div>
                <img
                  src=${forecastDay.condition.icon_url}
                  alt=""
                  class="forecast-img"
                />
                <div class="forecast-temperature">
                  <span id="forecast-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}°</span>
                  <span id="forecast-min">  ${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                </div>
              </div>
  `;
    }
  });
  forecastHTML += `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinate) {
  console.log(coordinate);
  let apiKey = '6b27a083f4447ft3fa5232f2oed26a80';
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinate.latitude}&lon=${coordinate.longitude}&key=6b27a083f4447ft3fa5232f2oed26a80&units=metric`;
  console.log(apiUrlForecast);

  axios.get(apiUrlForecast).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);

  celsiusTemperature = response.data.temperature.current;

  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let city = document.querySelector('#city');
  city.innerHTML = response.data.city;

  let descriptionElement = document.querySelector('#description');
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector('#humidity');
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector('#wind');
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector('#date');
  dateElement.innerHTML = formattedDate(response.data.time * 1000);

  let iconElement = document.querySelector('#icon');
  iconElement.setAttribute(
    'src',
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute('alt', response.data.condition.description);

  getForecast(response.data.coordinates);
}
function search(city) {
  let apiKey = '6b27a083f4447ft3fa5232f2oed26a80';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector('#city-input');
  search(cityInputElement.value);
}
search('New York');

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

function setBackgroundImage() {
  var currentHour = new Date().getHours();
  var bodyElement = document.getElementsByTagName('body')[0];

  if (currentHour < 18) {
    bodyElement.classList.add('day');
  } else {
    bodyElement.classList.add('night');
  }
}
window.addEventListener('load', setBackgroundImage);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove('active');
  fahrenheitLink.classList.add('active');
  fahrenheitTemperature = Math.round(fahrenheitTemperature);
  let temperature = document.querySelector('#temperature');
  temperature.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector('#temperature');
  fahrenheitLink.classList.remove('active');
  celsiusLink.classList.add('active');
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector('#fahrenheit-link');
fahrenheitLink.addEventListener('click', showFahrenheitTemperature);

let celsiusLink = document.querySelector('#celsius-link');
celsiusLink.addEventListener('click', showCelsiusTemperature);
