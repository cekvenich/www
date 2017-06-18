'use strict'

let ROOT = 'http://localhost:8080/cmsA/'

let data = { 	//BDS.insertContentKey(dat.dom, dat.section, dat.urn, dat)
	section : 'sports',
	urn : 'knicks10',
	headline : 'Knicks lose again'
}

const data2 = {
	title: 'Oh hi'
}

let kid = ''

QUnit.module( 'insert', function() {
QUnit.test( 'test insert - not a dupe', function( assert ) {
	console.log('test i')
	const done = assert.async()
	data.dom = 'vic123'
	console.log(data)

	fetch(ROOT +'insert', { //1 call
			method: 'post'
			, headers: {
				'Content-Type': 'application/json',
				'Accept':'application/json',
				credentials: 'same-origin' //res.cookie returned
			}
			, body: JSON.stringify(data)
		}).then(function(response) { //2 return a promise
			console.log('back')
			if (!response.ok) {
				console.log(response)
				throw Error(response.statusText)
			}
			return (response.json())
		}).then(function(value) { // 3 done:
			kid = value
			console.log(kid)

			assert.ok( kid, 'we got something back, check console' )
			done()
	}).catch(function(err) { //error
		console.error(err)
	})//fetch()
})//test

	// Part II
	QUnit.module( 'nested II', function() {
		QUnit.test( 'load', function( assert ) {
			console.log('test load')
			const done = assert.async()
			console.log(data)
			//data.dom = 'vic12344'

			fetch(ROOT +'load', { //1 call
					method: 'post'
					, headers: {
					'Content-Type': 'application/json',
					'Accept':'application/json',
					 credentials: 'same-origin' //res.cookie returned
					}
					, body: JSON.stringify(data)
				}).then(function(response) { //2 return a promise
					console.log('back')
					if (!response.ok) {
						console.log(response)
						throw Error(response.statusText)
					}
					return (response.json())
				}).then(function(value) { // 3 done:
					console.log(JSON.stringify(value))

					assert.ok( JSON.stringify(value), 'we got something back, check console' )
					done()
			}).catch(function(err) { //error
				console.error(err)
			})//fetch()
		})//test

		// Part III
		QUnit.module( 'nested III', function() {
			QUnit.test( 'save', function( assert ) {
				testUpdate(assert)

			})//test
		})/// III inner modules

}) //II inner module

})//outer

function testUpdate(assert) {
	console.log('save')
	const done = assert.async()
	data.id = kid.id

	console.log(data)

	fetch(ROOT +'save', { //1 call
			method: 'post'
			, headers: {
				'Content-Type': 'application/json',
				'Accept':'application/json',
				credentials: 'same-origin' //res.cookie returned
			}
			, body: JSON.stringify(data)
		}).then(function(response) { //2 return a promise
			console.log('back')
			if (!response.ok) {
				console.log(response)
				throw Error(response.statusText)
			}
			return (response.json())
		}).then(function(value) { // 3 done:
			console.log(JSON.stringify(value))

			assert.ok( JSON.stringify(value), 'we got something back, check console' )
			done()
	}).catch(function(err) { //error
		console.error(err)
	})//fetch()

}