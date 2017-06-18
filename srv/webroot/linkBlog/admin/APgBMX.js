
function Minit( ) {// 'closure|module'-iso.
	console.log('ps admin')

	var ROOT = 'https://www.masons-foundation.org/'
	class DS extends BDS {
		doFetch(data, token) {
			return BDS.fetch(window.fetch, ROOT, 'adminPg/add', data, token)
				.then(function(value) { 
					console.log('back')
					console.log(JSON.stringify(value))
					return value
			})//BDS
		}//doFetch
	}//class

	class PgBLX extends BLX {

		init(nam, auth_) {

			console.log(' A init')
			//console.log(auth_)
			if(!auth_) {
				this._redirect('/linkBlog/login/')
				return false
			}
			else {	
				this._auth = JSON.parse(auth_)
				//console.log(this._auth)

				this.clicks = flyd.stream()
				var thiz = this
				flyd.on(function(e) {
					thiz.clicked(nam, thiz._auth)
				}, thiz.clicks)
				this.regObserver(nam, this.clicks)
				return true
			}
		}//()

		clicked(nam, auth) {
			console.log(auth)
			var obj = $('#frm1').jsForm('get') 
			console.log(JSON.stringify( obj))

			var thiz = this
			var pro = this._ds.doFetch(obj, auth)
			pro.then(function(val) {

				thiz._redirect('/linkBlog/list/')

			}).catch(function (er) {
				console.log(er)
			})//c
		}//()
	}//class

	var ds = new DS()
	var bl = new PgBLX(ds)

	var leaavingPg = flyd.on(cleanUp, bl.observer('TT'))
	function cleanUp() {
		//console.log('TT admin')
	}//()

return bl //instance to page 
}