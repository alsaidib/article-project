import axios from "axios";
import SearchListItems from "./SearchListItems";
import SavedListItem from "./SavedListItem";
import * as firebase from "firebase";
import $ from "jquery";
var popupS = require("popups");

export default class SearchComponent {
  constructor(searchHolder, allSavedArticles, saveComponent, firebase) {
    this.searchHolder = searchHolder;
    this.allSavedArticles = allSavedArticles;
    this.saveComponent = saveComponent;
    this.form;
    this.articleListHolder;
    this.generateHTML();
    this.setUpEvents();
  }
  generateHTML() {
    const html = `
      <div id="searcharia">
        <form action="">
          <input type="text" value="" placeholder="Search">
          <input type="submit" value="ZOEK">
        </form>
        
        <ul id="resultListHolder"></ul>
      </div>`;
    this.searchHolder.insertAdjacentHTML("beforeend", html);
    this.form = document.querySelector("form");
    this.articleListHolder = document.getElementById("resultListHolder");

    $("#social-media #search").click(function(e) {
      $("html, body").animate(
        { scrollTop: $("#searcharia").offset().top },
        1000
      );
      return false;
    });
  }

  setUpEvents() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.articleListHolder.addEventListener(
      "click",
      this.addFavorite.bind(this)
    );
    this.articleListHolder.addEventListener(
      "click",
      this.showPopUps.bind(this)
    );
  }

  handleSubmit(e) {
    this.articleListHolder.innerHTML = "";

    e.preventDefault();
    let valuetHolder = this.form.querySelector("input[type=text]").value;

    axios
      .get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${valuetHolder}`
      )
      .then(response => {
        //let numberOfArticles = parseInt(response.total);
        for (const item of response.data.response.items) {
          const searchListItem = new SearchListItems(
            item,
            this.articleListHolder,
            this.allSavedArticles
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  /**********************Pagination********* */

  /***************************Add To Favorite List************************** */
  addFavorite(e) {
    e.preventDefault();

    if (e.target.nodeName == "A") {
      let id = parseInt(e.target.parentElement.dataset.id);
      //console.log(e.target.parentElement.dataset.id);
      if (e.target.classList.contains("favIconActive")) {
        e.target.classList.remove("favIconActive");
        document
          .getElementById("save-" + id)
          .querySelector("a.delete_btn")
          .click(); //make it works dynamiclly
      } else {
        e.target.classList.add("favIconActive");
        new SavedListItem(
          id,
          this.saveComponent.listHolder,
          this.allSavedArticles
        );
        //push id to array

        this.allSavedArticles.push(id);
        firebase
          .database()
          .ref("savedArticles")
          .set(this.allSavedArticles);
      }
    }
  }
  /****************popUps Show****************** */
  showPopUps(e) {
    if (e.target.nodeName == "SPAN") {
      e.stopPropagation();
      const id = e.target.parentElement.dataset.id;

      popupS.window({
        mode: "modal",
        content: "Loading...",
        onOpen: function() {
          axios
            .get(
              "https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=" +
                id
            )
            .then(response => {
              const item = response.data.response.items[0];

              this.$contentEl.innerHTML = `
                    <h1>${item.title}</h1>
                    <img class="articleImg" src="${item.image.medium}">
                    <div>${item.text_html}"</div>
                    <a target="_blank" href="${item.url}">Ga naar de link</a>
                  `;
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    }
  }
}
