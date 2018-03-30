export default class SearchListItems {
  constructor(item, articleListHolder, allSavedArticles) {
    this.item = item;
    //this.searchHolder = searchHolder;
    this.articleListHolder = articleListHolder;
    this.allSavedArticle = allSavedArticles;
    this.generateHtml();
  }
  generateHtml() {
    this.articleListHolder.insertAdjacentHTML(
      "beforeend",
      `
        <li class="list-group-item list-group-item-action" data-id="${
          this.item.fields.entity_id
        }" id="search-${this.item.fields.entity_id}">
            <span>${this.item.title}</span>

            <a class="favIcon"></a>
        </li>
      `
    );
    //check if this.item.fields.entity_id is inside this.allSavedArticle
    //=> true a add CLass
  }
}
