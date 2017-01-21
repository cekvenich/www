
#### Re: Ad
Some cameras, such as iPhone7, can do a *bouquet* effect - where the background is blurred. We can do same w/ transparent .png images. Also we added some interactivity:
- If you hover on left / right side of image.
- If on mobile (most page views are), you can just tilt the phone and get same effect.

#### Background / Web Components

There are several Web Components that I have used. Some of the DOM based are:
- Standard WWW Web components, ex: <http://developers.google.com/web/fundamentals/getting-started/primers/customelements>
- Polymer, ex: <http://shop.polymer-project.org/>
- RIOT: <http://riotjs.com>

Alternative to DOM based are .js based (examples: Angular, Vue, React) - and those are a bit less designer friendly. To make nice UX, lets make it easier for a larger group of designers by making it easy to use CSS, HTML, BEM, and even Sass and such - and I do that by using standard DOM (ex: <style>, <div>; vs creating those in .js).

Of the ones I have used mentioned above, I found RIOT best to my liking - and most team friendly.
So the prerequisites for this coding exercise is that you know how to write a web component(RIOT) and how to code interactive design (GSAP):
- GSAP: <http://codepen.io/GreenSock/pen/FnsqC>
- RIOT: <http://cekvenich.site44.com/post/comp>

Lets get started.

### 1. Placing an ad on a page

		<iframe id="ad1" width="300" height="250" style="border: 0; overflow: hidden; background-color: gray"></iframe>
		<script>
			var ad = document.getElementById('ad1')
			ad.setAttribute('src', 'http://cekvenich.site44.com/ads/carolla')
		</script>

Notice that we use iframe to load the ad. If you care about UX - use iframe for ad hosting. Quite likely that the org that writes and hosts the ad, vs the org that places the ad via ad-tech serving are different orgs. Also load the 'source' via script like we did. This loads the ad after the page content - so that our content loads ahead of the ad. If you care about UX - and there are web apps that don't care, but most good creative people avoid working w/ such orgs: use iframe for displaying ads.

#### Not now

It would be nice to make this kind of ad iframe code into a reusable web component! You can do that as a separate exercise after. For this example here, to make it easier to digest for the reader: we will use web component only in the ad itself, not the page that uses the ad.


## 2. Write a working component block

So most n00bs just go to writing a component as step 1; but a pro will first get the component to work w/o any component code, just regular code. So in this step we do that - just plain HTML code.

- View source of the banner ad: <http://cekvenich.site44.com/ads/carolla/index0.html>. Again, if you don't know GSAP - go back and learn that first and come back here later.

We want to make this a bit easier to maintain. Notice there is #spil code in:
- Style section
- At start of script to get it to 'flow' endlessly.
- And left() and right() functions.

So we will take #spil code and make it into a tag.

Aside: when hosting an ad - *all* assets should be in one folder served from a distributed CDN such as CDN77 ( CDN77 has own FTP). Most likely your ad-tech vendor has specs to host your ads. (Also your web app itself should do the same, be served from a CDN - for the obvious reasons such as DDOS. Serve your web app from a CDN, only 50% of people use CDN to host their web app).

### 3. Draft the *spil* component

- Download the code for the tag: <http://cekvenich.site44.com/ads/carolla/spil-comp.tag>
- Open the downloaded tag file in an IDE (ex: CodeAnywhere, Brackets or Atom)

Notice in that file we have: style, DOM, init code and left and right functions.

### 4. Use the component

- View source of the finished ad: <http://cekvenich.site44.com/ads/carolla/index.html>

We now use our component on the banner page. Here is the interesting parts:

		<spil-comp></spil-comp>

		<script src="spil-comp.tag" type="riot/tag"></script>
		<script>
			var _loaded = false
			var _vspil = null
			riot.compile(function(){ // wait for it
				var comps = riot.mount('spil-comp')
				_vspil= comps[0]
				console.log(_vspil)
				_loaded = true
			})
			function left() {
				...
				if(_loaded) _vspil.left()
			}
			function right() {
				...
				if(_loaded) _vspil.right()
			}

We place and load the tag; then we compile it and use the methods. The code for #spil has now been encapsulated - into a component.   The end.


### 5. That's all

Aside: I use head.js  - and head.js triggers load events, w/ a setup like so:

	const _act = new signals.Signal()
	_act.addOnce(function(arg1, arg2) {
		console.log(arg1, arg2)
		return false
	})

So that after head.js finishes loading libs, I trigger a RIOT action to listen inside the tag: for example after GSAP lib is loaded. (Also you can use js-Signals to broadcast any user action).

There are other web Components libs out there, you can see some of the strengths of RIOT.

Also, I am happy to write a web component for you ~ $50 each, details here:
- <https://cekvenich.site44.com/>
