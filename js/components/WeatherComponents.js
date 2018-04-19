import axios from "axios";
import $ from "jquery";

export default class WeatherComponents {
  constructor(weatherHolder) {
    this.weatherHolder = weatherHolder;
    this.articles;
    this.location;
    this.loadLocationContent();
  }
  ////////////getting ip from api/////////////////
  loadLocationContent() {
    axios
      .get(`https://api.ipify.org`)
      .then(response => {
        this.location = response.data;
        this.loadSliderContent();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  ////////weather api requset////////
  loadSliderContent() {
    axios
      .get(
        `https://api.apixu.com/v1/forecast.json?key=3e498349cdb64cfa88f164857181304&q=${
          this.location
        }&days=7&lang=nl`
      )
      .then(response => {
        this.articles = response.data;
        //// add html to weather section ////
        let html = "";
        for (let i = 0; i < 7; i++) {
          html += `
      <div class="weatherForDay">
     <img src="${
       this.articles.forecast.forecastday[`${i}`].day.condition.icon
     }" alt="">
     
     <h4>${this.articles.forecast.forecastday[`${i}`].date}</h4>
      <h3>${this.articles.forecast.forecastday[`${i}`].day.condition.text}</h3>
      </div>`;
        }

        this.weatherHolder.insertAdjacentHTML(
          "beforeend",
          `
    <h2>${this.articles.location.country +
      "- " +
      this.articles.location.name}</h2>
    
    `
        );
        this.weatherHolder.insertAdjacentHTML("beforeend", html);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
