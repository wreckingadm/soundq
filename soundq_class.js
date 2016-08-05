// SOUNDQ must exist as a singleton
var SOUNDQ = SOUNDQ || {};

// This is mostly indended to be read only
SOUNDQ.core = {
	version: "0.0.1",

	// Default properties
	volume: 1.0,
	duckvolume: 0.85,

	// User capabilities
	webaudio: true,
	supportedtypes: [
		""
	],

	/**
	 * Initialize the SOUNDQ object.
	 */
	init: function() {
		console.log( "Initializing SOUNDQ at version " + this.version );

		//TODO: Determine capabilities
	},

	isPlaying: function() {
		//TODO
	},

	setVolume: function( volume ) {
		this.volume = volume;
	},

	setDuckVolume: function( duckvolume ) {
		this.duckvolume = duckvolume;
	},

	duckAll: function( duck = true ) {
		//TODO
	},

	unDuckAll: function() {
		duckAll( false );
	},

	pauseAll: function( pause = true ) {
		//TODO
	},

	resumeAll: function() {
		pauseAll( false );
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
