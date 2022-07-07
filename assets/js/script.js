var artQueryURL = "https://api.artic.edu/api/v1/artworks";
var sampleQueryURL = "https://api.artic.edu/api/v1/artworks/search?q=Pencz";
// fetch(sampleQueryURL)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         console.log(data.data[8].artist_title);
//         console.log(data.data[8].title);
//         //TODO: store "h", "s", "l" in an array, concatenate into a string, then try to turn into something more useful
//         console.log(data.data[8].color.h);
//         console.log(data.data[8].color.s);
//         console.log(data.data[8].color.l);
//         console.log(data.data[8].artwork_type_title);
//         //console.log(data.data[8].technique_titles);
//         //console.log(data.data[8].style_titles);
//         console.log(data.data[8].date_display);
//     })

var artworkTitle = "the starry night";
// var infoQueryURL = ("https://www.mediawiki.org/wiki/Special:MyLanguage/API:Search?srsearch:"+artworkTitle);
//var infoQueryURL = "https://www.mediawiki.org/wiki/Special:MyLanguage/API:Search&api.php?action=query&list=search&srsearch=meaning";
 //var infoQueryURL = "https://www.mediawiki.org/w/api.php?action=query&list=search&srsearch=meaning&format=json&origin=*";
 var infoQueryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=The_Starry_Night&formatversion=2&rvprop=content&rvslots=*&rvsection=summary&origin=*"

fetch(infoQueryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
