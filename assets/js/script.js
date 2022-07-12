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

// Upon modal load, focus the mouse on the text entry field
$(document).ready(function () {
  $(".modal").modal({
    onOpenEnd: function () {
      $("#modal-srch-txt-field").focus();
    },
  });
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

document.getElementById("modal-form-srch-btn").onclick = artistTitleSearch;

function artistTitleSearch() {
  var userTextInput = document.getElementById("modal-srch-txt-field").value;
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
      //console.log(artWorks);
      for (let i = 0; i < artWorks.data.length; i++) {
        var aicArtPieceApi = artWorks.data[i].api_link;

        const artPieceRequestFields = [
          "date_display",
          "artist_title",
          "image_id",
          "title",
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
            var artworkTitle = artPiece.data.title;
            var dateDisplay = artPiece.data.date_display;
            var artistName = artPiece.data.artist_title;
            var imageId = artPiece.data.image_id;
            var configIii = artPiece.config.iiif_url;

            // img sizing !w,h for best-fit scaling so that w/h are <= requested width and height. dimensions of returned content are calculated to maintain the aspect ratio of the extracted region
            // region=full THEN size=843, THEN rotation=0 THEN quality=default THEN format=png)
            var renderQueryImageURL =
              configIii + "/" + imageId + "/full/843,/0/default.jpg";

            var wikiSearch = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${artworkTitle} ${artistName}&origin=*`;
            fetch(wikiSearch)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                var wikiTitle = data.query.search[0].title;
                var wikiPageSection = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${wikiTitle}&formatversion=2&exsentences=10&exlimit=1&explaintext=1&origin=*`;
                fetch(wikiPageSection)
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (data) {
                    console.log(data);
                    var wikiDescription = data.query.pages[0].extract;
                    console.log(wikiDescription);

                    elementIdNum = i;

                    displayResults(
                      artworkTitle,
                      artistName,
                      dateDisplay,
                      renderQueryImageURL,
                      wikiDescription,
                      elementIdNum
                    );
                  });
              });

            //Ak- Saving the button event to local storage

            $(`#button${i}`).on("click", function () {
              console.log("Ak test");
              var buttonID = `button${i}`;
              var imageID = $(`#image${i}`).attr("src");
              var titleID = $(`#title${i}`).html();
              var artistID = $(`#artist${i}`).html();
              var dateID = $(`#date${i}`).html();
              var wikiDescID = $(`#wikiDesc${i}`).html();
              var lscard_details = [
                buttonID,
                imageID,
                titleID,
                artistID,
                dateID,
                wikiDescID,
              ];
              console.log(lscard_details);
              localStorage.setItem(
                `ls_cardInfo${i}`,
                JSON.stringify(lscard_details)
              );

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

//AK- added vriable i to keep track of dom element ids
//AK- added ids for the dom elements

function displayResults(title, artist, date, image, wikiDesc, elementIdNum) {
  let resultsCard = "";
  resultsCard += `<div class="row events-card-data">`;
  resultsCard += `<div class="col s12 m12 l12">`;
  resultsCard += `<div class="card small horizontal">`;
  resultsCard += `<div class="card-image">`;
  resultsCard += `<img src=${image} id="image${elementIdNum}">`;
  resultsCard += `</div>`;
  resultsCard += `<div class="card-stacked">`;
  resultsCard += `<div class="card-content">`;
  resultsCard += `<h5 id="title${elementIdNum}">`;
  resultsCard += `${title}`;
  resultsCard += `</h5>`;
  resultsCard += `<h5 id="artist${elementIdNum}">`;
  resultsCard += `${artist}`;
  resultsCard += `</h5>`;
  resultsCard += `<h5 id="date${elementIdNum}">`;
  resultsCard += `${date}`;
  resultsCard += `</h5>`;
  resultsCard += `<p id="wikiDesc${elementIdNum}">`;
  resultsCard += `${wikiDesc}`;

  resultsCard += `</p>`;
  resultsCard += `<button class="btn saveBtn col-md-1" id="button${elementIdNum}">`;
  resultsCard += `<strong class="fas fa-save">SAVE TO LIST`;
  resultsCard += `</strong>`;
  resultsCard += `</button>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  $("#results-card-container").append(resultsCard);
}

//AK- Displaying the saved gallery using localstorage varibles
var card_gallery = [];
$("#myCollection").on("click", function () {
  card_gallery = localStorage.getItem(`ls_cardInfo1`);

  //var res1=res.slice(",");
  console.log(card_gallery);

  var res = card_gallery.split(`","`);
  console.log(res[0]);
  console.log(res[1]);
  console.log(res[2]);
  console.log(res[3]);
  console.log(res[4]);
  console.log(res[5]);

  $("#img1").attr("src", res[1]);
  $("#title").html(res[3]);
  $("#info").html(res[2]);
  $("#wikiData").html(res[5]);
});
