const Dynamic = require('./sroute/Dynamic')
const DYN = new Dynamic()
// /////

//pathToStruct()
function pathToStruct() {
// 1:siteCode /2:templateVariant /3:lang /...:sections  /LAST6:name 
	DYN.pathToStruct('/vic/w/en/sports/knicks')
	DYN.pathToStruct('/vic/w/en/sports/knicks?a=b')
	DYN.pathToStruct('/vic/w/en/sports/knicks#s1')
	DYN.pathToStruct('/vic/w/en/sports/ne/knicks')
	DYN.pathToStruct('/vic/s/knicks')
}

//filter()
function filter() {
	const pro = DYN.filter('xxx742', 'w', 'en', 'aa', 'aa')
	pro.then(function(val){ 
		console.log(val)
	})
	.catch(function (er) { // duplicate email
		console.log('er')
		console.error(er)
	})//c

}//)()

replace()
function replace() {
	console.log ( Dynamic.replace('abc','b','z') )

}