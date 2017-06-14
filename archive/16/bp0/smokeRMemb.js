'use strict'
const Config = require('./Config')
const C = new Config()
const Util = require('./utils/shared/Util')
const U = new Util()
const AuTho = require('./utils/AuTho')
const A = new AuTho() 
const MembDS = require('./sroute/ds/MembDS')
const membDS = new MembDS()

process.on('unhandledRejection', function(reason, pro){
	console.log('? Unhandled Rejection at: Promise ', pro, ' reason: ', reason, JSON.stringify(pro))
})
// ========================================

//validate()
function validate() {
	if( true) {//A.matchEmailedCode('al1006@gore.com', '1143', '127')) {
		membDS.validatedCodeMark('al1006@gore.com', '127')
			.then(function(val){
				console.log('ok', val)
		}).catch(function (er) {
			console.error(er)
		})
	}//if
	else console.log('not ')
	//membDS.recordIp('123', '123')
}

//signUp()
function signUp() {
	const pro = membDS.signUp('al1006@gore.com', '123', '127')
	pro.then(function(key){ //inserted
		console.log(key)
		A.emailCode('al@gmail.com', 'al@gmail.com')

		//console.log(key.id)
		const ret = 'OK'
	})
	.catch(function (er) { // duplicate email
		console.error(er)
	})//c

}

//recordIp()
function recordIp() {
	membDS.recordIp('al1006@gore.com','127')
}

//save()
function save() {
	const dat = {}
	const pro = membDS.save('al1006@gore.com', dat, '127')
	pro.then(function(spro){
		console.log('spro')
		console.log(JSON.stringify(spro))
		//smokeDSL()
	}).catch(function(err) {
		console.log('Smoke err ' + err)
	})

}

function saveA() {
	const dat = {}
	dat.headline = 'yes, yes, c'
	dat.m1 = 'hi'
	dat.m2 = 'there2'
	dat.dom = 'vic'
	dat.id = '570943692865536' // I pass a bad key
	const pro = membDS.saveA(dat.dom, dat.id, dat)
	pro.then(function(spro){
		console.log('spro')
		console.log(JSON.stringify(spro))
		//smokeDSL()
	}).catch(function(err) {
		console.log('Smoke err ' + err)
	})

}

function insertA() {
	const data = {}
		data.name = 'vic2'
		data.email = 'vic2@eml.c1'
		data.dom = 'vic123' //domain
		data.role = 'editor'
		data.lastDat = new Date()

	const pro = membDS.insertAdmin(data.dom, data.email, data)
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//searchA()
function searchA() {
	const data = {}
	const pro = membDS.searchA('','')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

//loginLoad()
function loginLoad() {
	const bas = A._toBasicHash('al1006@gore.com','123')
	const auThoPro = A.getAuThoB( bas ) //return role promise

	let authO_
	auThoPro.then(function(authO){
		authO_ = authO
		return membDS.canLogin(authO.email, authO.password, '127')
			}).then(function(row){
				console.log('lL!', authO_)
				console.log(row)

	}).catch(function (er) {
		console.error(er)
	})//c

}

loadA()
function loadA() {
	const data = {}
	const pro = membDS.loadA('al1006@gore.com')
	pro.then(function(ret) {
		console.log('here')
		console.log(ret)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}

