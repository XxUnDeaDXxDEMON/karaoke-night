// --------------------------------------------------------------------music api ---------------------------

// fetch("https://genius.p.rapidapi.com/artists/16775", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "b0e497f492msha7ee7adc4cd23b7p1a0fc4jsnc897722f093c",
//     "x-rapidapi-host": "genius.p.rapidapi.com",
//   },
// })
//   .then((response) => response.json())
//   .then((response) => {
//     console.log(response);
//   });

// ------------------------------search movie------------------------

// fetch("https://imdb8.p.rapidapi.com/actors/get-all-images?nconst=nm0001667", {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "b0e497f492msha7ee7adc4cd23b7p1a0fc4jsnc897722f093c",
//     "x-rapidapi-host": "imdb8.p.rapidapi.com",
//   },
// })
//   .then(function (result) {
//     return result.json();
//   })
//   .then(function (result) {
//     console.log(result);
//   });

// // ---------------------------------SEARCH MOVIE TITLE--------------------------------------
// Create a function called `myFunction()`
var myFunction = function () {
  var search = document.querySelector("#searchTerm").value;
  // Make a `fetch` request concatenating that variable to the query URL
  // Remember to add your API key at the end
  fetch(`http://www.omdbapi.com/?t=${search}&apikey=46b2d125`)
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
      // var i = Math.floor(Math.random() * 20);
      Img.setAttribute("src", response.Poster);
      // Append 'Img' to the <div>
      Img.setAttribute("height", 400);
      container.appendChild(Img);
      //
    });
};

// Click the button to run myFunction
document.getElementById("searchBtn").onclick = myFunction;

// ---------------------------------SEARCH KEY WORDS--------------------------------------
// Create a function called `myFunction()`
// var myFunction = function () {
//   var search = document.querySelector("#searchTerm").value;
//   // Make a `fetch` request concatenating that variable to the query URL
//   fetch(`http://www.omdbapi.com/?s=${search}&apikey=46b2d125`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       console.log(response);
//       // Create a variable that will select the <div> where the IMAGE will be displayed
//       var container = document.querySelector("#response-container");
//       // Empty out the <div> before we append a GIF to it
//       container.innerHTML = "";
//       var Img = document.createElement("img");
//       var i = Math.floor(Math.random() * 10);
//       Img.setAttribute("src", response.Search[i].Poster);
//       // Append 'Img' to the <div>
//       Img.setAttribute("height", 400);
//       container.appendChild(Img);
//       //
//     });
// };

// // Click the button to run myFunction
// document.getElementById("searchBtn").onclick = myFunction;

// ---------------------------------MOVIE & WIKI--------------------------------------
// Create a function called `myFunction()`
// var myFunction = function () {
//   var search = document.querySelector("#searchTerm").value;
//   // Make a `fetch` request concatenating that variable to the query URL
//   fetch(`http://www.omdbapi.com/?s=${search}&apikey=46b2d125`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (response) {
//       console.log(response);
//       // Create a variable that will select the <div> where the IMAGE will be displayed
//       var container = document.querySelector("#response-container");
//       // Empty out the <div> before we append a GIF to it
//       container.innerHTML = "";
//       var Img = document.createElement("img");
//       var i = Math.floor(Math.random() * 10);
//       Img.setAttribute("src", response.Search[i].Poster);
//       // Append 'Img' to the <div>
//       Img.setAttribute("height", 400);
//       container.appendChild(Img);

//       //------------------WIKI--------------------------

//       var title = response.Search[i].Title;
//       console.log(title);
//       return fetch(
//         "https://api.giphy.com/v1/gifs/search?q=" +
//           title +
//           "&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN"
//       );
//     })
//     .then(function (gifResponse) {
//       return gifResponse.json();
//     })
//     .then(function (gifResponse) {
//       console.log(gifResponse.data[0]);
//       var gifContainer = document.querySelector("#gif-container");
//       gifContainer.innerHTML = "";
//       var gifImg = document.createElement("img");
//       //   var i = Math.floor(Math.random() * 10);
//       gifImg.setAttribute("src", gifResponse.data[0].images.fixed_height.url);
//       console.log(gifImg);
//       // Append 'Img' to the <div>
//       gifImg.setAttribute("height", 400);
//       gifContainer.appendChild(gifImg);
//     });
// };

// // Click the button to run myFunction
// document.getElementById("searchBtn").onclick = myFunction;
