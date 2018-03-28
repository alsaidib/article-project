import Axios from "axios";

export default class SavedListItem {
  constructor(id, listHolder) {
    this.id = id;
    this.listHolder = listHolder;
    this.article = "";
    this.loadContent();
  }

  loadContent() {
    Axios.get(`https://nieuws.vtm.be/feed/articles?format=json&ids=${this.id}`)
      .then(response => {
        this.article = response.data.response.items[0];
        this.addHTML();
      })
      .catch(function(error) {
        console.log(error);
      });

    // axios.get().then(dloduiduidokdogkdpokgdpokgdopk);
  }

  addHTML() {
    const html = `
          <li class="list-group-item list-group-item-action favIconActive" data-id="${
            this.article.id
          }" id="save-${this.article.id}">
            ${this.article.title} - <a class="delete_btn"></a>
          </li>
    `;
    this.listHolder.insertAdjacentHTML("beforeend", html);
  }
}
