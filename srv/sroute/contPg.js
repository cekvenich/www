const express = require('express')
const router = express.Router()

const Util = require('topseed-util')
const U = new Util() 

const C = require('../config/ServerConfig')
const ServerConfig = new C()

const mailgun = require('mailgun-js')({apiKey: ServerConfig.mapi_key, domain: ServerConfig.mdomain})



// /////////////////////////////////////////////////////
function sendContact(email, msg, phone) {
	const mail = {
		from: 'Excited User <me@samples.mailgun.org>',
		to: 'vicmasons@gmail.com',
		subject: 'web',
		text: msg + '\r\n\r\n' + email + '\r\n\r\n' + phone
	}
	const pro = mailgun.messages().send(mail)
	return pro
}

router.post('/contact', function (req, res) {	
	console.log('contact')
	const dat = req.body
	console.log(dat)
	const pro = sendContact(dat.email, dat.msg, dat.phone)

	pro.then(function (data) {// wait for it to be sent then come back
			//console.log(data)
			var ret = 'OK'
			res.status(200).send(JSON.stringify(ret))
		}, function (err) {
			console.log(err)
			var ret = 'OK'
			res.status(200).send(JSON.stringify(ret))
	})
})

//###################### 
module.exports = router