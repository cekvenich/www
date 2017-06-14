'use strict'

QUnit.module( 'fetch', function() {
QUnit.test( 'test my fetch', function( assert ) {
	console.log('test my fetch')
	testFetch(assert)

})//test
})//outer

let ROOT = 'http://localhost:8080/RM/'

function _fetch(ROOT_, url_, data_) {
	return fetch(ROOT_ + url_ , { //1 call
			method: 'post'
			, headers: {
				'Content-Type': 'application/json'
			}
			, body: JSON.stringify(data_)
		}).then(function(response) { //2 returns a promise
			console.log('back')
			if (!response.ok) {
				console.log('not ok')
				console.log(response)
				throw Error(response.statusText)
			}
			return (response.json())
		})
}//()

function testFetch(assert) {
	const done = assert.async()

	const dat = {}
	dat.a = 'b'

	_fetch(ROOT, 'search', dat)
		.then(function(value) { // 3:
			console.log(JSON.stringify(value))

			assert.ok( JSON.stringify(value), 'we got something back, check console' )
			done()
	}).catch(function(err) { //error
		console.error('err')
		console.error(err)
	})//fetch()

}