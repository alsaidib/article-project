import axios from "axios";

import $ from "jquery";

export default class OtherComponents {
  constructor(weatherHolder) {
    this.weatherHolder = weatherHolder;
    this.articles;
    this.loadSliderContent();
  }
  /////////////////////////////
  loadSliderContent() {
    axios
      .get(
        `http://api.apixu.com/v1/forecast.json?key=3e498349cdb64cfa88f164857181304&q=antwerp&days=7`
      )
      .then(response => {
        this.articles = response.data;
        console.log(this.articles);
        this.addHTML();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  /////////////////////////////////////
  addHTML() {
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
    this.weatherHolder.insertAdjacentHTML("beforeend", html);

    $("#weatherSection").click(function() {
      $("html, body").animate({ scrollTop: $("#weather").offset().top }, 1000);
      return false;
    });
  }
}
