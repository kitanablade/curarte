$(document).ready(function () {
    $(".slider").slider();
  });
  
  
  /*AK- HTML- Materialize framework design */
  $(document).ready(function(){
    $('.slider').slider({
      height : 400, // default - height : 400
         
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
  
  $(document).ready(function(){
    $('.parallax').parallax();
  });
  
  



/*Ak-  */
/*Meme api */
var akartQueryURL = "http://api.harvardartmuseums.org";
const APIEndpoint="https://api.imgflip.com/get_memes";
const PAGE_SIZE = 194;
var info=""
var imageID="";
var title="";


fetch(APIEndpoint)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
       console.log(data);
        
    });
    $(document).ready(function () {
			
        $('#main-logo').click(function(){
           
           $.post('https://api.imgflip.com/caption_image',   // url
           
            {
                "template_id":53076563,
                "username":"akshatak",
                "password":"Akshata@123",
                "text1": "One does not simply",
                
            },
         
        // data to be submit
              function(data, status, jqXHR) {// success callback
               
                       $('#p').append('status: ' + status + ', src: ' + data);
                       console.log(data);
               });
           });
   });
  /* Reddit api 
   var searchTerm = 'museum';

    $.ajax(
        "https://www.reddit.com/subreddits/search.json",
        {
            data: { q: searchTerm },
            success: function(responseData) {
                if (responseData.data.children.length > 0) {
                    console.log('# of results: ' + responseData.data.children.length);
                    $.each(responseData.data.children, function(idx, searchResult) {
                        console.log("--- Title of Subreddit: " + searchResult.data.title);
                    });
                } else {
                    console.log("No subreddits match the search query!");
                }
            },
            error: function() {
                alert("Something didn't work!");
            }
        }
    );

*/

        var eventQueryURL = "https://api.artic.edu/api/v1/events?page=193";
        for(let i=0;i<12;i++)
        {
fetch(eventQueryURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    

    
        info=(data.data[i].description);
        title=data.data[i].program_titles[0];
        imageID=(data.data[i].image_url);
        if((data.data[i].image_url)!=null)
        {

        
        create_card();
    
    
    
            function create_card(){
                let text_card = "";
                text_card+= `<div class="row events-card-data">`
                text_card+=            `<div class="col s12 m12 l12">`
                text_card+=    `<div class="card small horizontal">`
                text_card+=      `<div class="card-image">`
                text_card+=        `<img src=${imageID}>`
                text_card+=      `</div>`
                text_card+=      `<div class="card-stacked">`
                text_card+=        `<div class="card-content">`
                text_card+=        `<h5>`
                text_card+=        `${title}`
                text_card+=        `</h5>`
                text_card+=          `${info}`
                text_card+=        `</div>`
                text_card+=        `<div class="card-action">`
                text_card+=          `<a href="http://www.freetimelearning.com" target="_blank" class="btn blue">Free Time Learn</a>`
                text_card+=         `</div>`
                text_card+=      `</div>`
                text_card+=    `</div>`
                text_card+=`</div>`  
                text_card+=`</div>` 
                $(".events-card").append(text_card);
            }
        }
    
    
    });
    
}