import Axios from "axios";
var popupS = require("popups");
export default class SavedListItem {
  constructor(id, listHolder) {
    this.id = id;
    this.listHolder = listHolder;
    this.article = "";
    this.loadContent();
  }
  //////////////firebase articles request get data from api/////
  loadContent() {
    Axios.get(`https://nieuws.vtm.be/feed/articles?format=json&ids=${this.id}`)
      .then(response => {
        this.article = response.data.response.items[0];
        // console.log(this.article);
        this.addHTML();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  ///////// add html list /////
  addHTML() {
    const html = `
          <li class="favIconActive" data-id="${this.article.id}" id="save-${
      this.article.id
    }">
          <div class="savedimgHolder">  <img src="${
            this.article.image.thumb
          }" alt=""></div>
           <h4> ${this.article.title}</h4> <a class="delete_btn"></a>
           <span class="readMore">Lees Meer</span>
          </li>
    `;
    this.listHolder.insertAdjacentHTML("beforeend", html);
  }
}
