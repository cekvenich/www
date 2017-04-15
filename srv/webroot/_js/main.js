'use strict'

loadjs.ready(['dependencyIE', 'keyLibs'], {// loaded setup libs
	success: function(){
	loadjs([
		'https://cdn.rawgit.com/topseed/topseed-npm/master/v1/deps/jquery.smoothState.js'
		, 'https://cdn.rawgit.com/topseed/topseed-npm/master/v1/deps/riot_compiler.min.js'

		//dbind:
		,'/_js/libJs/jquery.jsForm.min.js'

		,'/_js/libJs/jquery.fullpage.min.js'
		,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'

		,'//cdn.radiantmediatechs.com/rmp/v4/latest/js/rmp.min.js'
		, '/_js/split.js'

		], { success: function(){
			console.log('loaded libs')
			//Bugsnag.apiKey = 'd69b92d5cad0a35d9ae02d108b071688'
			//Bugsnag.notify('ErrorName', 'Test Error')

			startApp()
		}
	})//loadjs
	}//suc
})

//==========================================================
function startApp(){

	A.loaded=true
	A.act(A.LOADED)

	//>SS==================================================
	var ssoptions={
		debug: true,
		prefetch: true,
		cacheLength: 2,
		repeatDelay: 450,

		onStart: {
			duration: 0, 
			render: function (url, $container)  {
				console.log('-> ')
				A.act(A.PRE) //action
				A.inAction=true

				pgSplit($('#content-wrapper'), 450 )
				$('#content-wrapper').fadeTo(1000/60,.2)

			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$('#content-wrapper').replaceWith($newContent)
				//$container.html($newContent)
				$('content-wrapper').fadeTo(1000/30,1)

				A.act(A.PAGE)// main action
				A.inAction= false
				console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	var smoothState = $('#ss1').smoothState(ssoptions)

	//setupFlick()

	var endTime = (new Date()).getTime() - _loadStarted
	console.log('load time ' + endTime)
}//startApp()
//==========================================================

function setupFlick() {

}