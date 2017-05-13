'use strict'

const Emailer = require('../utils/Emailer')
const emailer = new Emailer() 
//

emailer.send('vin@eml.cc', 'vic@eml.cc', 'tst', 'Hi, there, I am sending you a code:', '123', 'Please type it in')
	.then(function(){
		console.log('ok')
	})
