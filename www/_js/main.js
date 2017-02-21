'use strict'

loadjs.ready(['dependencyNotChrome', 'keyLibs'], {// loaded setup libs
	success: function(){
	//console.log('loading libs')
	loadjs([
		//dbind:
		'/_js/libJs/jquery.jsForm.min.js'

		,'/_js/libJs/jquery.fullpage.min.js'
		,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'
		//'//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js'
		//,'/_js/libJs/zingtouch.min.js'

		,'//cdn.radiantmediatechs.com/rmp/v3/latest/js/rmp.min.js'
		, '/_js/split.js'

		], { success: function(){
			console.log('loaded libs')
			startApp()
		}
	})//loadjs
	}//suc
})

//====================================================================
function startApp(){
	
	function toggleSide(){
		console.log('tog')
		var $sidedrawer=$('#sidedrawer')
		$sidedrawer.toggleClass('active')
	}
	function initSideDraw() {
		setTimeout(function(){
			$('#brand').on('click', toggleSide)
			$('#sidedrawer').on('click', toggleSide)
			console.log('initSD')

		}, 200)
	}
	initSideDraw()
	// READY ///////////////////////////////////////////////////////////
	A.loaded=true
	A.act(A.LOADED)

	console.log('v17.021a')
	//>SS======================================================
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

				pgSplit($('#content-wrapper'), 450 )
				$('#content-wrapper').fadeTo(1000/60,.2)

			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$('#content-wrapper').replaceWith($newContent.last())
				//$container.html($newContent)
				$('content-wrapper').fadeTo(1000/30,1)
				initSideDraw()

				A.act(A.PAGE)// main action
				A.inAction= false
				//console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	const smoothState= $('#ss1').smoothState(ssoptions)

	//setupFlick()

	let endTime = (new Date()).getTime() - _loadStarted
	console.log('load time ' + endTime)
}//startApp()
//====================================================================

function setupFlick() {
	console.log('flick')
	var mainEl = document.getElementById('content-wrapper');
	var ztReg1 = new ZingTouch.Region(mainEl)
	ztReg1.bind(mainEl, 'tap', function(sw){
		console.log(sw)
	}, false);

}