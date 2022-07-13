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


var maxResultsDisplay=5;

document.getElementById("modal-form-srch-btn").onclick = artistTitleSearch;

function artistTitleSearch() {
  var userTextInput = document.getElementById("modal-srch-txt-field").value;
 //Ak- changing the scope of maxResultsDisplay variable by moving it outside the function to use the variable in other functions s well
  // var maxResultsDisplay = 5;
  const aicSearchRequestFields = ["title", "api_link"];
  saveBtnFlag = true;

  // Limit search results URL:
  //var aicSearchApi = `https://api.artic.edu/api/v1/artworks/search?q=${userTextInput}&limit=${maxResultsDisplay}`;
  // No-Limit search results URL:
  var aicSearchApi = `https://api.artic.edu/api/v1/artworks/search?q=${userTextInput}`;
  aicSearchApi = aicSearchApi.concat("&fields=", aicSearchRequestFields);

  // Get all the artworks by the artist, or artworks matching artwork title
  fetch(aicSearchApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (artWorks) {
      console.log(artWorks);
      if (artWorks.data.length == 0){
        displayResults(
                      artworkTitle = "We're sorry, there are no results for this search.",
                      artistName = "",
                      dateDisplay = "",
                      renderQueryImageURL = "./assets/images/the_scream.jpg",
                      wikiDescription = "",
                      elementIdNum = 0,
                      saveBtnFlag = false
    )}
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
                    var wikiDescription = data.query.pages[0].extract;
                    elementIdNum = i;

                    displayResults(
                      artworkTitle,
                      artistName,
                      dateDisplay,
                      renderQueryImageURL,
                      wikiDescription,
                      elementIdNum,
                      saveBtnFlag
                    );

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
  console.log("ak test"+lscard_details);
  localStorage.setItem(
    `ls_cardInfo${i}`,
    JSON.stringify(lscard_details)
  );
  saveCurrentGallery(i,lscard_details );

  console.log(JSON.parse(localStorage.getItem("ls_cardInfo")));
});


                  });
              });

           
            // Append &fields to URL to limit results and speed up the response
          });
      }
    });
} // End artistTitleSearch()

//AK- added vriable i to keep track of dom element ids
//AK- added ids for the dom elements

function displayResults(title, artist, date, image, wikiDesc, elementIdNum, saveBtnFlag) {
  // if (imgage==null){
  //   saveBtnFlag = false;
  // }
  let resultsCard = "";
  resultsCard += `<div class="row events-card-data">`;
  resultsCard += `<div class="col s12 m12 l12">`;
  resultsCard += `<div class="card xlarge horizontal">`;
  resultsCard += `<div class="card-image">`;
  resultsCard += `<img src=${image} id="image${elementIdNum}">`;
  resultsCard += `</div>`;
  resultsCard += `<div class="card-stacked">`;
  resultsCard += `<div class="card-content">`;
  resultsCard += `<h5 class="font-weight:bold" id="title${elementIdNum}">`;
  resultsCard += `${title}`;
  resultsCard += `</h5>`;
  resultsCard += `<h6 id="artist${elementIdNum}">`;
  resultsCard += `${artist}`;
  resultsCard += `</h6>`;
  resultsCard += `<h6 id="date${elementIdNum}">`;
  resultsCard += `${date}`;

  resultsCard += `</h5>`;
  resultsCard += `<button class="btn saveBtn col-md-1" id="button${elementIdNum}">`;
  resultsCard += `<strong class="fas fa-save">SAVE TO LIST`;
  resultsCard += `</strong>`;
  resultsCard += `</button>`;
  resultsCard += `<p id="wikiDesc${elementIdNum}">`;
  resultsCard += `${wikiDesc}`;
  resultsCard += `</p>`;
  resultsCard += `</h6>`;
  if (saveBtnFlag){
  }
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  resultsCard += `</div>`;
  $("#results-card-container").append(resultsCard);

  
}


//AK- resetting the gallery

$("#clearbtn").on("click",function()
{
  console.log("inside clear");
  for(var i=0;i<25;i++)
  {
    $("#my_gallery").html("");
  localStorage.removeItem(`ls_cardInfo${i}`);
 
  }
});

$(".lscard2").on("click",function(){
  console.log("id check ak:"+this.id);
});

//AK- Displaying the saved gallery using localstorage varibles
var card_gallery = [];
var dataToSave=[];
var data=[];
var galleryCard= [];



function saveCurrentGallery(i, lscard_details)
{
//     dataToSave=card_gallery[i];
    galleryCard=lscard_details;
    var resultsCard="";
    resultsCard +=`<div class="col l3 m4 s12" id="lscard${i}">`
    resultsCard +=`<div class="card medium sticky-action">`
    resultsCard +=`<div class="card-image waves-effect waves-block waves-light hoverable">`
    resultsCard +=`<img class="activator" id="img1" src="${galleryCard[1]}">`
    resultsCard +=`</div>`
    resultsCard +=`<div class="card-content">`
    resultsCard +=`<span class="card-title activator grey-text text-darken-4" ><i class="material-icons right" >more_vert</i><p id="title">${galleryCard[3]} </p></span>`
    resultsCard +=`<a class="btn-floating halfway-fab waves-effect waves-light red" id="unsave${i}"><i class="material-icons">favorite</i></a>`
    resultsCard +=`<p id="info"><a href="#"></a>${galleryCard[2]}</p>`
    resultsCard +=`</div>`
    resultsCard +=`<div class="card-reveal">`
    resultsCard +=`<span class="card-title grey-text text-darken-4" ><i class="material-icons right">close</i><p id="title"></p></span>`
    resultsCard +=`<p id="wikiData">${galleryCard[5]}</p>`
    resultsCard +=`</div>`
    resultsCard += `</div>`
    resultsCard += `</div>`
    
    $("#my_gallery").append(resultsCard);
  
}


$("#myCollection").on("click", saveGallery());



function saveGallery() {
 
  for(var i=0;i<25;i++)
  {
//console.log(JSON.parse(localStorage.getItem(`ls_cardInfo${i}`)));
       data=JSON.parse(localStorage.getItem(`ls_cardInfo${i}`));
      if(data!=null)
      {
        card_gallery.push(data);

      }
      
  }

  console.log("ak_gallery"+card_gallery);
  
  for(var i=0;i<25;i++)
  {

//     dataToSave=card_gallery[i];
    galleryCard=card_gallery[i];
    var resultsCard="";
    
   
    resultsCard +=`<div class="col l3 m4 s12">`
    resultsCard +=`<div class="card medium sticky-action" id="lscard${i}">`
    resultsCard +=`<div class="card-image waves-effect waves-block waves-light hoverable">`
    resultsCard +=`<img class="activator" id="img1" src="${galleryCard[1]}">`
    resultsCard +=`</div>`
    resultsCard +=`<div class="card-content">`
    resultsCard +=`<span class="card-title activator grey-text text-darken-4" ><i class="material-icons right" >more_vert</i><p id="title">${galleryCard[3]} </p></span>`
    resultsCard +=`<a class="btn-floating halfway-fab waves-effect waves-light red" id="unsave${i}"><i class="material-icons">favorite</i></a>`
    resultsCard +=`<p id="info"><a href="#"></a>${galleryCard[2]}</p>`
    resultsCard +=`</div>`
    resultsCard +=`<div class="card-reveal">`
    resultsCard +=`<span class="card-title grey-text text-darken-4" ><i class="material-icons right">close</i><p id="title"></p></span>`
    resultsCard +=`<p id="wikiData">${galleryCard[5]}</p>`
    resultsCard +=`</div>`
    resultsCard += `</div>`
    resultsCard += `</div>`
    
    $("#my_gallery").append(resultsCard);
  }
 
}

