import axios from "axios";
import SearchListItems from "./SearchListItems";

export default class SearchComponent {
  constructor(searchHolder, allSavedArticles, saveComponent) {
    this.searchHolder = searchHolder;
    this.allSavedArticles = allSavedArticles;
    this.saveComponent = saveComponent;
    this.searchValue;
    this.searchResults;

    this.setUpEvents();
  }

  setUpEvents() {
    this.searchValue = document.querySelector("form");
    this.searchValue.addEventListener("submit", this.handleSubmit.bind(this));
  }

  handleSubmit(e) {
    e.preventDefault();
    let valuetHolder = this.searchValue.querySelector("input[type=text]").value;
    this.searchValue.innerHTML = "";
    axios
      .get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${valuetHolder}`
      )
      .then(response => {
        for (const item of response.data.response.items) {
          const searchListItem = new SearchListItems(
            item,
            this.searchHolder,
            allSavedArticles
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
