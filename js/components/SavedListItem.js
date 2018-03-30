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
        console.log(this.article);
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
          <div class="imgHolder">  <img src="${
            this.article.image.thumb
          }" alt=""></div>
           <h4> ${this.article.title}</h4> <a class="delete_btn"></a>
          </li>
    `;
    this.listHolder.insertAdjacentHTML("beforeend", html);
    console.log(this.article.image);
  }
}
