
# (FTS -> ) SEO ($) netops

Here I'll show you how to use FTS so that you can have great SEO.

- We'll a domain that uses a distributed CDN.
- We'll add sitemap to google webmaster dashboard for said domain
- We add FTS for the site
- We boost our page rank

Without SEO, you website is just a brochure that only you hand out, but w/ SEO, it is a store window where people walk by and look, 24X7, and world wide audience - potentially of trillions.
If you are a pro - by definition you make money: either via page views of your content or by selling/e-commerce - and both require good SEO. Good SEO gives you a constant and free stream of leads. I wish I can tell you that SEO is quick and onetime, it's not. But there is a trick to it. So before we jump into it, I'll tell you a trick to SEO: FTS! Google has CSE <https://cse.google.com> so you can search your site (and not have to use silly Solar in the cloud and such). The paid version ( $8 / month ) of Google CSE lets you do an instant scan of your content. W/o that - you have to wait to see how the SEO turns out. Wait weeks per each tweak. Hardly feasible.
In theory, and only in theory you could get SEO to work w/o Google CSE - if you like a lot of pain.  With instant index, you can tune things as you are working on them. :-)

So lets start w/ the labor that is SEO; because $$$ is good. It may take a few days of lab time - and needs ongoing SEO tuning - and arguing for more interesting content :-)

## 0. Of course, content
You should first have some rewarding articles to view(more than once?), or some nice things to sell, or both. Also it should be presented in a more interesting way than others present it - UI Effects.

If you don't have millions of concurrent users, you can skip steps 1 and 2 and go to step 3.

## 1. Fast
Latency counts in SEO page rank.

You may need a <no-script> version of your app, or at least a less rich version - something approaching AMP.
If you know how to App-shell, this is easy to do. You have one version of your app that is great UX for mobile apps, native mobile apps, chrome/FF/Safari and current version of IE.
Now you may need to create a second version of your App-shell: AMP like. Recall that AMP has no script. Oder version of IE struggle. And SEO does not use .js. So some reasons to create 2 html files per page.
If you use Pug or such to make an index.html using an App-shell X, now you may need to make another App-shell 'AMP'.
IMPORTANT: you can now see that when you make a component, you always pass in the data, you don't have a widget get the data direct - AMP won't use your rich UI components in the same way. AMP shell goal may be to make a 40K download for the entire page.

Recommended:
- But in any case, your content must display fast. Your images must be very small - very very small. Sometimes you show nice images and sometimes you show fast(lossy) images. Image size is part of SEO - due to performance aspect.

- And your content MUST be on a distributed CDN (ex: CDN77 has ftp. CDN77 is $12 / month). And SEO indexing now is mobile first - so for SEO: mobile first.

Two version of your html pages is optional. But CDN and fast images is not - you must deploy site to CDN.
You'll need to register a domain (ex: easydns $5 / month). Before you SEO - you need a (https) domain that works - so we optimize it.

Aside: You should also monitor (ex. monitis is ~ $15 / month <http://monitis.com/free-tools> )

## 2 Lab 2: Setup your (naked) HTTPS domain

In case you don't know, CNAME your DNS to CDN, of course. We must use https - as some HTML5 features only work in https.
Your naked name will just redirect to your distributed CDN. Ex: Name.com will redirect to https://www.name.com, where www is CDN provided CNAME.

![](/post/seo/setup.png)
 The CDN provides https certs - you don't have to do that. It should looks something like above (here I also use them for video hosting). You can see that my origin on site44 is now distributed via CDN as masons-foundation.org. (But your origin should be secret to prevent DDOS). Also - unlike your origin, CDN is cached, so you have to flush it after update so it's not stale.

But first create a node box, where you'll run the little http *express* server. The express server will answer every request with a permanent redirect to www (CDN)

I advise against CloudFlare, AWS, GoDaddy and other toys. You are better of using something site44 only.

(CDN acts as a proxy to hide your origin and manage access to your static web app. For API, you can use an approach like 3Scale.net - also a proxy. For API of course use a different domain name)


## 3. Lab 3: Half step to CSE
We need to tell google search engine that we are the owners of this domain.
![](/post/seo/0.png)

You can do that on 'google webmaster console '

And setup robots.txt
- <http://varvy.com/robottxt.html>
and site map
- <http://www.sitemaps.org/protocol.html>

## 4. Lab 4: CSE

Now setup FTS on your site, so that user can find content/product of interest.
Ex:
- <http://masons-foundation.org/en/about/search>

![](/post/seo/CSE.png)

![](/post/seo/$.png)

Paid version is $8 per month - and lets us do instant submit.

![](/post/seo/yours.png)

Source:

		script.
			(function() {
				var cx = '015406677380205718189:esv77diws9e';
				var gcse = document.createElement('script');
				gcse.type = 'text/javascript';
				gcse.async = true;
				gcse.src = '//cse.google.com/cse.js?cx=' + cx;
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(gcse, s);
			})()
		div
		:verbatim
			<gcse:searchbox></gcse:searchbox>
		div
		:verbatim
			<gcse:searchresults></gcse:searchresults>

It should look like:

![](/post/seo/searchBox.png)


## 5 SEO
Once sitemap and CSE FTS works, you have SEO.

## 6 IMPORTANT - PageRank - Lab: Twitter

Now you need to create a separate page to point to your pages - some silly static site like google blog - where you blatantly increase your page rank.

And social networks, such as twitter. But before you spam social network - lets play nice:

		block head
			<meta name="twitter:card" content="summary"/>
			<meta name="twitter:url" content="@puppetMaster3"/>
			<meta name="twitter:title" content="About Masons-Foundation"/>
			<meta name="twitter:description" content="Masons-Foundation help web designers and offers a software scaffolding"/>
			<meta name="twitter:image" content="http://edge.masons-foundation.org/16/about/member1.jpg"/>

This will insert meta tags into your <head> so that people can paste the url and get images.
![](/post/seo/soc.jpg)

So lets get twitter to work, as a lab.

## 7 The end

There are alternatives:
![](/post/seo/alt.gif)


So here:
- we created a https domain we want to optimize - that uses a distributed CDN
- we added sitemap to google webmaster dashboard
- we added FTS for the site (as SEO trick)
- we boosted our page rank
