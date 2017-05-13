'use strict'
const express = require('express')
const router = express.Router()
const isj = require('is_js')

const Util = require('topseed-util')
const U = new Util()
const SiteDS = require('./ds/SiteDS')
const siteDS = new SiteDS()
const AuTho = require('../utils/AuTho')
const A = new AuTho() 
// ========================================

router.post('/save', function (req, res) {	
	const dat = req.body
	dat.ip = U.getIP(req)
	const pro = siteDS.save(dat.siteCode, dat, dat.ip, {} )

	pro.then(function(val){
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})


router.post('/load', function (req, res) {	
	const dat = req.body
	const pro = siteDS.load(dat.siteCode)
	pro.then(function(row){
		res.status(200).send(JSON.stringify(row))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/createSite', function (req, res) {	
	const dat = req.body
	dat.ip = U.getIP(req)
	const siteName = dat.siteName
	const siteCode = SiteDS.makeCode(siteName)

	const pro = siteDS.createSite(siteCode, dat.cheifsEmail, dat)
	pro.then(function(key){
		console.log(key)
		res.status(200).send(JSON.stringify(siteCode))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router
