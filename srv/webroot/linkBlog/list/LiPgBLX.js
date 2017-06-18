
function Minit( ) {// 'closure|module|namespace
	var DS = BDS.extend({
		doFetch: function(data, token) {
			return BDS._fetch(window.fetch, 'linksPg/list', data, token)
				.then(function(value) { 
					console.log('back')
					//console.log(JSON.stringify(value))
					return value
			})//BDS 
		}//doFetch
	})//class
	var ds = new DS()
	var PgBLX =  PLX.extend({// NO UI, or render in this layer
		init:function(nam, le) {
			this._le = le
			this._nam = nam
			var thiz = this
			var pro = ds.doFetch()
			pro.then(function(val) {
				//console.log(val)
				thiz.render(val, thiz._nam, thiz._le)
			}).catch(function (er) {
				console.log(er)
			})//c
		}

		,render:function(values, nam, le) {
			le.init(values) // could be stream//observer

		}//()
	})//class
	var bl = new PgBLX()
	bl.initPLX(ds)

	var leaavingPg = flyd.on(cleanUp, bl.observer('TT'))
	function cleanUp() {
		//console.log('TT list')
	}//()

return bl//instance to page 
}