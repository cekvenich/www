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

router.post('/saveA', function (req, res) {	
	const dat = req.body
	console.log('up')
	const pro = membDS.saveA(dat.id, dat)
	pro.then(function(){
		res.status(200).send(JSON.stringify('OK'))
	}).catch(function (er) {
		U.err(er,res)
	})//c

})

router.post('/searchA', function (req, res) {	
	const dat = req.body

	const pro = membDS.searchA() // dat.email)
	pro.then(function(rows){
		console.log('searchA')
		res.status(200).send(JSON.stringify(rows))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/loadA', function (req, res) {	
	const dat = req.body
	console.log('loadA', dat.email)

	const pro = membDS.loadA(dat.email)
	pro.then(function(row){
		console.log('loadA')
		res.status(200).send(JSON.stringify(row))
	}).catch(function (er) {
		U.err(er,res)
	})//c
})

router.post('/insertA', function (req, res) {	
	const dat = req.body
	dat.ip = U.getIP()

	const pro = membDS.insertA(dat.email, dat)
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
