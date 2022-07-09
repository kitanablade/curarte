//AK- HTML- Materialize framework design
$(document).ready(function () {
  $(".slider").slider();
});



/*AK- HTML- Materialize framework design */
$(document).ready(function(){
  $('.slider').slider({
    height : 500, // default - height : 400
       
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

$(document).ready(function(){
  $('.parallax').parallax();
});
$(document).ready(function () {
  $("select").formSelect();
});

$(document).ready(function() {
  $('input#input_text, textarea#textarea2').characterCounter();
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
var userTextInput = "monet";
var aicRequestURL = `https://api.artic.edu/api/v1/artworks/search?q=${userTextInput}`;
//var requestById = "https://api.artic.edu/api/v1/artworks/14598";
var maxResultsDisplay = 5;
var dataLength = 0;

// Get the artworks for the artist
fetch(aicRequestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // We want to limit the number of artwork results returned to 5, but if there are fewer than 5 available,
    // then we'll just display those. This prevents the loop from going out-of-bounds if there aren't 5 works.
    if (data.length < maxResultsDisplay) {
      dataLength = data.length;
    } else {
      dataLength = maxResultsDisplay;
    }
    //TODO: Remove Before Flight: console.log();
    //console.log(data);
    for (let i = 0; i < dataLength; i++) {

      var artworkTitle = data.data[i].title;
      //TODO: Remove Before Flight: console.log();
      console.log(artworkTitle);
      //create element
      var artworkTitleEl = document.createElement("h3");
      //set attribute
      artworkTitleEl.setAttribute("id", "artwork-" + i);
      //append
      //parentDomEl.append(artworkTitleEl);
      var imageId = data.data[i].image_id;
      //TODO: Remove Before Flight: console.log();
      console.log(imageId);
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
