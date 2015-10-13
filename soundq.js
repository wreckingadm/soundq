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


   $( '#audio_play' ).click( function() {
      $( '#audio_demo' ).trigger( 'play' );
      //$( '#audio_demo' ).trigger( 'load' );
   });

   $( "#audio_demo" ).bind( "load", function() {
      //$( '#audio_demo' ).trigger( 'play' );
   });
});