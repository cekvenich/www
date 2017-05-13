'use strict'
const isj = require('is_js')

const Config = require('../../config/Config')
const C = new Config()
const BaseGDS = require('./BaseGDS')

const DATASTORE = require('@google-cloud/datastore')
const DS = DATASTORE({
	projectId: C.CLOUD_PROJECT_ID,
	keyFilename: C.CLOUD_keyFilename
})
const KEY = '__key__'
// ========================================

const TABLE = C.CONTENT_TABLE

class ContentDS extends BaseGDS {

save(siteCode, id, jDObj) {
	jDObj.siteCode = siteCode
	const ipro = super._save(TABLE, id, jDObj)
	ipro.then(function(res){
		return (res)
	})
	.catch(function (er) { // I have to do this
		console.log('save er')
		console.log(er)
	})
	return ipro
}//s

loadById(siteCode, id) {
	const key = BaseGDS._makeKey(TABLE, id)
	const query = DS.createQuery([TABLE])
		.filter( KEY, '=', key )

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

load(siteCode, section, urn) {
	const query = DS.createQuery([TABLE])
		.filter( 'siteCode', '=', siteCode )
		.filter( 'section', '=', section )
		.filter( 'urn', '=', urn )
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

search(siteCode, email, section, urn) {
	const query = DS.createQuery([TABLE])
		.filter( 'siteCode', '=', siteCode ) 
	
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		ContentDS._addMissingCol(rows)
		return(rows)

		})//DSq
}//

static _addMissingCol(rows) {
	for (let row of rows) {
		if(isj.falsy(row.firstDat))
			row.firstDat= 1

	}//for
}//()

newContent(siteCode, section, urn, jDObj) {
	const query = DS.createQuery([TABLE])
		.filter( 'siteCode', '=', siteCode )
		.filter( 'section', '=', section )
		.filter( 'urn', '=', urn )

	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 0) {// no dupes
			console.log('i')
			jDObj.siteCode = siteCode
			jDObj.section = section
			jDObj.urn = urn
			const key_ = DS.key( TABLE )
			const row = {
				key: key_,
				data: jDObj
			}

			return DS.insert(row).then(function(ret){
				console.log(JSON.stringify(key_))
				return(key_.id)
			})//dsI
		}
		const row = rows[0]
		const key = row[DS.KEY]
		console.log(JSON.stringify(key))
		throw new Error(key.id)
	})//dsQ
}//insert

}//class
module.exports = ContentDS
