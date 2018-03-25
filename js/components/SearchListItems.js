export default class SearchListItems {
  constructor(item, searchHolder, allSavedArticles) {
    this.item = item;
    this.searchHolder = searchHolder;
    this.allSavedArticles = allSavedArticles;

    this.generateHtml();
  }
  generateHtml() {
    this.searchHolder.insertAdjacentHTML(
      "beforeend",
      `
        <li id="data-${this.item.fields.entity_id}">
            <h2>${this.item.title}</h2>
        </li>
      `
    );
  }
}
