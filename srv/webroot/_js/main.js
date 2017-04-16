'use strict'
loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){

		loadjs.done('ready') // page ready

		loadjs([
			
			'https://cdn.rawgit.com/topseed/topseed-npm/master/v1/deps/riot_compiler.min.js'
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
	loadjs.done('main')

	sP.ScontentID ='#content-wrapper'
	sP.smoothPg.add(function(typ, $new, delta, $html) {
		console.log(typ)

		if(sP.PRE==typ)  {//start
			console.log($new)
			pgSplit($('#content-wrapper'), 450 )
			//$('#content-wrapper').fadeTo(100,.2)

		}
		if(sP.PAGE==typ)  {//ready
			$(sP.ScontentID).html($new)
			//$('#content-wrapper').fadeTo(100,1)

		}

	})

}//startApp()


function setupFlick() {

}