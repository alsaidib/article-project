// import $ from "jquery";

export default class SearchListItems {
  constructor(item, articleListHolder, allSavedArticles) {
    this.item = item;
    this.articleListHolder = articleListHolder;
    this.allSavedArticles = allSavedArticles;
    this.generateHtml();
  }
  //////// add html to article list holder////
  generateHtml() {
    this.articleListHolder.insertAdjacentHTML(
      "beforeend",
      ` <li data-id="${this.item.fields.entity_id}" id="search-${
        this.item.fields.entity_id
      }">
       <div class="imgHolder">  <img src="${
         this.item.fields.image_path
       }" alt=""></div>
       <a class="favIcon" id="fav-${this.item.fields.entity_id}"></a>
            <h4>${this.item.title}</h4>
<span class=".readMore">Lees Meer</span>
        </li>
      `
    );

    /*************adding favorite hart if it's already in firebase************** */
    var ckeckStatus = this.check(
      this.allSavedArticles,
      this.item.fields.entity_id
    );
    if (ckeckStatus == true) {
      document
        .getElementById(`fav-${this.item.fields.entity_id}`)
        .classList.add("favIconActive");
    }
  }

  check(arrayToCkeck, idToCkeck) {
    for (let i = 0; i < arrayToCkeck.length; i++) {
      if (arrayToCkeck[i] == idToCkeck) {
        return true;
      }
    }
  }
}
/******* */
