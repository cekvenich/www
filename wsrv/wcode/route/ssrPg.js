'use strict'
const express = require('express')
const router = express.Router()
const Util = require('topseed-util')

const BLXA = require('./ssrBLXAction')
const BL = new BLXA()

//###################### 

router.get('/', function (req, res) {	
	console.log('ssr')

	BL.renderPage(req)
		.then(function (html) {
			res.status(200).send(html)
		})

})//get



//###################### 
module.exports = router