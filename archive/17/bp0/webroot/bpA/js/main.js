'use strict'

loadjs.ready(['dependencyNotChrome', 'keyLibs'], {// loaded setup libs
	success: function(){
	loadjs([
		'https://www.masons-foundation.org/_js/libJs/is.min.js'
		,'//cdn.jsdelivr.net/momentjs/2.17.1/moment.min.js'
		,'https://www.masons-foundation.org/_js/libJs/jquery.popupwindow.js'

		,'//cdn.jsdelivr.net/simplemde/1.11.2/simplemde.min.css'
		,'//cdn.jsdelivr.net/simplemde/1.11.2/simplemde.min.js'

		//dbind:
		,'https://www.masons-foundation.org/_js/libJs/jquery.jsForm.min.js'
		,'//cdn.jsdelivr.net/jquery.datatables/1.10.10/js/jquery.dataTables.min.js'
		,'//cdn.jsdelivr.net/jquery.datatables/1.10.10/css/jquery.dataTables.min.css'

		,'https://www.masons-foundation.org/_js/libJs/js.cookie.min.js'

		], { success: function(){
			console.log('loaded libs')

			startApp()
		}
	})//loadjs
	}//suc
})

var ROOT = 'http://localhost:8080/'

var smoothState

//====================================================================
function startApp(){

	function toggleSide(){
		console.log('tog')
		$('#sidedrawer').toggleClass('active')
	}
	function initSideDraw() {
		setTimeout(function(){
			$('#brand').unbind('click').click(toggleSide)
			$('#sidedrawer').unbind('click').click(toggleSide)
			console.log('initSD')
		}, 200)
	}
	initSideDraw()
	// READY ///////////////////////////////////////////////////////////
	A.loaded=true
	A.act(A.LOADED)

	console.log('v17.02a')
	//>====================================================================
	//SS
	let ssoptions={
		debug: true,
		prefetch: true,
		cacheLength: 3,
		repeatDelay: 450,

		onStart: {
			duration: 0, 
			render: function (url, $container)  {
				//console.log('-> ')
				A.act(A.PRE) //action
				A.inAction=true

				$('#content-wrapper').fadeTo(1000/60,.2)

			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$container.html($newContent)
				$('content-wrapper').fadeTo(1000/30,1)
				initSideDraw()

				A.act(A.PAGE)// main action
				A.inAction= false

				//console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	smoothState = $('#ss1').smoothState(ssoptions)

	var endTime = (new Date()).getTime() - _loadStarted
	console.log('load time ' + endTime)
}//startApp()
//====================================================================

