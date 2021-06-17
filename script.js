// ---------------------------------------------FIRST API: MOVIE -------------------------------------
// Create a function called `myFunction()`
var apiFunction = function () {
  var search = document.querySelector("#searchTerm").value;
  // Make a `fetch` request from MOVIE
  fetch(`http://www.omdbapi.com/?s=${search}&apikey=46b2d125`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      // ---------------------------------------------------------------------data 1: movie poster
      var container = document.querySelector("#response-container");
      container.innerHTML = "";
      var Img = document.createElement("img");
      var i = Math.floor(Math.random() * 10);
      Img.setAttribute("src", response.Search[i].Poster);
      Img.setAttribute("height", 400);
      container.appendChild(Img);

      // ---------------------------------------------------------------------data 2: movie title
      var movieTitle = document.querySelector("#movieTitle");
      movieTitle.innerHTML = response.Search[i].Title;

      // ---------------------------------------------------------------------data 3: movie year
      var movieYear = document.querySelector("#movieYear");
      movieYear.innerHTML = response.Search[i].Year;

      // ---------------------------------------------------------------------data 4: movie imdbID
      var movieId = document.querySelector("#movieId");
      movieId.innerHTML = response.Search[i].imdbID;

      //--------------------------------------------SECOND API: WIKIPEDIA------------------------------------
      // get the title from Movie response, and link it to wiki search
      var title = response.Search[i].Title;
      console.log("MOVIE TITLE:" + title);
      // Make a `fetch` request from WIKIPEDIA
      return fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=8&titles=${title}&origin=*`
      );
    })
    .then(function (wikiResponse) {
      return wikiResponse.json();
    })
    .then(function (wikiResponse) {
      console.log(wikiResponse);

      // ---------------------------------------------------------------------data 5: wikipedia description
      // this is tricky, get the pageID in wikipedia using for function
      var pageData = wikiResponse.query.pages;
      var pageKey;
      for (let key in pageData) {
        console.log(key, pageData[key]);
        pageKey = key;
      }
      console.log(wikiResponse.query.pages[pageKey].extract);

      // display the wiki description

      var wikiContainer = document.querySelector("#wikiResponse");
      wikiContainer.innerHTML = "";
      var wikiText = document.createElement("P");

      wikiText.innerHTML = wikiResponse.query.pages[pageKey].extract;

      wikiContainer.append(wikiText);
    });
};

//--------------------------------------------RUN ON WEBSITE LOAD-----------------------------------
var saveList = localStorage.getItem('poster');
if(saveList == null){
  var saveList = [] //Create as empty array if no local storage
  //alert("local storage is empty");
}
else{
  var saveList = [localStorage.getItem('poster')]; //Create local storage as an array
  //alert("local storage has something");
}
alert(saveList);
//--------------------------------------------RUN THE API FUNCTION-----------------------------------
document.getElementById("searchBtn").onclick = apiFunction;
document.getElementById("saveBtn").onclick = posterSave;

//--------------------------------------------RUN ON SAVE-----------------------------------
function posterSave(){
  saveList.push(movieId.innerHTML);
  //alert(saveList.length); //Debug to check the length of the local storage array
  if(saveList.length > 5) saveList.shift();
  alert(saveList[0]);

  //Save movie poster when save button is clicked
  //API to fetch http://www.omdbapi.com/?i=tt0120338
  // fetch(`http://www.omdbapi.com/?i=${saveList[0]}&apikey=46b2d125`)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   });
  //     var containerTwo = document.querySelector("#hearted-movie"); //Figure out where to load this
  //     containerTwo.innerHTML = "";
  //     var ImgTwo = document.createElement("img");
  //     var iTwo = Math.floor(Math.random() * 10);
  //     ImgTwo.setAttribute("src", response.Search[iTwo].Poster);
  //     ImgTwo.setAttribute("height", 400);
  //     containerTwo.appendChild(Img);
  // //End posted display

  localStorage.setItem('poster', saveList);
}
