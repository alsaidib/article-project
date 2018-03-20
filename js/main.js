import SaveComponent from "./components/SaveComponent";

const allSavedArticles = [];
const inputValue = document.getElementById("inputElement");
//let ArticlesURL = `https://nieuws.vtm.be/feed/articles?format=json&query=${
//inputValue.value;
//}`;
const searchHolder = document.getElementById("searchSection");
const saveHolder = document.getElementById("savedSection");

let saveComponent = new SaveComponent(saveHolder, allSavedArticles);

//var search = new SearchComponent(searchHolder);
