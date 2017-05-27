'use strict'
loadjs.ready(['polyfills', 'keyLibs'], {// loaded setup libs
	success: function(){
		console.log('loading')
		loadjs([
			//'//cdn.radiantmediatechs.com/rmp/v4/latest/js/rmp.min.js'
			'/_js/vendor/jquery.jsForm.min.js'

			,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'
			, '/_js/split.js'

			//,'/_js/vendor/jquery.fullpage.min.css'
			//,'/_js/vendor/jquery.fullpage.min.js'
			,'//cdn.jsdelivr.net/mediaelement/4.1.0/mediaelement-and-player.min.js'
			,'//cdn.jsdelivr.net/mediaelement/4.1.0/mediaelementplayer.min.css'

			,'//cse.google.com/cse.js?cx=015406677380205718189:esv77diws9e'

			], { success: function(){
				console.log('loaded libs')
				startApp()
			}
	})//loadjs
	}//suc
})

function startApp(){
	// READY ///////////////////////////////////////////////////////////
	TS.signalAppReady()
	
	TT.ScontentID ='#content-wrapper'
	TT.handle(function(evt) {
		console.log(':')
		if(TT.PRE==evt.typ)  {//start
			console.log(evt.$new)
			pgSplit($('#content-wrapper'), 350 )
			//$('#content-wrapper').fadeTo(100,.2)
		}
		if(TT.PAGE==evt.typ)  {//new pg loaded
			$(TT.ScontentID).html(evt.$new)
			//$('#content-wrapper').fadeTo(100,1)

		}
	})

	console.log('started')
}//startApp()

function setupFlick() {

}

// /////////////////////////
function preLImg(arg) { // helper function start loading an image so browser has it ready
	var imag = new Image()
	imag.src = arg
}

