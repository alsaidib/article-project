import SaveComponent from "./components/SaveComponent";
import SearchComponent from "./components/SearchComponent";
const allSavedArticles = [];

const searchHolder = document.getElementById("searchSection");
const saveHolder = document.getElementById("savedSection");

let saveComponent = new SaveComponent(saveHolder, allSavedArticles);
const inputValue = document.querySelector("input[type=text]").value;

const searchComponent = new SearchComponent(
  searchHolder,
  allSavedArticles,
  saveComponent
);
