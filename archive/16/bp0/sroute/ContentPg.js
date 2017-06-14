'use strict'
const express = require('express')
const router = express.Router()
const isj = require('is_js')
const U = require('topseed-util')

const ContentDS = require('./ds/ContentDS')
const contentDS = new ContentDS()
// ========================================

router.post('/save', function (req, res) {	
	const dat = req.body
	console.log('up')

	const pro = contentDS.save(dat.siteCode, dat.id, dat)
	pro.then(function(){
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/loadById', function (req, res) {	
	const dat = req.body
	console.log(dat)
	const pro = contentDS.loadById(dat.siteCode, dat.id)

	pro.then(function(row){
		console.log('loadById!')
		res.status(200).send(JSON.stringify(row))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/load', function (req, res) {	
	const dat = req.body

	const pro = contentDS.load(dat.siteCode, dat.section, dat.urn)
	pro.then(function(row){
		console.log('load!')
		res.status(200).send(JSON.stringify(row))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/search', function (req, res) {	
	const dat = req.body
	const pro = contentDS.search(dat.siteCode, dat.email, dat.section, dat.urn)

	pro.then(function(row){
		console.log('search!')
		res.status(200).send(JSON.stringify(row))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})


router.post('/newContent', function (req, res) {	
	const dat = req.body
	const pro = contentDS.newContent(dat.siteCode, dat.section, dat.urn, dat)
	pro.then(function(key){
		console.log(key.id)
		const ret = { id : key.id}
		res.status(200).send(JSON.stringify(ret))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

//###################### 
module.exports = router
