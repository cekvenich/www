'use strict'
const Config = require('./Config')
const C = new Config()
const SiteDS = require('./sroute/ds/SiteDS')
const siteDS = new SiteDS()

process.on('unhandledRejection', function(reason, pro){
	console.log('? Unhandled Rejection at: Promise ', pro, ' reason: ', reason, JSON.stringify(pro))
})
// ========================================
makeCode()
function makeCode() {
	console.log(SiteDS.makeCode('on'))
	console.log(SiteDS.makeCode('the ~clash'))

}

//ctribRemove()
function ctribRemove() {
	const pro = siteDS.ctribRemove('vic123','vic2@eml.cc')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}


//ctribUpdate()
function ctribUpdate() {
	const data = {a:'c'}
	const pro = siteDS.ctribUpdate('vic123', 'vic2@eml.cc', data)
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}


//ctribLoad()
function ctribLoad() {
	const pro = siteDS.ctribLoad('vic123','vic2@eml.cc')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//ctribAdd()
function ctribAdd() {
	const data = {a:'b'}
	const pro = siteDS.ctribAdd('vic123', 'vic2@eml.cc', data)
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}
///
//save()
function save() {
	const data = {a:'b'}
	const pro = siteDS.save('vic123', data, '127')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//createSite()
function createSite() {
	const data = {}
	const pro = siteDS.createSite('vic123','vic@eml.cc', data)
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//load()
function load() {
	const pro = siteDS.load('vic123')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}