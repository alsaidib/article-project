import Axios from "axios";

export default class SavedListItem {
  constructor(id, listHolder) {
    this.id = id;
    this.listHolder = listHolder;
    this.htmlelement = "";
    //this.addSavedHtml();
    this.loadContent();
  }

  loadContent() {
    Axios.get(`https://nieuws.vtm.be/feed/articles?format=json&ids=${this.id}`)
      .then(response => {
        this.id = response.data.response.items[0].id;
        this.htmlElement = response.data.response.items[0].title;

        this.listHolder.insertAdjacentHTML(
          "beforeend",

          `
          <li>${this.htmlElement} <div class="delete_btn data-${this.id}"></div>
          </li>
                `
        );
        this.htmlelement = "";

        // console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    // axios.get().then(dloduiduidokdogkdpokgdpokgdopk);
  }
}
