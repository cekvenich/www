const fs = require('fs')
const gen	= require('./nlib/gen.js')

function _onDone(data, ctx) {
	//console.log(data)
	console.log(data)
	console.log(ctx)

	fs.writeFile(__dirname + ctx, data, function(err) {
		if(err) return console.log(err)
	})
}
function genPug( pug) {
	gen.genPug(__dirname, '/' + pug+'.pug', _onDone, '/' + pug+'.html')
}

// build:
console.log('building:')

//genSass('/www/index.sass',onDone)
//genUg(['/www/some.js', '/www/some2.js' ],onDone)

genPug('index')
genPug('comp/card-rating')
