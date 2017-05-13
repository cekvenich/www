'use strict'
const Config = require('../../config/Config')
const C = new Config()
const Util = require('topseed-util')
const U = new Util() 
const DATASTORE = require('@google-cloud/datastore')
const isj = require('is_js')
const _KEY = '__key__'

const DS = DATASTORE({
	projectId: C.CLOUD_PROJECT_ID,
	keyFilename: C.CLOUD_keyFilename
})
// //

class BaseGDS {

static _makeKey(table_, id) {
	const k = DS.key([
		table_,
		Number(id)
	])
	return k
}

_save(table_, id, jDObj) {
	const key = BaseGDS._makeKey(table_, id)

	const jD = jDObj
	jD.id = id
	jD.lastDate = U.getDt()//store date of change

	return DS.get(key).then(function(data) {
		const row = data[0]
		Object.assign(row, jD)//merge

		const entity = {
			key: key,
			data: row
		}
		return DS.update(entity)//2
	}).then(function(res) {
		//console.log('_save3')
		return (res[0].mutationResults[0])
	}
	, function(er){ // I have to do this
		console.log('_save er '+ er)
		throw new Error(er) 
	})

}//_s

} module.exports = BaseGDS