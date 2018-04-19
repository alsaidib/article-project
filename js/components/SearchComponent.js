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
    this.pageNr = 0;
    this.form;
    this.loadMore;
    this.total;
    this.searchValue;
    this.articleListHolder;
    this.generateHTML();
    this.setUpEvents();
  }
  ///////add form to the holder/////
  generateHTML() {
    const html = `
      <div id="searcharia">
        <form id="myForm" action="">
          <input type="text" value="" placeholder="Search">
          <input type="submit" value="ZOEK">
        </form>
        
        <ul id="resultListHolder"></ul>
        <a href="#" id="loadMore">load more</a>
      </div>`;
    this.searchHolder.insertAdjacentHTML("beforeend", html);
    this.form = document.getElementById("myForm");

    this.articleListHolder = document.getElementById("resultListHolder");
    this.loadMore = document.getElementById("loadMore");
    ////////// go to search section from eader//////
    $("#social-media #search").click(function(e) {
      $("html, body").animate(
        {
          scrollTop: $("#searcharia").offset().top
        },
        1000
      );
      return false;
    });
    // const autoSuggest = new AutoSuggest(this.form);
  }
  ////// event submit+ popupShow + pagination//////
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
    this.loadMore.addEventListener("click", this.handlePageNr.bind(this));
  }
  ///////pagination/////
  handlePageNr(e) {
    e.preventDefault();
    this.pageNr++;
    this.getDataAndAddListItems();
    //check if loadMore can be display none?
    if (this.total > 10 * this.pageNr) {
      this.loadMore.style.display = "block";
    } else {
      this.loadMore.style.display = "none";
    }
  }
  /////////submit event////
  handleSubmit(e) {
    e.preventDefault();

    this.articleListHolder.innerHTML = "";

    this.searchValue = this.form
      .querySelector("input[type=text]")
      .value.replace(" ", ",");
    //first initial getting of data (page=1)
    this.getDataAndAddListItems();
  }
  ////////////// requset data from api/////
  getDataAndAddListItems() {
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${
          this.searchValue
        }&page=${this.pageNr}`
      )
      .then(response => {
        //check if loadMore needs to be shwon?
        //check if there is no result there ?
        console.log(response.data.response);
        this.total = response.data.response.total;
        if (this.total != 0) {
          if (this.total > 10) {
            this.loadMore.style.display = "block";
          } else {
            if (this.total < 10) {
              this.loadMore.style.display = "none";
            }
          }
        } else {
          this.loadMore.style.display = "none";
          this.articleListHolder.insertAdjacentHTML(
            "beforeend",
            `<strong>Geen resultaat voor "${this.searchValue}"</strong>`
          );
        }

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
