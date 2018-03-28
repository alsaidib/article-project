import SaveComponent from "./components/SaveComponent";
import SearchComponent from "./components/SearchComponent";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyBtxhe8qWTiucHBa26IpValelvO_T-a3Pk",
  authDomain: "articlesearchapp.firebaseapp.com",
  databaseURL: "https://articlesearchapp.firebaseio.com",
  projectId: "articlesearchapp",
  storageBucket: "articlesearchapp.appspot.com",
  messagingSenderId: "719171096333"
};
firebase.initializeApp(config);

const allSavedArticles = [];
const searchHolder = document.getElementById("searchSection");
const saveHolder = document.getElementById("savedSection");

let saveComponent = new SaveComponent(saveHolder, allSavedArticles, firebase);

const searchComponent = new SearchComponent(
  searchHolder,
  allSavedArticles,
  saveComponent,
  firebase
);
