/*!
 * SoundQ - 
 * Queued audio playback with priority and channel support for the web
 * https://github.com/wreckingadm/soundq-js
 *
 * Copyright 2015 BOXdev.com, wreckreation.org
 */

var SOUNDQ =          SOUNDQ || {};
SOUNDQ.Sound =        SOUNDQ.Sound || {};
//SOUNDQ.Queue =    SOUNDQ.Queue || {};
//SOUNDQ.Channel =  SOUNDQ.Channel || {};


/********************************************************************
 * VARIABLE DECLARATIONS
 */
//GLOBALS
SOUNDQ.useWebAudio = false;
//SOUND
SOUNDQ.Sound.src = [];
SOUNDQ.acontext = null;


/********************************************************************
 * When the page loads draw our initial script component.
 */
$( document ).ready( function()
{
  try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    //window.audioContext = new window.AudioContext();
    SOUNDQ.acontext = new window.AudioContext();
    SOUNDQ.useWebAudio = true;

    //Setup button
    $( '#audio_play' ).text( 'Play Web Audio Sound' );
    $( '#audio_play' ).click( function() {
      console.log( "Playing Web Audio sound." );
      $( '#audio_play' ).text( 'Playing Web Audio Sound' );
      startSound();
      //blastSound.play();
    });

    console.log( "Web Audio API is supported." );
  }
  catch(e) {
    SOUNDQ.useWebAudio = false;

    //Setup button
    $( '#audio_play' ).text( 'Play HTML5 Sound' );
    $( '#audio_play' ).click( function() {
      console.log( "Playing HTML5 sound." );
      $( '#audio_play' ).text( 'Playing HTML5 Sound' );
      $( '#audio_demo' ).trigger( 'play' );
      //$( '#audio_demo' ).trigger( 'load' );
    });

    console.log( "Web Audio API is not supported in this browser. Reverting to HTML5." );
    alert( "Web Audio API is not supported in this browser. Reverting to HTML5." );
  }

  $(document).on("click", "a", function(event) {
    event.preventDefault();
    /*
    var dataUrl = $(this).attr("href");
    if (dataUrl != "") {
      loadPage(dataUrl);
    }
    */
  });
});



//http://creativejs.com/resources/web-audio-api-getting-started/
var soundSource, soundBuffer, url = 'src/rl_short.m4a';
//var blastSound, backgroundMusic;
//blastSound = new WebAudioAPISound("src/rl_short.m4a");

// Step 2: Load our Sound using XHR
function startSound() {
    // Note: this loads asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // Our asynchronous callback
    request.onload = function() {
        var audioData = request.response;

        audioGraph( audioData );
        // Asynchronously decode the audio file data in request.response
        // self.context.decodeAudioData( request.response, function (buffer) {
        //   if (!buffer) {
        //     alert('error decoding file data: ' + url);
        //     return;
        //   }
        //   self.bufferList[url] = buffer;
        // });
    };

    // request.onerror = function () {
    //   alert('BufferLoader: XHR error');
    // };

    request.send();
}

// Finally: tell the source when to start
function playSound() {
    // play the source now
    //TODO: Need to separate loading from playing
    soundSource.start( SOUNDQ.acontext.currentTime );
}

function stopSound() {
    // stop the source now
    soundSource.stop(SOUNDQ.acontext.currentTime);
}

// This is the code we are interested in:
function audioGraph( audioData ) {
    soundSource = SOUNDQ.acontext.createBufferSource();
    SOUNDQ.acontext.decodeAudioData( audioData, function( soundBuffer ){
        soundSource.buffer = soundBuffer;

        // Wiring
        soundSource.connect( SOUNDQ.acontext.destination );

        // Finally
        playSound( soundSource );
    });
}
