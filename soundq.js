/*!
 * SoundQ - 
 * Queued audio playback with priority and channel support for the web
 * https://github.com/wreckingadm/soundq-js
 *
 * Copyright 2015 BOXdev.com, wreckreation.org
 */

var SOUNDQ = SOUNDQ || {};


/********************************************************************
 * VARIABLE DECLARATIONS
 */
//TODO


/********************************************************************
 * When the page loads draw our initial script component.
 */
//$( window ).load( function()
$(document).ready( function()
{
   $(document).on("click", "a", function(event) {
      event.preventDefault();
      /*
      var dataUrl = $(this).attr("href");
      if (dataUrl != "") {
         loadPage(dataUrl);
      }
      */
   });



   //http://creativejs.com/resources/web-audio-api-getting-started/
   (function() {
    var context, soundSource, soundBuffer, url = 'src/rl_short.m4a';

    // Step 1 - Initialise the Audio Context
    // There can be only one!

    function init() {
        if (typeof AudioContext !== "undefined") {
            context = new AudioContext();
        } else if (typeof webkitAudioContext !== "undefined") {
            context = new webkitAudioContext();
        } else {
            throw new Error('AudioContext not supported. :(');
        }
    }

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
        soundSource.start(context.currentTime);
    }

    function stopSound() {
        // stop the source now
        soundSource.stop(context.currentTime);
    }

    // Events for the play/stop bottons
   //document.querySelector('.play').addEventListener('click', startSound);
   $( '#audio_webaudio_play' ).click( function() {
      startSound();
   });

    // This is the code we are interested in:
    function audioGraph(audioData) {
        soundSource = context.createBufferSource();
        context.decodeAudioData(audioData, function(soundBuffer){
            soundSource.buffer = soundBuffer;
    
            // Wiring
            soundSource.connect(context.destination);
    
            // Finally
            playSound(soundSource);
        });
    }

    init();


}());




   /*
   var ac;
   try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      ac = new AudioContext();
   }
   catch(e) {
      alert('Web Audio API is not supported in this browser');
   }
   */


   $( '#audio_html5_play' ).click( function() {
      $( '#audio_demo' ).trigger( 'play' );
      //$( '#audio_demo' ).trigger( 'load' );
   });

   $( "#audio_demo" ).bind( "load", function() {
      //$( '#audio_demo' ).trigger( 'play' );
   });
});
