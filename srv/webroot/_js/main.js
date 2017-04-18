'use strict'
loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){

		loadjs([
			'https://cdn.rawgit.com/puppetmaster3/smoothState.js/master/deps/riot_compiler.min.js'
			,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'

			,'//cdn.radiantmediatechs.com/rmp/v4/latest/js/rmp.min.js'
			, '/_js/split.js'

			//images
			,'/_js/libJs/jquery.fullpage.min.css'
			,'/_js/libJs/jquery.fullpage.min.js'

			//data
			,'/_js/libJs/jquery.jsForm.min.js'

			], { success: function(){
				console.log('loaded libs')
				startApp()
			}
	})//loadjs
	}//suc
})

function startApp(){
	// READY ///////////////////////////////////////////////////////////
	loadjs.done('ready') // page ready
	setupDrawer()

	SP.ScontentID ='#content-wrapper'
	SP.smoothPg.add(function(typ, $new, delta, $html) {

		if(SP.PRE==typ)  {//start
			console.log('SP',$new)

			pgSplit($('#content-wrapper'), 350 )
			//$('#content-wrapper').fadeTo(100,.2)
			drawerClose()

		}
		if(SP.PAGE==typ)  {//ready
			$(SP.ScontentID).html($new)
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
// sidedrawer ////////////////////////////////////////////////
function setupDrawer() {
	$('#sidedrawer').on('click', drawerClose)
	$('#appbar--brand').on('click', drawerOpen)
	console.log('d set')
}//()
function drawerOpen(px, e) {
	$( '#sidedrawer').css('transform', 'translateX(201px)')
}//()
function drawerClose(e) {
	$( '#sidedrawer').css('transform', 'translateX(0px)')
}//()
