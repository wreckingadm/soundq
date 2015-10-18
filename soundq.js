/*!
 * SoundQ - 
 * Queued audio playback with priority and channel support for the web
 * https://github.com/wreckingadm/soundq-js
 *
 * Copyright 2015 BOXdev.com, wreckreation.org
 */

//myApplication || (myApplication = {});
var SOUNDQ =          SOUNDQ || {};
SOUNDQ.Sound =    SOUNDQ.Sound || {};
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
  // Create an Audio Context if Web Audio is supported
  if (typeof AudioContext !== "undefined")
  {
    SOUNDQ.acontext = new AudioContext();
    SOUNDQ.useWebAudio = true;

    console.log( "Web Audio API is supported via AudioContext." );
  }
  else if (typeof webkitAudioContext !== "undefined")
  {
    SOUNDQ.acontext = new webkitAudioContext();
    SOUNDQ.useWebAudio = true;

    console.log( "Web Audio API is supported via webkitAudioContext." );
  }
  else
  {
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
  }

  if ( SOUNDQ.useWebAudio )
  {
    //Setup button
    $( '#audio_play' ).text( 'Play Web Audio Sound' );
    $( '#audio_play' ).click( function() {
      console.log( "Playing Web Audio sound." );
      $( '#audio_play' ).text( 'Playing Web Audio Sound' );
      startSound();
    });
  }
  /*
  try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    SOUNDQ.acontext = new AudioContext();
    SOUNDQ.useWebAudio = true;

    //Setup button
    $( '#audio_play' ).text( 'Play Web Audio Sound' );
    $( '#audio_play' ).click( function() {
      console.log( "Playing Web Audio sound." );
      startSound();
    });

    console.log( "Web Audio API is supported." );
  }
  catch(e) {
    SOUNDQ.useWebAudio = false;

    //Setup button
    $( '#audio_play' ).text( 'Play HTML5 Sound' );
    $( '#audio_play' ).click( function() {
      console.log( "Playing HTML5 sound." );
      $( '#audio_demo' ).trigger( 'play' );
      //$( '#audio_demo' ).trigger( 'load' );
    });

    console.log( "Web Audio API is not supported in this browser. Reverting to HTML5." );
  }
  */

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

  // Step 2: Load our Sound using XHR
  function startSound() {
      // Note: this loads asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      // Our asynchronous callback
      request.onload = function() {
          var audioData = request.response;

          audioGraph(audioData);


      };

      request.send();
  }

  // Finally: tell the source when to start
  function playSound() {
      // play the source now
      soundSource.start(SOUNDQ.acontext.currentTime);
  }

  function stopSound() {
      // stop the source now
      soundSource.stop(SOUNDQ.acontext.currentTime);
  }

  // This is the code we are interested in:
  function audioGraph(audioData) {
      soundSource = SOUNDQ.acontext.createBufferSource();
      SOUNDQ.acontext.decodeAudioData(audioData, function(soundBuffer){
          soundSource.buffer = soundBuffer;

          // Wiring
          soundSource.connect(SOUNDQ.acontext.destination);

          // Finally
          playSound(soundSource);
      });
  }



  
/*
$( '#audio_html5_play' ).click( function() {
  if ( !SOUNDQ.useWebAudio )
  {
    $( '#audio_demo' ).trigger( 'play' );
    //$( '#audio_demo' ).trigger( 'load' );
  }
});

// Events for the play/stop bottons
//document.querySelector('.play').addEventListener('click', startSound);
$( '#audio_webaudio_play' ).click( function() {
  if ( SOUNDQ.useWebAudio )
  {
    startSound();
  }
});

$( "#audio_demo" ).bind( "load", function() {
  //$( '#audio_demo' ).trigger( 'play' );
});
*/
