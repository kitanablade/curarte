

/*AK- HTML- Materialize framework design */
$(document).ready(function(){
  $('.slider').slider({
    height : 800, // default - height : 400
       
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

$(document).ready(function(){
  $('.modal').modal();
});

$(document).ready(function(){
  $('.sidenav').sidenav();
});
$(document).ready(function(){
  $('.parallax').parallax();
});
$(document).ready(function(){
  $('select').formSelect();
});

/*KW- Please add your queries for fuctionalities */

var artQueryURL = "https://api.artic.edu/api/v1/artworks";
var sampleQueryURL = "https://api.artic.edu/api/v1/artworks/search?q=Pencz"; 
fetch(sampleQueryURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // console.log(data.data[8].artist_title);
        // console.log(data.data[8].title);
        // //TODO: store "h", "s", "l" in an array, concatenate into a string, then try to turn into something more useful
        // console.log(data.data[8].color.h);
        // console.log(data.data[8].color.s);
        // console.log(data.data[8].color.l);
        // console.log(data.data[8].artwork_type_title);
        // //console.log(data.data[8].technique_titles);
        // //console.log(data.data[8].style_titles);
        // console.log(data.data[8].date_display);
    }) 

var infoQueryURL = 

    fetch(artQueryURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {

    })

