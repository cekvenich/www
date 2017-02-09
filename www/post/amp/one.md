
## AMP and AMP+SPA at the same time

AMP is somehow viewed as hard. If you do social meta tags used for SEO, it should be easy. Also it help if you are already know how to do server side data binding and in browser data binding, not related to AMP, but just a basic skill - it is a skill that is a prerequisite. So if you have basic skills, AMP is cake.
Mostly you'd start w/ a SPA page, a regular page, that you also want to have an AMP version of.

### Deciding what to serve
Some sites have a m. subdomain, where they server mobile version of their site - the server code sould be similar. You'd write a node module like this to decide if it it should render amp or spa version:

	exports.filter = function (req, res, next) {
		if (req.path.indexOf('.') !=-1) { // hasDot?
			next() // it is a static asset, ex: .jpg, .css
		} else { // no dot, it is a path:
			const pgPath = ROOT + req.path
			let containsWWWW = (req.subdomains.indexOf('www') > -1) // or amp.
			const isWWWW = (req.query.w == '1') || containsWWWW				
			console.log(pgPath + ' ^ ' + isWWWW)

			if(!endsWithSlash(req.path)) {
				res.redirect(req.path + '/')			
			} else if(isWWWW) {//is it SPA/www? 
				fs.readFile(pgPath + SPA, 'utf8', function(err, data) {
					if(err)  { }
					res.send(data)
				})
			} else { //AMP 
				fs.readFile(pgPath + AMP, 'utf8', function(err, data) {
					if(err)  { }
					res.send(data)
				})// readfile
			} //else AMP
		} // else
	}//()

This code first assumes it is a file, like one.png. If not, it tries to decide if it should be server SPA version. For examples if query string is ?w=1, it will serve SPA. Or based on subdomain, www. or amp. If it is not, or not sure, it will server AMP version.

And you can use this module like this:

	server.use(AFilter.filter)

For starts, AMP and SPA version could be same. 

### Creating an AMP page
If you use Pug like I do, you can create a shell for all AMP pages:

	doctype html
	html(⚡='')
		head
			block head
		body
			block top
			block main
			block footer

The AMP 'block head' requires a lot of boiler plate, it is always the same:

	meta(charset='utf-8')
	script(async='', src='https://cdn.ampproject.org/v0.js')

	meta(name='viewport', content='width=device-width,minimum-scale=1,initial-scale=1')
	style(amp-boilerplate='').
		body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}
	noscript
		style(amp-boilerplate='').
			body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}
	link(rel='stylesheet', href='https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&lang=en')
	style(amp-custom='')
		include ../_sass/main.css

Also the page needs something like:

	link(rel='canonical', href='https://www.masons-foundation.org/post/mserv/')

It needs a link to a canonical version of self, in our case SPA, since it has a www. subdomain. 

While finishing the AMP page, you need to follow the AMP guidelines on tags. Of course, you can't have .js in AMP page, but you can use iFrames (that have .js inside). The full code for front end is here:
- <http://github.com/cekvenich/www/tree/master/www/post/amp>

You should test that you AMP page is compliant:
- <http://search.google.com/search-console/amp>

### How to AMP
You should also update you sitemap.xml like so:

	<url>
		<loc>https://amp.masons-foundation.org/post/mserv/</loc>
	</url>

When a mobile Chrome browser recognizes an AMP page the first time, it is cached on the google CDN. This is what give AMP it's speed, edge serving by a CDN, for those that may not be using a CDN for some reason. If you change the content of your AMP page, you need to notify Google using their process so that they flush the page and get the new content. 
- <http://developers.google.com/amp/cache/update-ping>

AMP gives you SEO improvements, as do external links and accessible text tags. I try to serve the AMP version as default. But as soon as a user clicks on any links on my AMP page, I serve the normal SPA page. 