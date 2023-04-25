// SOUNDQ must exist as a singleton
var SOUNDQ = SOUNDQ || {};

//TODO: Move this to a class within the namespace for private variables?
var SoundQ = function()
{

	//TODO
	console.log( "SoundQ created" );
	var version = "0.0.1";

	this.getVersion = function()
	{
		return version;
	};
};

// This is mostly indended to be read only
SOUNDQ.core = {

	// Default properties
	volume: 1.0,
	duckvolume: 0.85,
	pause: false,
	playing: false,

	// User capabilities
	webaudio: true,
	supportedtypes: [
		""
	],

	/**
	 * Initialize the SOUNDQ object.
	 */
	init: function() {
		this.root = new SoundQ();
		console.log( "Initializing SOUNDQ at version " + this.root.getVersion() );

		//TODO: Determine capabilities
	},

	isPlaying: function() {
		return this.playing;
	},

	isPaused: function() {
		return this.pause;
	},

	setDuckVolume: function( duckvolume ) {
		this.duckvolume = duckvolume;
	},

	duckAll: function( duck ) {
		duck = typeof duck !== "undefined" ?  duck : true;

		//TODO
	},

	unDuckAll: function() {
		this.duckAll( false );
	},

	pauseAll: function( pause ) {
		pause = typeof pause !== "undefined" ?  pause : true;
		this.pause = pause;

		//TODO
		console.log( pause );
	},

	resumeAll: function() {
		this.pauseAll( false );
	},

	stopAll: function() {

		//TODO
	},

	fadeIn: function() {

		//TODO
	},

	fadeOut: function() {

		//TODO
	}
};

// Initialize
SOUNDQ.core.init();
