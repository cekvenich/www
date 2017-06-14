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

const TABLE = C.MEMBERS_TABLE

class MembDS extends BaseGDS {

static _removePasswordFields(row) {
	delete row.password
	delete row.validatedDate
	//delete row.role
	delete row.lastDate
	delete row.id
	delete row.ip

}

saveA(id, jDObj) {
	const ipro = super._save(id, jDObj)
	ipro.then(function(res){
		return (res)
	})
	.catch(function (er) { // I have to do this
		console.log('save er')
		console.log(er)
	})
	return ipro

}//s

save(email, jDObj, ip, authO) {
	MembDS._removePasswordFields(jDObj)
	const jD = jDObj
	jD.ip = ip
	jD.lastDate = U.getDt()//store date of change

	const thiz = this
	return this.loadA(email)
		.then(function(row){
			Object.assign(row, jD)//merge
			const key = BaseGDS._makeKey(TABLE, row.id)
			const entity = {
				key: key,
				data: row
			}
			return DS.update(entity)
	})

}//s

validatedCodeMark(email, ip) { // first check that the code is valid
	const query = DS.createQuery([TABLE])
		.filter( 'email', '=', email )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 1) {
			const row = rows[0]
			//console.log(row)
			row.ip = ip
			row.lastDate = U.getDt()
			row.validatedDate = U.getDt()
			//console.log(row)
			DS.update(row)
			return (true)
		}
		throw new Error(false)
	})//q

}//()

static _isValidated(date) { //todo: check age
	console.log(date)
	return isj.truthy(date)
}

validatedCodeClear(email) { // first check that the code is valid
	const query = DS.createQuery([TABLE])
		.filter( 'email', '=', email )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 1) {
			const row = rows[0]
			row.ip = ip
			row.lastDate = U.getDt()
			delete row.validatedDate
			//console.log(row)
			DS.update(row)
			return(true)
		}
		throw new Error(false)
	})//q
}//()

searchA(email) {
	const query = DS.createQuery([TABLE])
		//.filter( 'email', '=', email ) //site

	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//const row = rows[0]
		//const key = row[DS.KEY]
		MembDS._addMissingCol(rows)
		return(rows)

		})//DSq
}//

static _addMissingCol(rows) {
	for (let row of rows) {
		if(isj.falsy(row.name))
			row.name=''
		if(isj.falsy(row.site))
			row.site=''
		if(isj.falsy(row.role))
			row.role=''
		if(isj.falsy(row.lastDat))
			row.lastDat=0
	}
}

load(email) {
	const query = DS.createQuery([TABLE])
		.filter( 'email', '=', email )

	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		if(rows.length !=1) { // 
			throw new Error('not found ...')// or more than one
		}
		const row = rows[0]
		const key = row[DS.KEY]
		//row.id = key.id
		this._removePasswordFields(row)
		return(row)
 
	})//DSq

}//load


loadA(email) {
	const query = DS.createQuery([TABLE])
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

}//load

static _doPasswordsMatch(email, userProvider, dbProvided) {
	const hash = U.crypt(userProvider, C.SALT+email)
	return hash == dbProvided
}

// checks hashed password and code validation
canLogin(email_, password_, ip) {
	const email = email_
	const password = password_

	const thiz = this
	const query = DS.createQuery([TABLE])
		.filter( 'email', '=', email )
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 1) {// outer
			const row = rows[0]
			//console.log(row)
			if(isj.falsy(row.password)) throw new Error('pswd') 
			if(MembDS._doPasswordsMatch(email, password, row.password)) {//hashed pswds!
				if(MembDS._isValidated(row.validatedDate)) {
					console.log('ok')
					thiz.recordIp(email_, ip)
					MembDS._removePasswordFields(row)
					return row
					//Promise.resolve(row)
				}
				throw new Error('not validated!') 
			} 
			throw new Error('psw')// ('pswd')
		} // outer
		throw new Error('not found') //outer
	})//q
	
}//insert

 
signUp(email, password, ip) {
	const query = DS.createQuery([TABLE])
		.filter( 'email', '=', email )
	const jDObj = {}
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 0) {
			console.log('i')
			jDObj.email = email
			jDObj.password = U.crypt(password, C.SALT+email)
			jDObj.ip = ip
			jDObj.lastDate = U.getDt()

			const key_ = DS.key( TABLE )
			const row = {
				key: key_,
				data: jDObj
			}
			return DS.insert(row).then(function(ret){
				console.log(JSON.stringify(key_.id))
				return (key_.id)
			})//dsI
		}
		const rowEr = rows[0]
		const key = rowEr[DS.KEY]
		console.log(JSON.stringify(key))
		throw new Error(key.id)
		
	})//dsQ

}//insert


insertA(email, jDObj) {
	const query = DS.createQuery([TABLE])
		.filter( 'email', '=', email )
	
	return DS.runQuery(query).then(function(res){
		const rows = res[0]
		//console.log(rows.length)
		if(rows.length == 0) {
			console.log('i')
			jDObj.email = email
			jDObj.lastDate = U.getDt()

			const key_ = DS.key( TABLE )
			const row = {
				key: key_,
				data: jDObj
			}
			return DS.insert(row).then(function(ret){
				console.log(JSON.stringify(key_))
				return (key_.id)
			})//dsI
		}
		const rowEr = rows[0]
		const key = rowEr[DS.KEY]
		console.log(JSON.stringify(key))
		throw new Error(key.id)
		
	})//dsQ
}//insert


recordIp(email, ip) {
	//const thiz = this
	this.loadA(email)
	.then(function(row){
		row.ip = ip
		row.lastDate = U.getDt()
		const key = BaseGDS._makeKey(TABLE, row.id)
		const entity = {
			key: key,
			data: row
		}
		DS.update(entity)
	}).catch(function (er) { 
		console.log('rec ip')
		console.log(er)
	})

}//()


}//class
module.exports = MembDS
