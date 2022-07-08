
//AK- HTML- Materialize framework design
$(document).ready(function () {
  $(".slider").slider();



/*AK- HTML- Materialize framework design */
$(document).ready(function(){
  $('.slider').slider({
    height : 500, // default - height : 400
       
  });
});

$(document).ready(function(){
$(window).scroll(function(){
  if($(window).scrollTop()>300){
    $('nav').addClass('red');
  }else
  {
    $('nav').removeClass('red');
  }
})

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
$(document).ready(function(){
  $('select').formSelect();
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
// TODO: Inside each function, a separate function will query the Wikipedia API, choose the top/best entry, and generate a <p> DOM element


var artQueryURL = "https://api.artic.edu/api/v1/artworks";
var sampleQueryURL = "https://api.artic.edu/api/v1/artworks/search?q=Pencz";
fetch(sampleQueryURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.data[8].artist_title);
        console.log(data.data[8].title);
        //TODO: store "h", "s", "l" in an array, concatenate into a string, then try to turn into something more useful
        console.log(data.data[8].color.h);
        console.log(data.data[8].color.s);
        console.log(data.data[8].color.l);
        console.log(data.data[8].artwork_type_title);
        //console.log(data.data[8].technique_titles);
        //console.log(data.data[8].style_titles);
        console.log(data.data[8].date_display);
    })

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
