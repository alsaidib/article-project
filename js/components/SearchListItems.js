export default class SearchListItems {
  constructor(item, articleListHolder) {
    this.item = item;
    //this.searchHolder = searchHolder;
    this.articleListHolder = articleListHolder;

    this.generateHtml();
  }
  generateHtml() {
    this.articleListHolder.insertAdjacentHTML(
      "beforeend",
      `
        <li class="list-group-item list-group-item-action" search-${
          this.item.fields.entity_id
        } data-id="${this.item.fields.entity_id}" id="search-${
        this.item.fields.entity_id
      }">
            <span>${this.item.title}</span>
           
            <a class="favIcon"></a>
        </li>
      `
    );
  }
}
