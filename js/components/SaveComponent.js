import SavedListItem from "./SavedListItem";
import * as firebase from "firebase";
import axios from "axios";
import $ from "jquery";
require("malihu-custom-scrollbar-plugin")($);
var popupS = require("popups");

export default class SaveComponent {
  constructor(saveHolder, allSavedArticles, firebase) {
    this.saveHolder = saveHolder;
    this.allSavedArticles = allSavedArticles;
    this.firebase = firebase;
    this.listHolder;
    this.addHTML();
    this.FireBaseinitialize();
    this.setupEvents();
  }

  /////add html (list holder-ul-)//////
  addHTML() {
    this.saveHolder.insertAdjacentHTML(
      "beforeend",
      `<ul id="SavedlistHolder"></ul>`
    );
    this.listHolder = document.getElementById("SavedlistHolder");
    ///////////scrollbar////////
    $("#savedSection").mCustomScrollbar({
      theme: "dark-2",
      advanced: { updateOnContentResize: true }
    });
  }
  /////////firebase initialization///////
  FireBaseinitialize() {
    this.firebase
      .database()
      .ref("savedArticles")
      .once("value", snapshot => {
        let returnedObj = snapshot.val();
        for (let prop in returnedObj) {
          this.allSavedArticles.push(returnedObj[prop]);
          const id = returnedObj[prop];
          const savedListtItem = new SavedListItem(id, this.listHolder);
        }
      });
  }
  ////////events delete and remove from firebase and hart from searchcomponent/////
  setupEvents() {
    this.listHolder.addEventListener(
      "click",
      e => {
        //FIRST POSSIBILITY WHEN CLICKING ==> removing
        if (e.target.nodeName == "A") {
          e.preventDefault();

          let idForRemove = parseInt(e.target.parentElement.dataset.id);

          e.target.parentElement.remove();
          let idToSearch = document.getElementById(`fav-${idForRemove}`);

          if (idToSearch) {
            idToSearch.classList.remove("favIconActive");
          }
          //remove from ARRAY  => array.filter
          this.allSavedArticles = this.allSavedArticles.filter(
            item => item != e.target.parentElement.dataset.id
          );

          firebase
            .database()
            .ref("savedArticles")
            .set(this.allSavedArticles);
        }
        //////////open popup/////////
        if (e.target.nodeName == "SPAN") {
          const id = e.target.parentElement.dataset.id;

          popupS.window({
            mode: "modal",
            content: "Loading...",
            onOpen: function() {
              axios
                .get(
                  "https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=" +
                    id
                )
                .then(response => {
                  const item = response.data.response.items[0];

                  this.$contentEl.innerHTML = `
                    <h1>${item.title}</h1>
                    <img class="articleImg" src="${item.image.medium}">
                    <div>${item.text_html}"</div>
                    <a target="_blank" href="${item.url}">Ga naar de link</a>
                  `;
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          });
        }
      },
      true
    );
  }
}
