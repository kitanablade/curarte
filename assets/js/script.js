//AK- HTML- Materialize framework design
$(document).ready(function () {
  $(".slider").slider();
});

/*AK- HTML- Materialize framework design */
$(document).ready(function () {
  $(".slider").slider({
    height: 400, // default - height : 400
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
document.getElementById("modal-form-src-btn").onclick = artistTitleSearch;

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
        console.log(`Raw Artwork Title: ${artworkTitle}`);
        // Wikipedia version of artworkTitle since the api request requires underscores between search terms
        var wikiArtTitle = artworkTitle.replaceAll(" ", "_");
        console.log(`Fixed Wiki Title: ${wikiArtTitle}`);
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
            var dateDisplay = artPiece.data.date_display;
            var artistName = artPiece.data.artist_title;
            var wikiArtistName = artistName.replaceAll(' ', '_');
            var imageId = artPiece.data.image_id;
            var configIii = artPiece.config.iiif_url;
            // kristen building image url
            // img sizing !w,h for best-fit scaling so that w/h are <= requested width and height. dimensions of returned content are calculated to maintain the aspect ratio of the extracted region
            // region=full THEN size=843, THEN rotation=0 THEN quality=default THEN format=png)

            var renderQueryImageURL =
              configIii + "/" + imageId + "/full/843,/0/default.jpg";

            var infoQueryURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=${artworkTitle}&formatversion=2&rvprop=content&rvslots=*&rvsection=0&origin=*`;
            console.log (`Wikipedia link: ${infoQueryURL}`);
            
            // Defaults to missing, and only gets populated if data is present
            wikiDescription = "WIKIPEDIA DATA MISSING";
            fetch(infoQueryURL)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);
                if (data.query.pages[0].missing === true){
                  console.log(wikiDescription);
                } else {
                  wikiDescription = data.query.pages[0].revisions[0].slots.main.content; 
                console.log(wikiDescription);
              }
              });

            displayResults(
              artworkTitle,
              artistName,
              dateDisplay,
              renderQueryImageURL,
              wikiDescription,i
            );
           
            //Ak- Saving the button event to local storage

  $(`#button${i}`).on("click",  function () {  
    console.log("Ak test");
    var buttonID= (`button${i}`);
    var imageID= $(`#image${i}`).attr("src");
    
    var titleID= $(`#title${i}`).html();
    
    var artistID= $(`#artist${i}`).html();
    var dateID= $(`#date${i}`).html();
    var wikiDescID= $(`#wikiDesc${i}`).html();
    var lscard_details=[buttonID,imageID,titleID,artistID,dateID,wikiDescID];
    console.log(lscard_details);
    localStorage.setItem(`ls_cardInfo${i}`,JSON.stringify(lscard_details));

  console.log(JSON.parse(localStorage.getItem("ls_cardInfo")));
  });

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

//create element var hourLabel = document.createElement('div');
//set attribute hourLabel.setAttribute("class", "hour-label");
//append parentDomEl.append(hourLabel);

//AK- added vriable i to keep track of dom element ids
//AK- added ids for the dom elements

function displayResults(title, artist, date, image, wikiDesc,i) {
  let resultsCard = "";
  resultsCard += `<div class="row events-card-data">`;
  resultsCard += `<div class="col s12 m12 l12">`;
  resultsCard += `<div class="card small horizontal">`;
  resultsCard += `<div class="card-image">`;
  resultsCard += `<img src=${image} id="image${i}">`;
  resultsCard += `</div>`;
  resultsCard += `<div class="card-stacked">`;
  resultsCard += `<div class="card-content">`;
  resultsCard += `<h5 id="title${i}">`;
  resultsCard += `${title}`;
  resultsCard += `</h5>`;
  resultsCard += `<h5 id="artist${i}">`;
  resultsCard += `${artist}`;
  resultsCard += `</h5>`;
  resultsCard += `<h5 id="date${i}">`;
  resultsCard += `${date}`;
  resultsCard += `</h5>`;
  resultsCard += `<p id="wikiDesc${i}">`;
  resultsCard += `${wikiDesc}`;
  resultsCard += `</p>`;
  resultsCard += `<button class="btn saveBtn col-md-1" id="button${i}">`;
  resultsCard += `<strong class="fas fa-save">SAVE TO LIST`;
  resultsCard += `</strong>`;
  resultsCard += `</button>`;
  resultsCard += `</div>`;
  // resultsCard+=        `<div class="card-action">`
  // resultsCard+=          `<a href="http://www.freetimelearning.com" target="_blank" class="btn blue">Free Time Learn</a>`
  // resultsCard+=         `</div>`
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  $("#results-card-container").append(resultsCard);


  
}
  

//AK- Displaying the saved gallery using localstorage varibles
var card_gallery=[];
$("#myCollection").on("click",function(){
  

      card_gallery =localStorage.getItem(`ls_cardInfo1`);

   
   //var res1=res.slice(",");
   console.log(card_gallery);

   var res=card_gallery.split(`","`);
   console.log(res[0]);
   console.log(res[1]);
   console.log(res[2]);
   console.log(res[3]);
   console.log(res[4]);
   console.log(res[5]);
   

   $("#img1").attr('src',res[1]); 
   $("#title").html(res[3]); 
   $("#info").html(res[2]); 
   $("#wikiData").html(res[5]); 
  
  
});
