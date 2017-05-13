'use strict'

const isj = require('is_js')
const CHEERIO = require('cheerio') //$ jQ
const MarkdownIt = require('markdown-it')
const MD = new MarkdownIt()
const FS = require('fs')

const Util = require('topseed-util')
const U = new Util()
const ContentDS = require('./ds/ContentDS')
const contentDS = new ContentDS()
// /////

const FROOT = './web/~layouts/'

const WROOT = '/~layouts/'
const MAGICRoot  = '/~ROOT/'
const MAGICBreak = '~ B ~'
const MAGICAd0   = '~ A0 ~'
// /////
//TODO: read account info into DS cache

const ADMIN = 'bpA/'

class Dynamic {

pathIsDynamic(p) {
	const tokens = p.split('/')
	if(tokens.length<4) return false

	if(p.sz<5) return false
	if(p.includes(ADMIN)) return false
	return true
}

// 1:siteCode /2:templateVariant /3:lang /...:sections  /LAST:name 
pathToStruct(p) {
	console.log(p)
	const path = { }
	const tokens = p.split('/')

	path.urnQ = tokens.pop() //'knicks'
	tokens.shift()// first one nill

	path.siteCode = tokens.shift() //'vic123'
	path.templateVariant = tokens.shift() // .m
	path.lang = tokens.shift() // 'en'

	path.sections =  tokens.join('/') // 'sports'

	//remove query string
	path.urn = path.urnQ.split('?')[0].split('#')[0]

	//console.log(path)
	return path
}//()

filter(siteCode, templateVariant, lang, sections, urn) { // return html promise
	const pro =contentDS.load(siteCode, sections, urn)

	return pro.then(function(row){//get data
		// prep template:
		let f = 'DEFAULT/template/lay1.html' //templateW or M
		let template = FS.readFileSync(FROOT +f, 'utf8')
		template  = U.replace(template, MAGICRoot, WROOT+'DEFAULT/')// + templateVariant
		let $ = CHEERIO.load(template)
		const placesCount = $('.cms').length

		//prep dynamic parts
		const md = row.md // dynamic
		const mds = Dynamic.mdRenToArray(md)
		if(mds.length != placesCount )
			throw new Error('template to content count mismatch')

		const h = Dynamic._render($, mds)
		return h ////	res.status(200).send(h)
	})
}

static mdRenToArray(mdOne) { // split up md so we can put in more than one page in layout
	const mdSplit =mdOne.split(MAGICBreak)
	let mds = []
	for (let s of mdSplit) {
		const md = MD.render(s)  // markdown
		mds.push(md)
	}
	return mds
}

static _render($, mds) {
	//	$('#c1').append(m1)
	for (var i in mds) {
		$('#cms'+i).append(mds[i])
	}
	const h =$.html()
	return h
}//render


structIsDynamic(path) {
	if(isj.falsy(path.siteCode))  return false
	if(isj.falsy(path.templateVariant))  return false
	if(isj.falsy(path.lang)) return false
	if(isj.falsy(path.sections)) return false
	if(isj.falsy(path.urn))  return false

	if( path.siteCode.length <3 )  return false
	if( path.templateVariant.length >3 )  return false
	if( path.lang.length <2 ) return false
	if( path.siteCode.length <2 ) return false
	if( path.urn.length <2 )  return false

	return true
}

listFolders(dir) {
	const section = FROOT + dir
	console.log(section)
	let ff = fs.readdirSync(section)
	let ret = new Array()

	ff.forEach(function(item){
		const stats = fs.statSync(section+item)
		const d = stats.isDirectory()
		if(d) { 
				const f = section + item + INFO
				let el = {}
				if (fs.existsSync(f)) {
					el = JSON.parse(fs.readFileSync(f, 'utf8'))
					//console.log(el)
				}//fi
			el['item'] = dir+'/'+item
			el['time'] = Date.parse(stats.ctime)
			ret.push(el)
		}//fi
	})
	return ret
}//()

} module.exports= Dynamic