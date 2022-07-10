//AK- HTML- Materialize framework design
$(document).ready(function () {
  $(".slider").slider();
});

/*AK- HTML- Materialize framework design */
$(document).ready(function () {
  $(".slider").slider({
    height: 500, // default - height : 400
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      $("nav").addClass("red");
    } else {
      $("nav").removeClass("red");
    }
  });
});

$(document).ready(function () {
  $(".modal").modal();
});

$(document).ready(function () {
  $(".sidenav").sidenav();
});

$(document).ready(function () {
  $(".parallax").parallax();
});
$(document).ready(function () {
  $("select").formSelect();
});

$(document).ready(function () {
  $("input#input_text, textarea#textarea2").characterCounter();
});

/*KW- Please add your queries for fuctionalities */
// TODO: Get drop-down selection, and store in a variable. Example:
// var x = document.getElementById("mySelect").value;
// TODO: Use that value in a switch statement to execute the appropriate query
// TODO: Write funcitons for each type of query: artist, artwork title, date, artwork type, predominant color
// TODO: On button click, call the appropriate function with the text the user entered:
// e.g. function getWorksByTitle (title){}
// TODO: Each function should query the Art Institute api, loop through the results, and dynamically generate artwork img DOM elements
// QUESTION: should we limit results? i.e. if we get 100 results for some artist, should we just show 10? 12?
// Answer: Limit results to 5
// TODO: Inside each function, a separate function will query the Wikipedia API, choose the top/best entry, and generate a <p> DOM element

//Replace hard-coded variable with listen event
var userTextInput = "water lilies";
var maxResultsDisplay = 5;
var aicSearchApi = `https://api.artic.edu/api/v1/artworks/search?q=${userTextInput}&limit=${maxResultsDisplay}`;

// Get all the artworks by the artist, or artworks matching artwork title
fetch(aicSearchApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (artWorks) {

    console.log(artWorks);
    for (let i = 0; i < artWorks.data.length; i++) {
      var artworkTitle = artWorks.data[i].title;
      var aicArtPieceApi = artWorks.data[i].api_link;
      
      // Get the data for the individual artworks using the api_link returned from the first request search by artist
      fetch(aicArtPieceApi)
        .then(function (response) {
          return response.json();
        })
        .then(function (artPiece) {
          console.log(artPiece);
          var dateDisplay = artPiece.data.date_display;
          var artistName = artPiece.data.artist_title;
          var imageId = artPiece.data.image_id;

          console.log(`Title: ${artworkTitle}`);
          console.log(`Link: ${aicArtPieceApi}`);
          console.log(`Date: ${dateDisplay}`);
          console.log(`Artist: ${artistName}`);
          console.log(`Image ID: ${imageId}`);
        });
    }
  });

//create element var hourLabel = document.createElement('div');
//set attribute hourLabel.setAttribute("class", "hour-label");
//append parentDomEl.append(hourLabel);

var artworkTitle = "the starry night";

var infoQueryURL =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=The_Starry_Night&formatversion=2&rvprop=content&rvslots=*&rvsection=0&origin=*";
// fetch(infoQueryURL)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     console.log(data.query.pages[0].revisions[0].slots.main.content);
//   });
