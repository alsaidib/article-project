import axios from "axios";
import SearchListItems from "./SearchListItems";
import SavedListItem from "./SavedListItem";
import * as firebase from "firebase";

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
    const html = `<h1>Search Article</h1>
      <div id="searcharia">
        <form action="">
          <input type="text" value="" class="form-control mr-sm-2">
          <input type="submit" value="Search" class="btn btn-outline-secondary">
        </form>
        <ul></ul>
      </div>`;
    this.searchHolder.insertAdjacentHTML("beforeend", html);
    this.form = document.querySelector("form");
    this.articleListHolder = document.querySelector("ul");
  }

  setUpEvents() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.articleListHolder.addEventListener(
      "click",
      this.addFavorite.bind(this)
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    let valuetHolder = this.form.querySelector("input[type=text]").value;

    axios
      .get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${valuetHolder}`
      )
      .then(response => {
        for (const item of response.data.response.items) {
          const searchListItem = new SearchListItems(
            item,
            this.articleListHolder
          );
          // allSavedArticles
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  addFavorite(e) {
    e.preventDefault();
    let id = parseInt(e.target.parentElement.dataset.id);

    /***************************************************** */

    if (e.target.nodeName == "A") {
      if (e.target.classList.contains("favIconActive")) {
        e.target.classList.remove("favIconActive");
        document.getElementById("save-" + id).click(); //make it works dynamiclly
      } else {
        e.target.classList.add("favIconActive");
        new SavedListItem(id, this.saveComponent.listHolder);
        //push id to array
        console.log(this.allSavedArticles);
        this.allSavedArticles.push(id);
        firebase
          .database()
          .ref("savedArticles")
          .set(this.allSavedArticles);
      }
    } else {
      console.log(error);
    }
  }
}
