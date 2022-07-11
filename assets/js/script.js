//AK- HTML- Materialize framework design
$(document).ready(function () {
  $(".slider").slider();
});

/*AK- HTML- Materialize framework design */
$(document).ready(function(){
  $('.slider').slider({
    height : 400, // default - height : 400
       
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

document.getElementById("src-modal-btn").addEventListener("click", () => {
  document.getElementById("modal-src-txt-field").focus();
});

var searchBtn = document.getElementById("modal-form-src-btn");
// searchBtn.addEventListener("keyup", function(event){
//   if (event.key === "Enter"){
//     event.preventDefault();
//     document.getElementById("modal-form-src-btn").click();
//   }
// });
searchBtn.onclick = artistTitleSearch;

function artistTitleSearch() {
  var userTextInput = document.getElementById("modal-src-txt-field").value;
  var maxResultsDisplay = 5;
  const aicSearchRequestFields = ["title", "api_link"];

  var aicSearchApi = `https://api.artic.edu/api/v1/artworks/search?q=${userTextInput}&limit=${maxResultsDisplay}`;
  aicSearchApi = aicSearchApi.concat("&fields=", aicSearchRequestFields);

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

        const artPieceRequestFields = [
          "date_display",
          "artist_title",
          "image_id",
        ];
        aicArtPieceApi = aicArtPieceApi.concat(
          "?fields=",
          artPieceRequestFields
        );

        // Get the data for the individual artworks using the api_link returned from the first request search by artist
        fetch(aicArtPieceApi)
          .then(function (response) {
            return response.json();
          })
          .then(function (artPiece) {
            console.log(artPiece);
            var artistName = artPiece.data.artist_title;
            var dateDisplay = artPiece.data.date_display;
            var imageId = artPiece.data.image_id;
            // kristen building image url
            // img sizing !w,h for best-fit scaling so that w/h are <= requested width and height. dimensions of returned content are calculated to maintain the aspect ratio of the extracted region
            // region=full THEN size=843, THEN rotation=0 THEN quality=default THEN format=png)

            // imageID can be located through artQueryURL = data.data[8].image_id
            var imageID = "8534685d-1102-e1e3-e194-94f6e925e8b0";
            //var configIii can be located through artQueryURL = data.config.iiif_url
            var configIii = "https://www.artic.edu/iiif/2";
            var renderQueryImageURL =
              configIii + "/" + imageID + "/full/843,/0/default.jpg";
            console.log(renderQueryImageURL);
            //testing image rendering to card one
            var cardOne = document.querySelector(".activator");
            cardOne.setAttribute("src", renderQueryImageURL);

            displayResults(artworkTitle, artistName,dateDisplay)
            console.log(`Title: ${artworkTitle}`);
            console.log(`Link: ${aicArtPieceApi}`);
            console.log(`Date: ${dateDisplay}`);
            console.log(`Artist: ${artistName}`);
            console.log(`Image ID: ${imageId}`);

            // Append &fields to URL to limit results and speed up the response
          });
      }
    });
} // End artistTitleSearch()


// var eventQueryURL = "https://api.artic.edu/api/v1/events?page=193";
//         for(let i=0;i<12;i++)
//         {
// fetch(eventQueryURL)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         info=(data.data[i].description);
//         title=data.data[i].program_titles[0];
//         imageID=(data.data[i].image_url);
//         if((data.data[i].image_url)!=null)
//         {
//         create_card();
            function displayResults(title, artist, date){
                let resultsCard = "";
                resultsCard+= `<div class="row events-card-data">`
                resultsCard+=            `<div class="col s12 m12 l12">`
                resultsCard+=    `<div class="card small horizontal">`
                // resultsCard+=      `<div class="card-image">`
                // resultsCard+=        `<img src=${image}>`
                // resultsCard+=      `</div>`
                resultsCard+=      `<div class="card-stacked">`
                resultsCard+=        `<div class="card-content">`
                resultsCard+=        `<h5>`
                resultsCard+=        `${title}`
                resultsCard+=        `</h5>`
                resultsCard+=         `<h5>`
                resultsCard+=          `${artist}`
                resultsCard+=        `</h5>`
                resultsCard+=        `<h5>`
                resultsCard+=        `${date}`
                resultsCard+=        `</h5>`
                resultsCard+=         `<h5>`
                resultsCard+=        `</div>`
                // resultsCard+=        `<div class="card-action">`
                // resultsCard+=          `<a href="http://www.freetimelearning.com" target="_blank" class="btn blue">Free Time Learn</a>`
                // resultsCard+=         `</div>`
                resultsCard+=      `</div>`
                resultsCard+=    `</div>`
                resultsCard+=`</div>`
                resultsCard+=`</div>`
                $("#results-card-container").append(resultsCard);
            }

var artworkTitle = "the starry night";

var infoQueryURL =
  "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=The_Starry_Night&formatversion=2&rvprop=content&rvslots=*&rvsection=0&origin=*";
fetch(infoQueryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.query.pages[0].revisions[0].slots.main.content);
  });
