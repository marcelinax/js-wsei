const getData = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.json())
      .then((value) => resolve(value));
  });
};

const getDataFromApiForCurrentWeather = (city) => {
  const value = getData(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=7d113b0de39ac1c331219e3591ef461d"
  );
  return value;
};

const getDataFromApiForHourlyWeather = (city) => {
  const value = getData(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=7d113b0de39ac1c331219e3591ef461d"
  );
  return value;
};

const saveCityInLocalStorage = (city, value) => {
  console.log(value);
  localStorage.setItem(city, value);
};

const getInfoForTown = () => {
  const addBtn = document.querySelector(".add_btn");
  addBtn.addEventListener("click", async () => {
    const city = document.querySelector(".search_town_box").value;
    if (city != "") {
      let value = await getDataFromApiForHourlyWeather(city);
      let hourlyValue = value.list;
      let currentValue = await getDataFromApiForCurrentWeather(city);
      let values = [];
      values.push(currentValue, hourlyValue);
      console.log(values);
      if (value.cod == 404) {
        alert("A city with that name does not exist!");
      } else {
        saveCityInLocalStorage(city, JSON.stringify(values));
        location.reload();
      }
    } else alert("You must input a town!");
  });
};
const readCityFromLocalStorage = async () => {
  let cities = [];
  for (let i = 0; i < localStorage.length; i++) {
    const city = JSON.parse(localStorage.getItem(localStorage.key(i)))[0].name;

    let value = await getDataFromApiForHourlyWeather(city);
    let hourlyValue = value.list;
    let currentValue = await getDataFromApiForCurrentWeather(city);

    let values = [];
    values.push(currentValue, hourlyValue);
    cities.push(values);
  }
  return cities;
};

const getIcon = (value) => {
  return `http://openweathermap.org/img/wn/${value}@2x.png`;
};

const getCalculatedTime = (timezone) => {
  const date = new Date(Date.now() + timezone * 1000 - 3600000);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString();
  return `${hours}:${minutes}`;
};
const getDayOfTheWeek = () => {
  const date = new Date().getDay();
  switch (date) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  }
};

const createWeatherBox = (element) => {
  const divBox = document.createElement("div");
  divBox.classList.add("weatherBox");
  console.log(element[0]);

  let content = `
  <div class = 'weatherBox_main-info'>
    <div class = 'weatherBox_current_date'><p>${getDayOfTheWeek()}, ${new Date().toLocaleDateString()}</p></div>
     <div class = 'weatherBox_delete'>
    <img src = 'delete.png' class = 'delete' </img>
    </div>
    <div class = 'weatherBox_current_time'><p>${getCalculatedTime(
      element[0].timezone
    )}</p></div>
    <div class = 'weatherBox_city'><p>${element[0].name}</p></div>
    <div class = 'weatherBox_main_current'>
      <div class = 'weatherBox_current_temp'><p>${Math.round(
        element[0].main.temp - 273.15
      )}°C</p></div>
       <img src=${getIcon(
         element[0].weather[0].icon
       )} class = 'weatherBox_current_description'>
       </img>
    </div>
    <div class = 'weatherBox_current_pressure'><p>Pressure ${Math.round(
      element[0].main.pressure
    )}hPa</p></div>
    <div class = 'weatherBox_current_humidity'><p>Humidity ${Math.round(
      element[0].main.humidity
    )}%</p></div> 
    
    <div class = 'weatherBox_current_day'><p>${getDayOfTheWeek()}</p></div>
   
    <div class = 'weatherBox_bottom-info'>
      <div class = 'hourly_weatherBox'>
        <div class = 'hourly_weatherBox_time'><p>${new Date(
          element[1][0].dt * 1000 + element[0].timezone * 1000
        ).getHours()}:${new Date(
    element[1][0].dt * 1000 + element[0].timezone * 1000
  ).getMinutes()}0</p></div>
        <img src=${getIcon(
          element[1][0].weather[0].icon
        )} class = 'hourly_weatherBox_description'>
       </img>
       <div class = 'hourly_weatherBox_temp'><p>${Math.round(
         element[1][0].main.temp - 273.15
       )}°C</p></div>
      </div>
      <div class = 'hourly_weatherBox'>
        <div class = 'hourly_weatherBox_time'><p>${new Date(
          element[1][1].dt * 1000 + element[0].timezone * 1000
        ).getHours()}:${new Date(
    element[1][1].dt * 1000 + element[0].timezone * 1000
  ).getMinutes()}0</p></div>
        <img src=${getIcon(
          element[1][1].weather[0].icon
        )} class = 'hourly_weatherBox_description'>
       </img>
       <div class = 'hourly_weatherBox_temp'><p>${Math.round(
         element[1][1].main.temp - 273.15
       )}°C</p></div>
      </div>
      <div class = 'hourly_weatherBox'>
        <div class = 'hourly_weatherBox_time'><p>${new Date(
          element[1][2].dt * 1000 + element[0].timezone * 1000
        ).getHours()}:${new Date(
    element[1][2].dt * 1000 + element[0].timezone * 1000
  ).getMinutes()}0</p></div>
        <img src=${getIcon(
          element[1][2].weather[0].icon
        )} class = 'hourly_weatherBox_description'>
       </img>
       <div class = 'hourly_weatherBox_temp'><p>${Math.round(
         element[1][2].main.temp - 273.15
       )}°C</p></div>
      </div>
       <div class = 'hourly_weatherBox'>
        <div class = 'hourly_weatherBox_time'><p>${new Date(
          element[1][3].dt * 1000 + element[0].timezone * 1000
        ).getHours()}:${new Date(
    element[1][3].dt * 1000 + element[0].timezone * 1000
  ).getMinutes()}0</p></div>
        <img src=${getIcon(
          element[1][3].weather[0].icon
        )} class = 'hourly_weatherBox_description'>
       </img>
       <div class = 'hourly_weatherBox_temp'><p>${Math.round(
         element[1][3].main.temp - 273.15
       )}°C</p></div>
      </div>
      </div>
    </div>
  </div>
  `;
  divBox.innerHTML = content;
  return divBox;
};
const drawWeatherBoard = async () => {
  const board = document.querySelector(".main_weather_box");
  const weather = await readCityFromLocalStorage();

  for (let i = 0; i < weather.length; i++) {
    board.appendChild(createWeatherBox(weather[i]));
  }
  initDelete();
};

const deleteCity = async (city) => {
  citiesLS = await readCityFromLocalStorage();
  cities = [];
  for (let i = 0; i < citiesLS.length; i++) {
    let cityName = citiesLS[i][0].name;
    cities.push(cityName);
  }
  if (cities.length === 1) {
    localStorage.clear();
  }
  console.log(cities);
  const cityName = cities[city];
  console.log(cityName);
  localStorage.removeItem(cityName);
  location.reload();
};

const initDelete = () => {
  document.querySelectorAll(".delete").forEach((deleteBtn, cityName) => {
    deleteBtn.addEventListener("click", () => {
      deleteCity(cityName);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  getInfoForTown();
  drawWeatherBoard();
  initDelete();
});

setInterval(() => {
  location.reload();
}, 3 * 60 * 1000);
