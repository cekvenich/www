'use strict'
const Config = require('./Config')
const C = new Config()
const cF = require('./sroute/CmsFilter')
const ContentDS = require('./sroute/ds/ContentDS')
const contentDS = new ContentDS()

process.on('unhandledRejection', function(reason, pro){
	console.log('? Unhandled Rejection at: Promise ', pro, ' reason: ', reason, JSON.stringify(pro))
})
// ========================================

function path() {
	//parse path-  1:DOM /2:variant /3:lang /.5.:sections  /LAST6:name 
	const str = '/vic/m/en/sports/knicks3'
	console.log(str)
	const res = cF.pathToStruct_(str)
	console.log(res)
}

//newContent()
function newContent() {
	const data = {}
	data.headline = 'yes, yes, c'
	data.md = 'hi'
	const pro = contentDS.newContent('vic','sports', 'knicks4', data)
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//search()
function search() {
	const data = {}
	const pro = contentDS.search('vic','sports', 'knicks4')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//load()
function load() {
	const data = {}
	const pro = contentDS.load('vic','sports', 'knicks4')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

loadById()
function loadById() {
	const pro = contentDS.loadById('vic','5678701068943360')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}


//save()
function save() {
	const dat = {}
	dat.headline = 'yes, yes, c'
	dat.md = 'hi'
	dat.siteCode = 'vic'
	dat.id = '5654153720233984' // I pass a bad key
	const pro = contentDS.save(dat.siteCode, dat.id, dat)
	pro.then(function(spro){
		console.log('spro')
		console.log(JSON.stringify(spro))
		//smokeDSL()
	}).catch(function(err) {
		console.log('Smoke err ' + err)
	})

}//save()
