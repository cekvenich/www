
function Minit( ) {// 'closure|module'-iso.
	console.log('ps login')

	var ROOT = 'https://www.masons-foundation.org/'
	class DS extends BDS {
		doFetch(data, token) {
			return BDS.fetch(window.fetch, ROOT, 'loginPg/login', data, token)
				.then(function(value) { 
					console.log('back')
					console.log(JSON.stringify(value))
					return value
			})//BDS
		}//doFetch
	}//class

	class PgBLX extends BLX {
		get nav() { return this._nav }

		init(nam) {
			this.clicks = flyd.stream()
			this._nav = flyd.stream() // to navigate away
			var thiz = this
			flyd.on(function(e) {// on click
				//console.log(e)
				thiz.clicked(nam)
			}, this.clicks)
			this.regObserver(nam, this.clicks)
			console.log('init ')
		}//()

		clicked(nam) {
			var obj = $('#frm1').jsForm('get') 
			console.log(JSON.stringify( obj))

			var thiz = this
			var pro = this._ds.doFetch(obj)
			pro.then(function(val) {
				thiz.nav(obj) //page nav
			}).catch(function (er) {
				console.log(er)
			})//c
		}//()
	}//class

	var ds = new DS()
	var bl = new PgBLX(ds)

	var leaavingPg = flyd.on(cleanUp, bl.observer('TT'))
	function cleanUp() {
		//console.log('TT login')
	}//()

return bl//instance to page 
}