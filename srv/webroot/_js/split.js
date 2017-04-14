'use strict'

console.log('split loaded')
//====================================================================
function pgSplit($cont_, speed) {
	console.log('spliting:')
	$('#content-wrapper').fadeTo(1,.2)//hide
	$('#content-wrapper').fadeTo(speed/2,1)
	//$cont_.css('height', $(document).height())

	// compute endpoints math to split screen
	var haf = $(window).width() / 2
	var he  = $(window).height() + 'px, ' //
	var doub = ' ' +haf*2 + 'px, ' //
	var lft = '-' +haf + 'px '
	haf = haf + 'px'
	var fr = 'rect(0px, ' +haf+', ' +he +' 0px)'
	var cr = 'rect(0px, ' +doub  +he +haf+')'

	//clone, wrap and re-attach
	var $firstSl = $cont_.children()
	$firstSl = $firstSl.clone()
	$firstSl.find().remove('script')//script no work w/ split

	var $cloneSl = $firstSl.clone()
	$('#content-wrapper0').append($firstSl)
	$firstSl.wrapAll('<div id="firstSl" class="firstSl"/>')

	// point to clone and wrap
	$('#content-wrapper0').append($cloneSl)
	$cloneSl.wrapAll('<div id="cloneSl" class="cloneSl"/>')
	$cont_.empty()

	// =============================================================
	//css clip computed
	$('#firstSl').css('clip',fr) // clip it
	$('#firstSl').css('position','absolute')
	$('#firstSl').css('z-index',40)
	$('#firstSl').css('min-height', he)
	$('#firstSl').css('background','gray')

	$('#cloneSl').css('clip',cr)
	$('#cloneSl').css('position','absolute')
	$('#cloneSl').css('z-index',41)
	$('#cloneSl').css('min-height',he)
	$('#cloneSl').css('background','gray')

	$('#content-wrapper0').fadeTo(speed*3,.7)
	$('#firstSl').transition({x: lft, easing: 'linear', duration: speed})
	$('#cloneSl').transition({x: haf, easing: 'linear', duration: speed})
	setTimeout(function(){ 
		console.log(':cleanup')
		$('#content-wrapper0').empty()
		$('#content-wrapper0').fadeTo(1,1)//show
	}, speed)

}//()
