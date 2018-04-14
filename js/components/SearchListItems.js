// import $ from "jquery";

export default class SearchListItems {
  constructor(item, articleListHolder, allSavedArticles) {
    this.item = item;
    this.articleListHolder = articleListHolder;
    this.allSavedArticles = allSavedArticles;
    // console.log(this.allSavedArticles);
    this.generateHtml();
  }
  generateHtml() {
    // $("body").css("background-color", "red");
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

    /*************************** */
    var ckeckStatus = this.check(
      this.allSavedArticles,
      this.item.fields.entity_id
    );
    if (ckeckStatus == true) {
      document
        .getElementById(`fav-${this.item.fields.entity_id}`)
        .classList.add("favIconActive");
      // console.log(document.getElementById(`fav-${this.item.fields.entity_id}`));
      // document
      //   .getElementById(`data-id="${this.item.fields.entity_id}"`)
      //   .classList.add("favIconActive");
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
