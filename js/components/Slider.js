import axios from "axios";
import Siema from "siema";
import $ from "jquery";

export default class Slider {
  constructor(sliderHolder) {
    this.sliderHolder = sliderHolder;
    this.articles;
    this.imagesLoaded = 0;
    this.loadSliderContent();
  }
  /////////////geting the last news////////////////
  loadSliderContent() {
    axios
      .get(`https://nieuws.vtm.be/feed/articles?format=json`)
      .then(response => {
        this.articles = response.data.response.items;

        this.addHTML();
      })
      .catch(function(error) {});
  }
  //////////////////add siema html///////////////////
  addHTML() {
    let html = "";
    let bullets = "";
    this.sliderHolder.insertAdjacentHTML(
      "beforeend",
      '<div class="siema"></div>'
    );
    this.sliderHolder.insertAdjacentHTML(
      "beforeend",
      `<div class="buttons">
          <a class="left"></a>
          <a class="right"></a>
        </div>`
    );
    ////////// adding bullets//////
    this.sliderHolder.insertAdjacentHTML(
      "beforeend",
      `<div class="bullets"></div>`
    );
    ////////////////////cycle throuw all articles and add html to slider//////////////////////////
    for (let prop in this.articles) {
      html += `<div class="slide" id="slide-${this.articles[prop].id}">
                <a target="_blank" href="${
                  this.articles[prop].url
                }"><img src="${this.articles[prop].image.medium}"/></a>
                <h3>${this.articles[prop].title}</h3>	
                </div>`;
      bullets += `<a href="#" class="bullet"></a>`;
    }
    ///////add to html slider/////////
    this.sliderHolder
      .querySelector(".siema")
      .insertAdjacentHTML("beforeend", html);

    $.each($(".siema div img"), (index, element) => {
      //console.log(index, element);
      element.addEventListener("load", () => {
        this.imagesLoaded++;
        if (this.imagesLoaded == 10) {
          //ALL LOADED
          this.mySiema = new Siema({
            selector: ".siema",
            loop: true,
            duration: 200,
            easing: "ease-in",
            perPage: 1,
            startIndex: 0,
            draggable: true,
            multipleDrag: true,
            threshold: 200,
            rtl: false,
            onInit: () => {},
            onChange: () => {}
          });
          this.mySiema.resizeHandler();
        }
      });
    });

    this.sliderHolder
      .querySelector(".bullets")
      .insertAdjacentHTML("beforeend", bullets);
    /////////Siema ////////
    /*


    setInterval(() => {
      this.mySiema.resizeHandler();
      console.log("resizing");
    }, 3000);
*/
    ////////add prevous and next arrows/////////
    this.sliderHolder.querySelector(".left").addEventListener("click", e => {
      this.mySiema.prev();
      this.updateBullets();
    });
    this.sliderHolder.querySelector(".right").addEventListener("click", e => {
      this.mySiema.next();
      this.updateBullets();
    });

    $(".bullets a").ready(function() {
      $(".bullets a")
        .first()
        .addClass("active");
    });

    $(".bullets a").on("click", e => {
      e.preventDefault();
      $(".bullets a.active").removeClass("active");
      $(e.currentTarget).addClass("active");
      this.mySiema.goTo($(e.currentTarget).index());
    });

    $("#vandaagSection").click(function() {
      $("html, body").animate(
        { scrollTop: $("#sliderBigHolder").offset().top },
        1000
      );
      return false;
    });
  }
  ////////add active class to bullets/////
  updateBullets() {
    $(".bullets a.active").removeClass("active");
    let slideNr = this.mySiema.currentSlide;

    $(".bullets a:nth-child(" + (slideNr + 1) + ")").addClass("active");
  }
}
