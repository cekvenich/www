'use strict'

const C = (require('./config/ServerConfig'))
global.ServerConfig = new C();

const express = require('express')
const server = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
server.use(bodyParser.json())
server.use(cors())
server.use(compression())
//const scribe = require('scribe-js')({ })
//const console = process.console
//server.use(scribe.express.logger()) //Log each request for now
//server.use('/logs', scribe.webPanel())
//const debug = require('debug')('my-app')
//debug('oh hi')

//linkBlg ######################, we should use another CDN/port
server.use('/linksPg', require('./scode/route/LinksPg')) 
server.use('/adminPg', require('./scode/route/AdminPg')) 
server.use('/loginPg', require('./scode/route/LoginPg')) 

// ###################### static
const Decider = require('./utils/Decider')
const contPg = require('./sroute/contPg')

//front route: ////////////////
server.use('/contPg', contPg) 

server.use(Decider.decide)
server.use(express.static(ServerConfig.WEBROOT))

//###################### start the server

server.listen(ServerConfig.WWW_PORT, '0.0.0.0', function() {
	console.log('App listening on port '+ServerConfig.WWW_PORT)
	console.log('Press Ctrl+C to quit.')
})

server.listen(ServerConfig.AMP_PORT, '0.0.0.0', function() {
	console.log('App listening on port ' +ServerConfig.AMP_PORT)
	console.log('Press Ctrl+C to quit.')
})