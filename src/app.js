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

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

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
}

let apiKey = '6b27a083f4447ft3fa5232f2oed26a80';
let city = 'London';
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

function setBackgroundImage(){
  var currentHour = new Date().getHours();
  var bodyElement = document.getElementsByTagName('body')[0];

  if (currentHour < 18) {
    bodyElement.classList.add('day');
  } else {
    bodyElement.classList.add('night');
  }
}
window.addEventListener('load', setBackgroundImage)