import axios from "axios";
import Siema from "siema";
import $ from "jquery";

export default class Slider {
  constructor(sliderHolder) {
    this.sliderHolder = sliderHolder;
    this.articles;
    this.loadSliderContent();
  }
  /////////////////////////////
  loadSliderContent() {
    axios
      .get(`https://nieuws.vtm.be/feed/articles?format=json`)
      .then(response => {
        this.articles = response.data.response.items;
        //console.log(this.article);
        this.addHTML();
      })
      .catch(function(error) {
        // console.log(error);
      });
  }
  /////////////////////////////////////
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
    this.sliderHolder.insertAdjacentHTML(
      "beforeend",
      `<div class="bullets"></div>`
    );
    ////////////////////cycle throuw all articles and add html to slider//////////////////////////
    for (let prop in this.articles) {
      html += `
               <div class="slide" id="${this.articles[prop].id}">
                <a target="_blank" href="${
                  this.articles[prop].url
                }"> <img src="${this.articles[prop].image.full}"/></a>
                <h3>${this.articles[prop].title}</h3>	
                
                </div>
       `;
      bullets += `<a href="#" class="bullet"></a>`;
    }
    ///////add to html slider/////////
    this.sliderHolder
      .querySelector(".siema")
      .insertAdjacentHTML("beforeend", html);

    this.sliderHolder
      .querySelector(".bullets")
      .insertAdjacentHTML("beforeend", bullets);

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
      loop: false,
      rtl: false,
      onInit: () => {},
      onChange: () => {}
    });
    ////////add prevous and next arrows/////////
    this.sliderHolder
      .querySelector(".left")
      .addEventListener("click", () => this.mySiema.prev());
    this.sliderHolder
      .querySelector(".right")
      .addEventListener("click", () => this.mySiema.next());

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
    // this.setupEvents();
    $("#vandaagSection").click(function() {
      $("html, body").animate(
        { scrollTop: $("#sliderBigHolder").offset().top },
        1000
      );
      return false;
    });
  }

  /*
  setupEvents() {
    class SiemaWithDots extends Siema {
      addDots() {
        this.dots = document.createElement("div");
        this.dots.classList.add("dots");

        for (let i = 0; i < this.innerElements.length; i++) {
          const dot = document.createElement("button");

          dot.classList.add("dots__item");

          dot.addEventListener("click", () => {
            this.goTo(i);
          });

          this.dots.appendChild(dot);
        }

        this.selector.parentNode.insertBefore(
          this.dots,
          this.selector.nextSibling
        );
      }

      updateDots() {
        for (let i = 0; i < this.dots.querySelectorAll("button").length; i++) {
          const addOrRemove = this.currentSlide === i ? "add" : "remove";
          this.dots
            .querySelectorAll("button")
            [i].classList[addOrRemove]("dots__item--active");
        }
      }
    }

    const mySiemaWithDots = new SiemaWithDots({
      onInit: function() {
        this.addDots();
        this.updateDots();
      },
      onChange: function() {
        this.updateDots();
      }
    });
  }
  */
}
