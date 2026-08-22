const container = document.querySelector(".container")
const search = document.querySelector(".search-box button")
const weatherBox = document.querySelector(".weather-box")
const weatherDetails = document.querySelector(".weather-details")
const error404 = document.querySelector(".not-found")
const wear_container = document.querySelector("#wear")


function createCard(parent, text, img) {
  let card = document.createElement("div")
  card.classList.add("clothes-card")
  let header = document.createElement("h3")
  header.innerText = text
  let image = document.createElement("img")
  image.src = `img/clothes/${img}`
  parent.appendChild(card)
  card.appendChild(image)
  card.appendChild(header)

}

function getIndex(feels_like, humidity, wind_speed, weather_id) {
  let index = 0
  let clear_cof = weather_id == 800 ? .25 : 0
  if (wind_speed < 2) {
    index += .3
  }
  if (wind_speed > 5) {
    index -= .3
  }
  if (wind_speed > 10) {
    index -= .6
  }
  if (feels_like > 15) {
    index += 0.3 * Math.floor(humidity / 33.2) + clear_cof
  }
  else if (feels_like < 15) {
    index -= 0.3 * Math.floor(humidity / 33.2) - clear_cof
  }
  if (feels_like >= 40) {
    index += 7
  }
  if (feels_like >= 25 & feels_like < 40) {
    index += 6
  }
  else if (feels_like >= 20 & feels_like < 25) {
    index += 5
  }
  else if (feels_like >= 15 & feels_like < 20) {
    index += 4
  } else if (feels_like >= 5 & feels_like < 15) {
    index += 3
  } else if (feels_like >= -5 & feels_like < 5) {
    index += 2
  } else if (feels_like >= -15 & feels_like < -5) {
    index += 1
  } else if (feels_like >= -30 & feels_like < -15) {
    index += 0
  } else if (feels_like < -30) {
    index -= 1
  }
  console.log(index)
  return index
}
function sendError(errorMessage){
      container.style.height = "400px";
      weatherBox.classList.remove("active")
      weatherDetails.classList.remove("active")
      error404.classList.add("active")
      wear_container.style.opacity = 0
      document.querySelector(".not-found p").innerText=errorMessage
}


search.addEventListener("click", () => {
  const APIKey = '3fd20e5e2db90f9cc54990028a097e4f';
  const city = document.querySelector(".search-box input").value;
  if (city == "") {
    return;
  }
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`).then(response => response.json()).then(json => {
    if (json.cod == 404) {
      sendError("Oops! Location not found!")
      return;
    }
    wear_container.innerHTML = ""

    const image = document.querySelector(".weather-box img")
    const temperature = document.querySelector(".weather-box .temperature")
    const description = document.querySelector(".weather-box .description")
    const humidity = document.querySelector(".weather-details .humidity span")
    const wind = document.querySelector(".weather-details .wind span")

    container.style.height = "555px";
    container.classList.add("active")
    weatherBox.classList.add("active")
    weatherDetails.classList.add("active")
    error404.classList.remove("active")

    setTimeout(() => {
      container.classList.remove("active")
    }, 2500)

    switch (json.weather[0].main) {
      case 'Clear':
        image.src = "img/clear.png";
        break;
      case 'Rain':
        image.src = "img/rain.png";
        break;
      case 'Snow':
        image.src = "img/snow.png";
        break;
      case 'Clouds':
        image.src = "img/cloud.png";
        break;
      case 'Mist':
        image.src = "img/mist.png";
        break;
      case 'Haze':
        image.src = "img/mist.png";
        break;
      default:
        image.src = "img/cloud.png"

    }
    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}`;
    wind.innerHTML = `${Math.round(json.wind.speed)} m/s`;

    wear_container.style.opacity = 1
    wear_container.style.display = "block"
    const feels_like = Math.round(json.main.feels_like)
    const num_humidity = json.main.humidity
    const wind_speed = Math.round(json.wind.speed)
    const weather_id = json.weather[0].id
    let what_wear = document.createElement("h2")
    let index = getIndex(feels_like, num_humidity, wind_speed, weather_id)
    what_wear.innerText = "What you should wear: "
    what_wear.classList.add("wear_header")
    wear_container.appendChild(what_wear)
    let wear_grid = document.createElement("div")
    wear_grid.classList.add("wear_grid")
    wear_container.appendChild(wear_grid)
    if ((String(weather_id)[0] == 5 | num_humidity > 95) && feels_like > 0 && index < 10) {
      createCard(wear_grid, "Umbrella", "umbrella.svg")
    }
    if (index > 10) {
      createCard(wear_grid, "Sit home", "fire.svg")
    } else if (index > 5) {
      createCard(wear_grid, "T-Shirt", "t-shirt.svg")
      createCard(wear_grid, "Shorts", "shorts.svg")
      createCard(wear_grid, "Sandals", "sandals.svg")
      createCard(wear_grid, "Sunglasses", "sunglass.svg")
    } else if (index > 3) {
      createCard(wear_grid, "Sweater", "sweater.svg")
      createCard(wear_grid, "Jeans", "jeans.svg")
      createCard(wear_grid, "Sneakers", "sneakers.svg")
    } else if (index > 1) {
      createCard(wear_grid, "Coat", "coat.svg")
      createCard(wear_grid, "Sneakers", "sneakers.svg")
    } else if (index < -1) {
      createCard(wear_grid, "Sweater", "sweater.svg")
      createCard(wear_grid, "Winter boots", "warm_boots.svg")
    }
    if (index < -3) {
      createCard(wear_grid, "Sit home", "fire.svg")
    }
    if (index < 3) {
      createCard(wear_grid, "Scarf", "scarf.svg")
      createCard(wear_grid, "Warm hat", "winter_hat.svg")
    }
    if (index < 1) {
      createCard(wear_grid, "Winter jacket", "winter_jacket.svg")
      createCard(wear_grid, "Mittens", "mittens.svg")
    }
    if (index < -3) {
      for (let i of wear_grid.childNodes) {
        i.remove()
      }
      for (let i of wear_grid.childNodes) {
        i.remove()
      }
      for (let i of wear_grid.childNodes) {
        i.remove()
      }
      createCard(wear_grid, "Sit home", "snow.svg")
    }
    
  }).catch(error=>{
    sendError("No internet");
    search.classList.remove("bx-search")
    search.classList.remove("bx")
    search.classList.add("loader")
    search.style.color="gray"
    
  })
})