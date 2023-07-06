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
}

let apiKey = '6b27a083f4447ft3fa5232f2oed26a80';
let city = 'London';
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
