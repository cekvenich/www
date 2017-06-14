'use strict'

const express = require('express')
const sserver = express()
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
// ========================================


sserver.use(compression())
// ========================================

const DF = require('./sroute/DynamicFilter') // catch all
sserver.use(DF.filter)
sserver.use(express.static('web')) 

// ========================================
//admin:
sserver.use(bodyParser.json())
sserver.use(cors())

const RM = require('./sroute/RmPg') 
const SITE =require('./sroute/SitePg') 
const CONTENT =require('./sroute/ContentPg') 
const RMA =require('./sroute/RmAPg') 
// //

sserver.use('/RM', RM) 
sserver.use('/SITE', SITE) 
sserver.use('/CONTENT', CONTENT) 
sserver.use('/RMA', RMA) 
//###################### start the server

const PORT = 8080
sserver.listen(PORT, '0.0.0.0', function() {
	console.log('App listening on port '+PORT)
})

 
