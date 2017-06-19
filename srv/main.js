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
})

server.listen(ServerConfig.AMP_PORT, '0.0.0.0', function() {
	console.log('App listening on port ' +ServerConfig.AMP_PORT)
})

