const Util = require('topseed-util')
const U = new Util() 

const C = require('../config/ServerConfig')
const ServerConfig = new C()


// ###################### middle filter
const ROOT = './' + ServerConfig.WEBROOT
const SPA = 'index.html'
const AMP = 'indexA.html'

function ifError(err, msg, res) {
	if (err)  {
		console.log(msg+': ' + err)
		res.redirect('/index.html')// error - go home
		res.end()
		return true
	} else return false
}

function pugComp(req,res) {
	const pgPath = U.getPath(ROOT,req)
	console.log('requested:'+requestedResource )
	res.header('Content-Type', 'text/html')
	U.cacheQuick(res)
	const html = U.getPug(requestedResource)
	res.send(html)
}

function serveAmp(req) { // should we serve mobile/AMP
	console.log('subs',req.subdomains)
	if (req.socket.localPort == ServerConfig.WWW_PORT) return true
	if (req.socket.localPort == ServerConfig.AMP_PORT) return false
}

//**************** */
exports.decide = function (req, res, next) {
	res.header('X-TimeSent', U.getDt() )
	U.cacheLong(res) // default is long, later we set to quick if needed
	
	//console.log(req.path)

	if (req.path.indexOf('.') > 0 ) { // hasDot?
		//console.log('next')
		next() // it is a static asset, ex: .jpg, .css
	} else { // no dot, it is a path:
		try {

			U.cacheQuick(res)

			console.log(req.socket.localPort)

			res.header('Content-Type', 'text/html')

			const pgPath = U.getPath(ROOT,req)
			const returnAmp = serveAmp(req)

			console.log('amp',returnAmp,'path ',pgPath)

			const requestedResource = pgPath + (returnAmp?AMP:SPA);
			const fallbackResource = pgPath + (returnAmp?SPA:AMP);
			
			//attempt to get the requested version, show the other version if not exists
			if (U.exists(requestedResource)) { 
				//console.log('found '+requestedResource)
				let html = U.getPug(requestedResource)  
				res.status(200).send( html).end()
			} else { //the other version
				let html = U.getPug(fallbackResource) 
				res.status(200).send( html).end()
			}

		} catch(err) {
			ifError(err, 'catch', res)
		}
	} 
}//()
