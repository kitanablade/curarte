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

$("#modal-srch-txt-field").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    artistTitleSearch();
  }
});
const searchBtn = document.getElementById("modal-form-srch-btn");
// Flip search modal SEARCH/RESET button text and funcitonality
searchBtn.onclick = function () {
  if (searchBtn.innerText === "SEARCH") {
    
    artistTitleSearch();
  } else {
    $("#results-card-container").html("");
    searchBtn.innerText = "SEARCH";
    $("#modal-srch-txt-field").focus();
    document.getElementById("modal-srch-txt-field").value = "";
  }
};

function artistTitleSearch() {
  searchBtn.innerText = "RESET";
  var userTextInput = document.getElementById("modal-srch-txt-field").value;
  const aicSearchRequestFields = ["title", "api_link"];
  saveBtnFlag = true;
  var aicSearchApi = `https://api.artic.edu/api/v1/artworks/search?q=${userTextInput} + [is_public_domain]=true`;
  aicSearchApi = aicSearchApi.concat("&fields=", aicSearchRequestFields);

  // Get all the artworks by the artist, or artworks matching artwork title
  fetch(aicSearchApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (artWorks) {
      if (artWorks.data.length == 0) {
        displayResults(
          (artworkTitle = "We're sorry, there are no results for this search."),
          (artistName = ""),
          (dateDisplay = ""),
          (renderQueryImageURL = "./assets/images/the_scream.jpg"),
          (wikiDescription = ""),
          (elementIdNum = 0),
          (saveBtnFlag = false)
        );
      }
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
  //console.log("Ak test");
  var buttonID = `button-${i}`;
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
  //console.log("ak test"+lscard_details);
  localStorage.setItem(
    `ls_cardInfo${i}`,
    JSON.stringify(lscard_details)
  );
  saveCurrentGallery(i,lscard_details);

 // console.log(JSON.parse(localStorage.getItem("ls_cardInfo")));
});

              
                  });
              });
          });
      }
    });
} // End artistTitleSearch()

//AK- added vriable i to keep track of dom element ids
//AK- added ids for the dom elements

function displayResults(
  title,
  artist,
  date,
  image,
  wikiDesc,
  elementIdNum,
  saveBtnFlag
) {
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
  // Only display the Save To List button if there are results to save
  if (saveBtnFlag) {
    resultsCard += `<button class="btn saveBtn col-md-1" id="button${elementIdNum}">`;
    resultsCard += `<strong class="fas fa-save">ADD TO GALLERY`;
    resultsCard += `</strong>`;
    resultsCard += `</button>`;
  }
  resultsCard += `<p id="wikiDesc${elementIdNum}">`;
  resultsCard += `${wikiDesc}`;
  resultsCard += `</p>`;
  resultsCard += `</h6>`;
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



//AK- Displaying the saved gallery using localstorage varibles
var card_gallery = [];
var dataToSave = [];
var data = [];
var galleryCard = [];

ls_gallery_len=0;

function saveCurrentGallery(i, lscard_details)
{
  
 // console.log("inside the card dis");
//     dataToSave=card_gallery[i];
    galleryCard=lscard_details;
    var resultsCard="";
    resultsCard +=`<div class="col l3 m4 s12" id="card-${i}">`
    resultsCard +=`<div class="card medium sticky-action">`
    resultsCard +=`<div class="card-image waves-effect waves-block waves-light hoverable">`
    resultsCard +=`<img class="activator" id="img1" src="${galleryCard[1]}">`
    resultsCard +=`</div>`
    resultsCard +=`<div class="card-content">`
    resultsCard +=`<span class="card-title activator grey-text text-darken-4" ><i class="material-icons right" >more_vert</i><p id="title">${galleryCard[3]} </p></span>`
    resultsCard +=`<a class="btn-floating halfway-fab waves-effect waves-light red" id="unsave-${i}"><i class="material-icons">favorite</i></a>`
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


//$("#myCollection").on("click", saveGallery());


saveGallery();
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

  ls_gallery_len=card_gallery.length
  //console.log("ak_gallery"+card_gallery.length);
  
  for(var i=0;i<25;i++)
  {

//     dataToSave=card_gallery[i];
    galleryCard=card_gallery[i];
    if(galleryCard!=null)
    {

    var idNum=galleryCard[0].split("-");
   
    var resultsCard="";
    
   
    resultsCard +=`<div class="col l3 m4 s12" id="card-${idNum[1]}">`
    resultsCard +=`<div class="card medium sticky-action" >`
    resultsCard +=`<div class="card-image waves-effect waves-block waves-light hoverable">`
    resultsCard +=`<img class="activator" id="img1" src="${galleryCard[1]}">`
    resultsCard +=`</div>`
    resultsCard +=`<div class="card-content">`
    resultsCard +=`<span class="card-title activator grey-text text-darken-4" ><i class="material-icons right" >more_vert</i><p id="title">${galleryCard[3]} </p></span>`
    resultsCard +=`<a class="btn-floating halfway-fab waves-effect waves-light red" id="unsave-${idNum[1]}"><i class="material-icons">favorite</i></a>`
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
 


}




 $(`.btn-floating`).on("click", function()
 {
   
   console.log("id check ak:");
   //
   var card_id=this.id;
  var id=card_id.split("-");
   console.log("id check ak:"+id);
   location.reload();
   setTimeout(function() { 
   $(`unsave${id[1]}`).removeClass("red");
   $(`#card-${id[1]}`).append(" ");
  }, 5000);
   localStorage.removeItem(`ls_cardInfo${id[1]}`);
  
  
 });
 

 