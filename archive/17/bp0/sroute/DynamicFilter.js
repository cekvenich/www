'use strict'
const express = require('express')

const Util = require('topseed-util')
const U = new Util()
const Dynamic = require('./Dynamic')
const DYN = new Dynamic()
// ========================================

exports.filter = function (req, res, next) {

	const p = U.getPath(req)
	if(!DYN.pathIsDynamic(p)) {
		next()
		return
	}
	let path = {}
	try {
		path = DYN.pathToStruct(p)
	} catch (err) {
		console.log('ex')
		console.error(er)
		next()
		return
	}
	if(!DYN.structIsDynamic(path)){
		next()
		return
	}
	
	//console.log(path)
	const pro =DYN.filter(path.siteCode, path.templateVariant, path.lang, path.sections, path.urn)

	pro.then(function(h){//get data
		res.status(200).send(h)

	}).catch(function(er) {
		console.log('er')
		console.error(er)
		res.statusMessage = 'Dynamic Filter Error'
		res.status(400).end()
	})

}//



