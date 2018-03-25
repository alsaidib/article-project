import * as firebase from "firebase";
import SavedListItem from "./SavedListItem";

export default class SaveComponent {
  constructor(saveHolder, allSavedArticles) {
    this.saveHolder = saveHolder;
    this.allSavedArticles = allSavedArticles;
    this.listHolder = "";
    this.FireBaseinitialize();
    this.addHTML();
    //this.setupEvents();
  }

  addHTML() {
    this.saveHolder.insertAdjacentHTML(
      "beforeend",
      `<h1>Saved Article</h1>
      <ul id="listHolder"></ul>
      `
    );
    this.listHolder = document.getElementById("listHolder");
  }
  FireBaseinitialize() {
    var config = {
      apiKey: "AIzaSyBtxhe8qWTiucHBa26IpValelvO_T-a3Pk",
      authDomain: "articlesearchapp.firebaseapp.com",
      databaseURL: "https://articlesearchapp.firebaseio.com",
      projectId: "articlesearchapp",
      storageBucket: "articlesearchapp.appspot.com",
      messagingSenderId: "719171096333"
    };
    firebase.initializeApp(config);

    let ref = firebase.database().ref("savedArticles");

    ref.once("value", snapshot => {
      let returnedObj = snapshot.val();
      for (let prop in returnedObj) {
        this.allSavedArticles.push(returnedObj[prop]);
        let id = returnedObj[prop];
        const savedListtItem = new SavedListItem(id, this.listHolder);
      }
      // console.log(this.allSavedArticles);
    });
  }

  // setupEvents(e) {
  //   document.querySelector(`li`).addEventListener("click", e => {
  //     console.log("hello");
  //   });
  // }
}
