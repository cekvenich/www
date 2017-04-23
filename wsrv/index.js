'use strict'
const express = require('express')
const server = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
server.use(bodyParser.json())
server.use(cors())
server.use(compression())

const scribe = require('scribe-js')({ })

const console = process.console
//server.use(scribe.express.logger()) //Log each request for now
server.use('/logs', scribe.webPanel())
const debug = require('debug')('my-app')
debug('oh hi')

const Decider = require('./utils/Decider')
const contPg = require('./sroute/contPg')

// ###################### dynamic data for some pgs here:
server.get('/post/amp0/', function (req, res) {
	const containsWWWW = (req.subdomains.indexOf('www') > -1) //for subdomain
	const isWWWW = (req.query.w == '1') || containsWWWW

	if(isWWWW) //is it SPA/www? 
		fs.readFile('./www/post/amp0/spa.html', 'utf8', function(err, data) {
			res.send(data)
		})
	else { //AMP
		let _people = {people: [{name: 'Jim'}, {name: 'Pedro'}] }
		fs.readFile('./www/post/amp0/amp.html', 'utf8', function(err, data) {
			if (err) throw err
			// js render
			let tmpl = jsrender.templates(data)
			let html2 = tmpl.render( _people )
			res.send(html2)
		})// readfile
	} //else

})//()

//front route: ////////////////
server.use('/contPg', contPg) 

// ###################### static
server.use(Decider.decide)
server.use(express.static('webroot'))

//###################### start the server
const PORT1 = 8080
server.listen(PORT1, '0.0.0.0', function() {
	console.log('App listening on port '+PORT1)
	console.log('Press Ctrl+C to quit.')
})
const PORT2 = 8082
server.listen(PORT2, '0.0.0.0', function() {
	console.log('App listening on port ' +PORT2)
	console.log('Press Ctrl+C to quit.')
})