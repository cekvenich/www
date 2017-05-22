'use strict'

const AuTho = require('../utils/AuTho')
const A = new AuTho() 

process.on('unhandledRejection', function(reason, pro){
	console.log('? Unhandled Rejection at: Promise ', pro, ' reason: ', reason, JSON.stringify(pro))
})
// =====

//basicHash()
function basicHash() {
	const h = A._toBasicHash('al','gore')
	console.log(AuTho.unhashBasic(h))
}


//validate()
function validate() {
	const pro = membDS.validatedCodeMark('al2@gore.com')
	pro.then(function(res) {
		console.log(res)
	}).catch(function (er) {
		console.log('er')
		console.log(er)
	})//c
}


function email() {
	const c1 = A.emailCode('vic')
	console.log( c1 )

	console.log( A.matchEmailedCode('al',3) )
	console.log( A.matchEmailedCode('vic',3) )
	console.log( A.matchEmailedCode('vic',c1) )
}