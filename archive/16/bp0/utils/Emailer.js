'use strict'
const Config = require('../config/Config')
const C = new Config()

const mapi_key = C.mapi_key
const mdomain = C.mdomain

const mailgun = require('mailgun-js')({apiKey: mapi_key, domain: mdomain})

// /////////////////////////////////////////////////////
class Emailer {

send(from, to_, subject, first, middle, end) {
	const mail = {
		from: from,
		to: to_,
		subject: subject,
		text: first+'\r\n'+ middle+'\r\n'+ end+'\r\n'
	}
	const pro = mailgun.messages().send(mail)
	console.log('sent to ' + to_)
	return pro
}//()

} module.exports = Emailer

