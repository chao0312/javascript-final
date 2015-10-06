
var mic, soundFile;
var amplitude;

var prevLevels = new Array(60);
//60
var input;
var analyzer;

// $("#target").click(function() {
//   alert( "Handler for .click() called." );
// });

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  // background(0);
  background(0, 128, 0, 0);
  noStroke();

  rectMode(CENTER);
  colorMode(HSB);

  mic = new p5.AudioIn();
  mic.start();

  // fill(359, 0, 80);
  // text('TELL ME YOUR SECRET.', (windowWidth/2)-60, 200);

  // load the sound, but don't play it yet
  // soundFile = loadSound('try1.mp3')

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
  amplitude.smooth(0.5);
  //0.6
}



function draw() {

  var vol = mic.getLevel();
  // fill(127);
  // stroke(0);
  // var h = map(vol, 0, 1, height, 0);
  // ellipse(width/2, h - 25, 50, 50);
  // background(20, 20);
  // fill(255, 10)
  // text('press t to toggle source', 20, 20);

  var level = amplitude.getLevel();

  // rectangle variables
  var spacing = 10;
  var w = width/ (prevLevels.length * spacing);

  var minHeight = 2;
  var roundness = 20;

  // fill( 359, 85,60);
  // ellipse(windowWidth/2, 150, 40, 40);


  
  // fill( 359, 0,0);
  // text('START',(windowWidth/2)-15, 155);

  // add new level to end of array
  prevLevels.push(level);


  // remove first item in array
  // prevLevels.splice(0, 0.5);

  // loop through all the previous levels
  for (var i = 0; i < prevLevels.length; i++) {

    var x = map(i, prevLevels.length, 0, width/2, width);
    var h = map(prevLevels[i], 0, 0.5, minHeight, height);

    var alphaValue = logMap(i, 0, prevLevels.length, 1, 30);

    var hueValue = map(h, minHeight, height, 1, 80);

    // fill(hueValue, 255, 255, alphaValue);

    fill(359,0, hueValue, 0.3);

    rect(x, height/2, w, h);
    rect(width - x, height/2, w, h);
  }

}

//   var recognizer = new webkitSpeechRecognition();
//   recognizer.lang = "en";
//   recognizer.onresult = function(event) {
//     if (event.results.length > 0) {
//         var result = event.results[event.results.length-1];
//         console.log("It works?!")
//         if(result.isFinal) {
//             console.log(result[0].transcript);
//             $("#target").append(result[0].transcript);
//         }
//     }  
// };

// recognizer.start();




    var annyangScript = document.createElement('script');
      annyangScript.src = "//cdnjs.cloudflare.com/ajax/libs/annyang/2.0.0/annyang.min.js"
    document.write(annyangScript.outerHTML)

    "use strict";
    if (annyang) {
        var face = function(){
          $('#image').hide();
           mic.start();
           console.log("I am listening.");
        };
        var face2 = function(){
          $('#image').height(500);
        };

        var save = function(){
          canvas.toDataURL('image/png');
          console.log("saved!");
        };

var showFlickr = function(tag) {
      $('#flickrGallery').show();
      // $('#flickrLoader p').text('Searching for '+tag).fadeIn('fast');
      var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a9db242cf519b88b2d6ae27b12096e5a&format=json&jsoncallback=jsonFlickrApi&sort=interestingness_desc&per_page=4&size=b&tags=' +tag;
      $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonFlickrApi',
        contentType: "application/json",
        dataType: 'jsonp'
      });

      // scrollTo("#section_image_search");
      console.log("I will give you " + tag);
    };

var showFlickr2 = function(tag) {
      $('#flickrGallery').show();
      // $('#flickrLoader p').text('Searching for '+tag).fadeIn('fast');
      var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a9db242cf519b88b2d6ae27b12096e5a&format=json&jsoncallback=jsonFlickrApi&sort=interestingness_desc&per_page=4&size=b&tags=' +tag;
      $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonFlickrApi2',
        contentType: "application/json",
        dataType: 'jsonp'
      });

      // scrollTo("#section_image_search");
      console.log("ok, but " + tag + "are good.");
    };
     var commands = {
      // 'hello (there)':        hello,

      'i love *search':      showFlickr,
      'i hate *search':      showFlickr2,
      'i have a secret':  face,
      'start over': face2,
      'save the image': save,

      // 'show :type report':    showTPS,
      // 'let\'s get started':   getStarted,
    };

        var jsonFlickrApi = function(results) {
      $('#flickrLoader p').fadeOut('slow');
      var photos = results.photos.photo;
      $.each(photos, function(index, photo) {
        $(document.createElement("img"))
          .attr({ src: '//farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg' })
          .attr('id',function(i){
            return 'pic'+(i+1); 
          })
          .addClass("flickrGallery")
          .appendTo(flickrGallery);
      });
    };

        var jsonFlickrApi2 = function(results) {
      $('#flickrLoader p').fadeOut('slow');
      var photos = results.photos.photo;
      $.each(photos, function(index, photo) {
        $(document.createElement("img"))
          .attr({ src: '//farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_b.jpg' })
          .addClass("flickrGallery2")
          .appendTo(flickrGallery);
      });
    };
    

    annyang.addCommands(commands);
    annyang.setLanguage('en');

    annyang.start();
  } else {
    $(document).ready(function() {
      $('#unsupported').fadeIn('fast');
    });
  }
    