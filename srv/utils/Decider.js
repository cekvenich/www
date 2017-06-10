const fs = require('fs')
const isj = require('is_js')
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

function serveAmp(req) { // should we serve mobile/AMP
	console.log('subs',req.subdomains)
	if (req.socket.localPort == ServerConfig.WWW_PORT) return true
	if (req.socket.localPort == ServerConfig.AMP_PORT) return false
	if (req.subdomains.indexOf(ServerConfig.WEB_SUBDOMAIN) > -1)  return ServerConfig.AMP_IS_LANDING
	if (req.subdomains.indexOf(ServerConfig.AMP_SUBDOMAIN) > -1)  return true
	if (req.query.w == '1') return false
	if (req.query.a == '1') return true
	return ServerConfig.AMP_IS_LANDING
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
			console.log(U.getAgent(req))

			//console.log(agent.toAgent())

			res.header('Content-Type', 'text/html')

			const pgPath = U.getPath(ROOT,req)
			const returnAmp = serveAmp(req)

			console.log('amp',returnAmp,'path ',pgPath)

			const requestedResource = pgPath + (returnAmp?AMP:SPA);
			const fallbackResource = pgPath + (returnAmp?SPA:AMP);
			
			//attempt to get the requested version, show the other version if not exists
			if (fs.existsSync(requestedResource)) { 
				//console.log('found '+requestedResource)
				fs.readFile(requestedResource, 'utf8', function(err, data) {
					ifError(err, returnAmp?'amp':'spa', res)
					res.send(data)
				})// readfile
			} else { //the other version
				fs.readFile(fallbackResource, 'utf8', function(err, data) {
					ifError(err, returnAmp?'spa':'amp', res)
					res.send(data)
				})
			}

		} catch(err) {
			ifError(err, 'catch', res)
		}
	} 
}//()

