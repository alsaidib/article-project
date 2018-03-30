import SavedListItem from "./SavedListItem";
import * as firebase from "firebase";
export default class SaveComponent {
  constructor(saveHolder, allSavedArticles, Firebase) {
    this.saveHolder = saveHolder;
    this.allSavedArticles = allSavedArticles;
    this.firebase = firebase;
    this.listHolder;
    this.addHTML();
    this.FireBaseinitialize();
    this.setupEvents();
  }

  addHTML() {
    this.saveHolder.insertAdjacentHTML(
      "beforeend",
      `<h1>Saved Article</h1>
      <ul id="SavedlistHolder"></ul>
      `
    );
    this.listHolder = document.getElementById("SavedlistHolder");
  }
  FireBaseinitialize() {
    this.firebase
      .database()
      .ref("savedArticles")
      .once("value", snapshot => {
        let returnedObj = snapshot.val();
        for (let prop in returnedObj) {
          this.allSavedArticles.push(returnedObj[prop]);
          let id = returnedObj[prop];
          const savedListtItem = new SavedListItem(id, this.listHolder);
        }
      });
  }

  setupEvents() {
    this.listHolder.addEventListener("click", e => {
      if (e.target.nodeName == "A") {
        //  console.log("del");

        //remove from DOM (li (parent))
        e.target.parentElement.remove();
        //remove from ARRAY  => array.filter

        this.allSavedArticles = this.allSavedArticles.filter(
          item => item != e.target.parentElement.dataset.id
        );
        // console.log(this.allSavedArticles);
        firebase
          .database()
          .ref("savedArticles")
          .set(this.allSavedArticles);
      }

      // if (e.target.nodeType == "LI") {
      //   console.log("popups");
      // }
    });
  }
}
