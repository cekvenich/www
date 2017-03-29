'use strict'
const express = require('express')
const server = express()

const fs = require('fs')
const bodyParser = require('body-parser')
server.use(bodyParser.json())

const cors = require('cors')
const compression = require('compression')

const Decider = require('./utils/Decider')
const contPg = require('./route/contPg')

server.use(cors())
server.use(compression())

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



