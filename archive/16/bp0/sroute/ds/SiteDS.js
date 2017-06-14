'use strict'
const Config = require('../../config/Config')
const C = new Config()
const Util = require('topseed-util')
const U = new Util() 
const BaseGDS = require('./BaseGDS')

const DATASTORE = require('@google-cloud/datastore')
const isj = require('is_js')
const _KEY = '__key__'

const DS = DATASTORE({
	projectId: C.CLOUD_PROJECT_ID,
	keyFilename: C.CLOUD_keyFilename
})
// ========================================

const TAB = C.SITE_TABLE
const CTRIB_TAB = C.SITE_CTRIB_TABLE

class SiteDS extends BaseGDS {

ctribLoad(siteCode, email) {
	const query = DS.createQuery([CTRIB_TAB])
		.filter( 'siteCode', '=', siteCode )
		.filter( 'email', '=', email )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		if(rows.length !=1) { // 
			throw new Error('not found ...')// or more than one
		} 
		const row = rows[0]
		const key = row[DS.KEY]
		row.id = key.id
		return(row)
	})//DSq
}

ctribLoadAll(siteCode) {
	const query = DS.createQuery([CTRIB_TAB])
		.filter( 'siteCode', '=', siteCode )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		return(rows) 
	})//DSq
}

ctribAdd(siteCode, email, jDObj) {
	const query = DS.createQuery([CTRIB_TAB])
		.filter( 'siteCode', '=', siteCode )
		.filter( 'email', '=', email )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 0) {
			console.log('i')
			jDObj.siteCode = siteCode
			jDObj.email = email
			const key_ = DS.key( CTRIB_TAB )
			const row = {
				key: key_,
				data: jDObj
			}

			return DS.insert(row).then(function(ret){
				console.log(JSON.stringify(key_))
				return(key_.id)
			})//dsI
		}//fi
		const row = rows[0]
		const key = row[DS.KEY]
		console.log(JSON.stringify(key))
		throw new Error(key.id)
	})//dsQ
}

ctribRemove(siteCode, email) {
	return this.ctribLoad(siteCode, email)
		.then(function(row){
			const key = BaseGDS._makeKey(CTRIB_TAB, row.id)
			return DS.delete(key)
	})	
}

ctribUpdate(siteCode, email, jDObj) {
	const jD = jDObj
	jD.siteCode = siteCode
	jD.email = email
	jD.lastDate = U.getDt()//store date of change

	return this.ctribLoad(siteCode, email)
		.then(function(row){
			Object.assign(row, jD)//merge
			const key = BaseGDS._makeKey(CTRIB_TAB, row.id)
			const entity = {
				key: key,
				data: row
			}
			return DS.update(entity)
	})	
}
// ///

static makeCode(nam) {
	let name = nam.toLowerCase()
	name= name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')

	name = name.replace('the','')
	name = name.split(' ').join('')
	if(name.length < 7) {
		name = name.substring(0,24)+'aaaaaaa'
	}//fi
	name = name.substring(0,3) + U.genRandom(100,999)
	return name
}

save(siteCode, jDObj, ip, authO) {
	const jD = jDObj
	jD.ip = ip
	jD.lastDate = U.getDt()//store date of change

	return this.load(siteCode)
		.then(function(row){
			Object.assign(row, jD)//merge
			const key = BaseGDS._makeKey(TAB, row.id)
			const entity = {
				key: key,
				data: row
			}
			return DS.update(entity)
	})
}//s

load(siteCode) {
	const query = DS.createQuery([TAB])
		.filter( 'siteCode', '=', siteCode )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		if(rows.length !=1) { // 
			throw new Error('not found ...')// or more than one
		} 
		const row = rows[0]
		const key = row[DS.KEY]
		row.id = key.id
		return(row)
 
	})//DSq
}//load

createSite(siteCode, cheifsEmail, jDObj) {
	const query = DS.createQuery([TAB])
		.filter( 'siteCode', '=', siteCode )
	
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 0) {
			console.log('i')
			jDObj.siteCode = siteCode
			jDObj.cheifsEmail = cheifsEmail
			const key_ = DS.key( TAB )
			const row = {
				key: key_,
				data: jDObj
			}

			return DS.insert(row).then(function(ret){
				return(key_.id)
			})//dsI
		}
		const row = rows[0]
		const key = row[DS.KEY]
		throw new Error(key.id)
	})//dsQ
}//

}//class
module.exports = SiteDS
