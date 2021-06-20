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
      Img.setAttribute("height", "800px");
      Img.setAttribute("width", "800px");
      Img.setAttribute("id", "imagePoster");
      container.appendChild(Img);
      // ---------------------------------------------------------------------data 2: movie title
      var movieTitle = document.querySelector("#movieTitle");
      movieTitle.innerHTML = "Movie Title: " + response.Search[i].Title;
      // ---------------------------------------------------------------------data 3: movie year
      var movieYear = document.querySelector("#movieYear");
      movieYear.innerHTML = "Year: " + response.Search[i].Year;
      // ---------------------------------------------------------------------data 4: movie imdbID
      var movieId = document.querySelector("#movieId");
      movieId.innerHTML = "IMDb ID: " + response.Search[i].imdbID;
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
var saveList = localStorage.getItem("poster");
if (saveList == null) {
  saveList = []; //Create as empty array if no local storage
  //alert("local storage is empty");
} else {
  saveList = JSON.parse(localStorage.getItem("poster")); //Create local storage as an array
  //alert("local storage has something");
}
//alert(saveList);
//--------------------------------------------RUN THE API FUNCTION-----------------------------------
document.getElementById("searchBtn").onclick = apiFunction;
document.getElementById("saveBtn").onclick = posterSave;
//--------------------------------------------RUN ON SAVE----------------------------------
function posterSave() {
  var imgNode = document.getElementById("imagePoster");
  var imgSource = imgNode.getAttribute("src");
  console.log(imgSource);
  var obj = {
    id: movieId.innerHTML,
    img: imgSource,
  };
  saveList.push(obj);
  //alert(saveList.length); //Debug to check the length of the local storage array
  if (saveList.length > 5) saveList.shift();
  //alert(saveList[0]);
  localStorage.setItem("poster", JSON.stringify(saveList));
  var containerTwo = document.querySelector("#hearted-movie"); //Figure out where to load this
  //containerTwo.innerHTML = "";
  var ImgTwo = document.createElement("img");
  //var iTwo = Math.floor(Math.random() * response.Search.length);
  ImgTwo.setAttribute("src", imgSource);
  ImgTwo.setAttribute("height", "200px");
  ImgTwo.setAttribute("width", "200px");
  ImgTwo.setAttribute("margin", "10px");

  containerTwo.appendChild(ImgTwo);
  //Save movie poster when save button is clicked
  // // API to fetch http://www.omdbapi.com/?i=tt0120338
  return;
  // fetch(`http://www.omdbapi.com/?i=${saveList[0]}&apikey=46b2d125`)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     var containerTwo = document.querySelector("#hearted-movie"); //Figure out where to load this
  //     containerTwo.innerHTML = "";
  //     var ImgTwo = document.createElement("img");
  //     var iTwo = Math.floor(Math.random() * response.Search.length);
  //     ImgTwo.setAttribute("src", response.Search[iTwo].Poster);
  //     ImgTwo.setAttribute("height", 400);
  //     containerTwo.appendChild(ImgTwo);
  //     //End posted display
  //   });
}
function displayPoster() {
  var saveList = localStorage.getItem("poster");
  if (saveList == null) {
    saveList = []; //Create as empty array if no local storage
    //alert("local storage is empty");
  } else {
    saveList = JSON.parse(localStorage.getItem("poster")); //Create local storage as an array
    //alert("local storage has something");
  }
  var hearted = document.getElementById("hearted-movie");
  for (let i = 0; i < saveList.length; i++) {
    var div = document.createElement("div");
    var savedItem = saveList[i];
    var img = document.createElement("img");
    img.setAttribute("src", savedItem.img);
    img.setAttribute("alt", savedItem.id);
    div.appendChild(img);

    //while (hearted.firstChild) {
    //hearted.removeChild(hearted.firstChild);
    //}
    //for (let saveList of lastSearches) {
    //var img = document.createElement("img");
    /* var btn = document.createElement("button");
    btn.innerHTML = "remove";
    btn.setAttribute("data-id", i);
    btn.addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-id");
      console.log(id);
      saveList.splice(id, 1);
      localStorage;
    });
    div.appendChild(btn);
    //()=> shedule this function
    //elem.addEventListener("click", () => displayPoster(saveList));
    //button.appendChild(elem);
    //
    hearted.appendChild(div);
    // }
  }*/
    if (saveList.length > 0) {
      var resetBtn = document.createElement("button");
      resetBtn.innerHTML = "clear history";
      resetBtn.addEventListener("click", function () {
        localStorage.removeItem("poster");
        hearted.innerHTML = "";
        resetBtn.classList = "resetBtn";
      });
      hearted.appendChild(resetBtn);
    }
  }
}
displayPoster();
