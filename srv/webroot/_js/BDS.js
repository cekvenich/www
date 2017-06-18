'use strict'


var BDS = Class.extend({ //IE11-compatible base class for Data Access Object

	 _fetch: function(fetch_, url_, data_) { 

		var ROOT = 'https://www.masons-foundation.org/'
		var ROOT0 = 'http://localhost:8080/'

		//var xjt_ = Cookies.get(BDS.XJT)
		//var xb_  = Cookies.get(BDS.XBASIC)
		console.log('fetching ', url_)
		return fetch_(ROOT + url_ , { //1 call
				method: 'post'
				, headers: {
					'Content-Type': 'application/json',
					'Accept':'application/json',
					 credentials: 'same-origin' //res.cookie returned
				}
				, body: JSON.stringify(data_)
			}).then(function(response) { //2 returns a promise
				//console.log(response.headers)

				if (!response.ok) {
					console.log('not ok')
					console.log(response)
					throw Error(response.statusText)
				}
				return (response.json())
			})
	}//_()

}) //'class'

// for node:
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
	module.exports = BDS //node


