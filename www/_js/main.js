'use strict'

loadjs.ready(['dependencyNotChrome', 'keyLibs'], {// loaded setup libs
	success: function(){
	console.log('loading libs')
	loadjs([
		//dbind:
		'/zCDN/libJs/jquery.jsForm.min.js'
		,'/zCDN/libJs/jsrender.min.js'

		,'/zCDN/libJs/jquery.fullpage.min.js'
		,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'
		//'//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js'
		//,'/zCDN/libJs/zingtouch.min.js'

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
	$('#navPrev').click(function(e) { 
		console.log('#navPrev')
		toggleSide()
	})

	var $body=$('body')
	$body.fadeTo(20,1)//shell sets it to 0
	_stateA.dispatch(_PAGE, window.location)

	//>===============================================================
	function toggleSide(){
		console.log('tog')
		var $sidedrawer=$('#sidedrawer')
		$sidedrawer.toggleClass('active')
	}
	function initSideDraw() {
		console.log('initSD')
		setTimeout(function(){
			$('#brand').on('click', toggleSide)
			$('#sidedrawer').on('click', toggleSide)
		}, 200)
	}
	initSideDraw()

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
				_inAction=true
				//console.log('-> ')
				_stateA.dispatch(_PRE, window.location, $container)//*a
				pgSplit($('#content-wrapper'), 450 )
				//$('#content-wrapper').fadeTo(100,.2)

			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$('#content-wrapper').replaceWith($newContent.last())
				//$('#content-wrapper').fadeTo(200,1)

				_inAction= false
				_stateA.dispatch(_stateA, window.location, $newContent)//*a
				//console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	const smoothState= $('#ss1').smoothState(ssoptions)

	//setupFlick()
	// READY ///////////////////////////////////////////////////////////
	_loaded=true
	_stateA.dispatch(_LOADED, window.location)

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