// ---------------------------------API: MOVIE & WIKI--------------------------------------
// Create a function called `myFunction()`
var myFunction = function () {
  var search = document.querySelector("#searchTerm").value;
  // Make a `fetch` request concatenating that variable to the query URL
  fetch(`http://www.omdbapi.com/?s=${search}&apikey=46b2d125`)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      // Create a variable that will select the <div> where the IMAGE will be displayed
      var container = document.querySelector("#response-container");
      // Empty out the <div> before we append a GIF to it
      container.innerHTML = "";
      var Img = document.createElement("img");

      var i = Math.floor(Math.random() * 10);
      Img.setAttribute("src", response.Search[i].Poster);
      // Append 'Img' to the <div>
      Img.setAttribute("height", 400);
      container.appendChild(Img);

      //------------------WIKI--------------------------

      var title = response.Search[i].Title;
      console.log(title);
      return fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=8&titles=${title}&origin=*`
      );
    })
    .then(function (wikiResponse) {
      return wikiResponse.json();
    })
    .then(function (wikiResponse) {
      console.log(wikiResponse);
      // extract movie description from wiki
      // get and save the page id as variable
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

// Click the button to run myFunction
document.getElementById("searchBtn").onclick = myFunction;
