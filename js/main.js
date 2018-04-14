import SaveComponent from "./components/SaveComponent";
import SearchComponent from "./components/SearchComponent";
import OtherComponents from "./components/OtherComponents";
import Slider from "./components/Slider";
import * as firebase from "firebase";
//import * as firebaseui from "firebaseui";
import $ from "jquery";
var popupS = require("popups");

var config = {
  apiKey: "AIzaSyBtxhe8qWTiucHBa26IpValelvO_T-a3Pk",
  authDomain: "articlesearchapp.firebaseapp.com",
  databaseURL: "https://articlesearchapp.firebaseio.com",
  projectId: "articlesearchapp",
  storageBucket: "articlesearchapp.appspot.com",
  messagingSenderId: "719171096333"
};

firebase.initializeApp(config);

// // FirebaseUI config.
// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       //return true;
//       document.getElementById("app").style.display = "block";
//       startApp();
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById("loader").style.display = "none";
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: "popup",
//   signInSuccessUrl: "<url-to-redirect-to-on-success>",
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     //firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID
//     /*,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     ,
//     firebase.auth.PhoneAuthProvider.PROVIDER_ID
//     */
//   ],
//   // Terms of service url.
//   tosUrl: "<your-tos-url>"
// };

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     //lert("allready signed in");
//     $("#firebaseui-auth-container").hide();
//     document.getElementById("app").style.display = "block";
//     startApp();
//   } else {
//     // No user is signed in.
//     alert("not yet signed in");
//   }
// });

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// // The start method will wait until the DOM is loaded.
// ui.start("#firebaseui-auth-container", uiConfig);

// function startApp() {

const allSavedArticles = [];
const weatherHolder = document.getElementById("weather");
const sliderHolder = document.getElementById("sliderHolder");
const saveHolder = document.getElementById("savedSection");
const searchHolder = document.getElementById("searchSection");

let saveComponent = new SaveComponent(saveHolder, allSavedArticles, firebase);
const searchComponent = new SearchComponent(
  searchHolder,
  allSavedArticles,
  saveComponent,
  firebase
);
const slider = new Slider(sliderHolder);
const otherComponents = new OtherComponents(weatherHolder);

////////////////FOOTER///////
document.querySelector("footer").insertAdjacentHTML(
  "beforeend",
  `
    <a target="_blank" href="http://nieuws.vtm.be/binnenland/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Binnenland</a>
    <a target="_blank" href="http://nieuws.vtm.be/politiek/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Politiek</a>
    <a target="_blank" href="http://nieuws.vtm.be/buitenland/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Buitenland</a>
    <a target="_blank" href="http://nieuws.vtm.be/cultuur-media/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Cultuur & Media</a>
    <a target="_blank" href="http://nieuws.vtm.be/moet-je-zien/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Moet je zien!</a>
    <a target="_blank" href="http://nieuws.vtm.be/sport/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Sport</a>
    <a target="_blank" href="http://nieuws.vtm.be/stadion/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Stadion</a>
    <a target="_blank" href="http://nieuws.vtm.be/het-weer/?utm_source=VTMNIEUWS&utm_medium=footer&utm_campaign=instroom">Het Weer</a>
      <a href="#" id="top">Ga Boven</a>
    `
);
// ////////add prevous and next arrows/////////

$("#top").click(function() {
  $("html, body").animate({ scrollTop: $("#headerHolder").offset().top }, 1000);
  return false;
});

// }
