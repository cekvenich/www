'use strict'
const Emailer = require('./Emailer')
const emailer = new Emailer()
const Util = require('topseed-util')
const U = new Util() 
const isj = require('is_js')

const NodeCache = require( 'node-cache' )
const _jwtCache = new NodeCache( { stdTTL: 60 * 61 } ) // 1 hour cache
const _codeCache = new NodeCache( { stdTTL: 60 * 6  } ) //  minutes
// ////////////////////////

class AuTho {

get BASIC() {return 'xbasic'}
get JWT() {return 'xjwt'}

getAuThoB(hash_) {//return role promise BASIC
	//go to db to find the role
	if(isj.falsy(hash_)||hash_.length < 3)
		throw new Error('nothing passed')
	return Promise.resolve().then(function () {//sync
		const ret = AuTho.unhashBasic(hash_)
		return ret
	})

}//()

getAuThoJWT(token) { //return role promise JWT
	//based on token, from cache, get the role
	return Promise.resolve().then(function () {//sync
		const ret = {}
		ret.role = true
		return ret
	})
}

// takes email and pswd
static unhashBasic(hashed_) {// returns JWT
	const jss = Buffer.from(hashed_, 'base64').toString('ascii')
	const dat = JSON.parse(jss)
	return dat

}//()

_toBasicHash(email, password) {
	const o = {}
	o.email = email
	o.password = password
	const str = JSON.stringify(o)
	return this._toB6(str)
}

_toB6(str) {
	const b = Buffer.from(str).toString('base64')
	return b.toString()
}

emailCode(from, to) {
	const code = U.genRandom(1001,9998)
	emailer.send( from, to, 'Authentication', 'Hi, someone, possibly you, requested this join code:', code, 'If this was you, please type that code in. \r\nIf you did not request a code from us just now, you should email us back so that we may be able to trace the source of this request, as a possible hack attempt; so that the local ISP is notified.')

	_codeCache.set(to, code) // set cache
	console.log(code)
	return code
}

matchEmailedCode(email, typedCode, ip) {
	const code = _codeCache.get(email)
	if(isj.falsy(code)) throw new Error(false)
	return code == typedCode
}

} module.exports = AuTho