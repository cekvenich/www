'use strict'
loadjs([
	'//code.jquery.com/jquery-2.2.4.min.js'
	,'//www.masons-foundation.org/zCDN/libJs/jquery.smoothState.js'
	,'//cdn.jsdelivr.net/jquery.transit/0.9.12/jquery.transit.min.js'

	//,'//cdn.jsdelivr.net/raphael/2.1.4/raphael-min.js'
	//,'//cdn.jsdelivr.net/jquery.cookie/1.4.1/jquery.cookie.min.js'
	,'//cdn.jsdelivr.net/list.js/1.1.1/list.min.js'
	//,'//cdn.jsdelivr.net/fetch/0.9.0/fetch.min.js'
	,'//cdn.jsdelivr.net/jquery.fullpage/2.8.8/jquery.fullpage.min.js'
	,'//cdn.jsdelivr.net/jquery.fullpage/2.8.9/jquery.fullpage.min.css'

	,'//cdn.jsdelivr.net/jquery.jsform/1.0.5/jquery.jsForm.min.js'
	//,'//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js'
	//,'//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css'
	//,'//cdn.jsdelivr.net/jquery.slick/1.6.0/slick-theme.css'
	,'//www.masons-foundation.org/zCDN/libJs/classypaypal/jquery.classypaypal.js'

	, '/_js/split.js'
	//, '/_js/split.css'

	],  { success: function(){
		console.log('loaded')
		_loaded=true
		_act.dispatch(_LOADED, window.location)

		startApp()
		loadAnalytics()
	}, async: false
})

//====================================================================
function startApp(){
	const $body=$('body')
	$body.fadeTo(20,1)//shell sets it to 0
	_act.dispatch(_ACT, window.location)

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
				_act.dispatch(_PRE, window.location, $container)//*a
				pgSplit($('#content-wrapper'), 450 )
			}//r
		},//onS
		onReady: {
			duration: 0,
			render: function ($container, $newContent) {
				$('#content-wrapper').replaceWith($newContent.last())
				_inAction= false
				_act.dispatch(_ACT, window.location, $newContent)//*a
				//console.log('% <-')
			}//ren
		}//ready()
	}//sso
	
	const smoothState= $('#ss1').smoothState(ssoptions)
}//startApp()

//====================================================================
function loadAnalytics(){

}
