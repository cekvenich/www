'use strict'
const express = require('express')
const router = express.Router()
const isj = require('is_js')

const Util = require('topseed-util')
const U = new Util()
const MembDS = require('./ds/MembDS')
const membDS = new MembDS()
const AuTho = require('../utils/AuTho')
const A = new AuTho() 
// ========================================
/*	if(isj.empty(dat)||isj.falsy(dat.id)) {
		U.err('no id',res)
		return
	} */

router.post('/login', function (req, res) {	
	_loginLoad(req,res)
})
router.post('/load', function (req, res) {	
	_loginLoad(req,res)
})

function _loginLoad(req,res) {
	const dat = req.body	
	dat.ip = U.getIP(req)
	const bas = req.headers[A.BASIC]
	//const jwt = req.headers.get(A.JWT)
	const auThoPro = A.getAuThoB( bas ) //return role promise

	let authO_
	auThoPro.then(function(authO){
		authO_ = authO
		return membDS.canLogin(authO.email, authO.password, dat.ip)
			}).then(function(row){
				console.log('lL!')
				//res.header(A.JWT , A.freshenToken(authO_))
				res.status(200).send(JSON.stringify(row))

	}).catch(function (er) {
		U.err(er,res)
	})//c

}

router.post('/save', function (req, res) {	
	console.log('save')
	const dat = req.body	
	dat.ip = U.getIP(req)
	const bas = req.headers[A.BASIC]
	console.log(bas)
	//const jwt = req.headers[A.JWT]
	const auThoPro = A.getAuThoB( bas ) //return role promise

	let authO_
	auThoPro.then(function(authO){
		console.log('save?')
		authO_ = authO
		return membDS.save(dat.email, dat, dat.ip, authO)
			}).then(function(authO) {
				console.log('save!')
				//res.header(A.JWT , A.freshenToken(authO))
				res.status(200).send(JSON.stringify('OK'))

	}).catch(function (er) {
		U.err(er,res)
	})//pro

})

router.post('/validate', function (req, res) {	
	const dat = req.body
	dat.ip = U.getIP(req)
	const typedCode = dat.code

	const ERROR = 'did not match'
	if( A.matchEmailedCode(dat.email, typedCode, dat.ip)) {
		return membDS.validatedCodeMark(dat.email, dat.ip)
			.then(function(val){
			console.log('validate!')
				res.status(200).send(JSON.stringify('OK'))
		}).catch(function (er) {
			console.error(er)
			res.statusMessage = ERROR
			res.status(400).end()
		})
	}//if
	else {
		console.log('not ', typedCode)
		res.statusMessage = ERROR
		res.status(400).end()
	}
})

router.post('/signUp', function (req, res) {
	const dat = req.body
	dat.ip = U.getIP(req)
	
	const pro = membDS.signUp(dat.email, dat.password, dat.ip)
	pro.then(function(key){ //inserted
		const FROM = 'vic@masons-foundation.org'

		A.emailCode(FROM, dat.email)

		//console.log(key.id)
		console.log('signUp!')
		const ret = 'OK'
		res.status(200).send(JSON.stringify(ret))
	})
	
	.catch(function (er) { // duplicate email
		console.error(er)
		res.statusMessage = 'Email exists'
		res.status(400).end()
	})//c

})

//###################### 
module.exports = router
