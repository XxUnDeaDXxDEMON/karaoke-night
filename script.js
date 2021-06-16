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

//--------------------------------------------RUN THE API FUNCTION-----------------------------------
document.getElementById("searchBtn").onclick = apiFunction;
document.getElementById("saveBtn").onclick = posterSave;

// Local Storage
// {
//     $('.saveBtn').click(function () {
//       var mp1 = document.getElementById('1').value;
//       localStorage.setItem('text1', mp1);
//       var mp2 = document.getElementById('2').value;
//       localStorage.setItem('text2', mp2);
//       var mp3 = document.getElementById('3').value;
//       localStorage.setItem('text3', mp3);
//       var mp4 = document.getElementById('4').value;
//       localStorage.setItem('text4', mp4);
//       var mp5 = document.getElementById('5').value;
//       localStorage.setItem('text5', mp5);
//     });
// }

//   // Display Saved Movies
//   var savedMP1 = localStorage.getItem('text1');
//   document.getElementById('1').value = savedMP1;
//   var savedMP2 = localStorage.getItem('text2');
//   document.getElementById('2').value = savedMP2;
//   var savedMP3 = localStorage.getItem('text3');
//   document.getElementById('3').value = savedMP3;
//   var savedMP4 = localStorage.getItem('text4');
//   document.getElementById('4').value = savedMP4;
//   var savedMP5 = localStorage.getItem('text5');
//   document.getElementById('5').value = savedMP5;

// var saveSearch = function(){
//   localStorage.setItem("posters", JSON.stringify(posters));
// }

// var savedPoster = localStorage.getItem()

function posterSave(){
  var poster = document.getElementById('searchTerm').value;
  alert(document.querySelector("#searchTerm").value); //TO REMOVE
  localStorage.setItem('poster', poster);

  //Display Saved
  var savedPoster = localStorage.getItem('poster');
  document.getElementById('poster').value = savedPoster;
  

  

}