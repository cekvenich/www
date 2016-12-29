
# Component based (Web-App) Development

By using components or custom tags, we can develop more complex applications that are easier to maintain. The page markup looks cleaner, and the components|tags are reusable. One example project: <http://github.com/Polymer/shop>. There are several DOM/markup based components|tags choices, such as HTML standard web components, RIOT, and finally, Polymer. There are other choices that are not DOM/markup based that use Javascript. (Ex: React, Angular, Vue). I find Javascript-based components harder for designers and harder to style. So we do want the Web-App to look nice, so the  tutorial here is Polymer based, the one that is easiest to adopt and maintain.

### 1. WebMaster
We need an IDE such as VS Code (or CodeAnywhere), and a localhost web server. I use 'WebServer for Chrome' (or Site44.com ). Download a simple component
 <http://murder.site44.com/_compHost/small-block.html>.
Put that small-block.html file in a folder. And create a blank index.html in that folder. Serve that folder from web server. (ex: 'WebServer for Chrome'). Open that server (ex: http://127.0.0.1:8887 ) in browser and display 'developer tools' in your browser.

(If you want to make Polymer components folder: npm install -g polymer-cli;  polymer init starter-kit; and delete what you don't need )

### 2. Use a component (from a page)
Components|tags have two parts: 1) using one from a page and 2) the component itself. Anyone can or should be able to use a component - that is the point of it. So a good idea to learn how to use one first. Here we make an index.html, and in `<head>` you'll need a bit of code:

	<script src='/_compHost/webcomponentsjs/webcomponents-lite.js'></script>
	<link rel='import' href='/_compHost/polymer/polymer.html'>
	
	<link rel="import" href="/_compHost/small-block.html">

Load your tags in head. 
(We can get the two files from Polymer main page as download or if you have to: via bower, we just need those two folders)
In `<body>` you can use a pre-existing tag:

	<div>
		<small-block id='b1' bkimg='index.jpg' titl='Item: one'></small-block>
	</div>

You can see the main part in body, we use the component `<small-block>`.
We pass some arguments to the component:  bkimg="/post/one/index.jpg" titl="Item: One".

So that is how you use it. Everyone on the team should know how to use a component. And if you want to learn how to make one, I suggest you first learn how to use one from a page first, before your start making components. Here is the full html: <https://murder.site44.com/home/compEx/first.html> - view source, and copy, to get it to work in your local environment.

### 3. Draft a component
Some on your dev team should know how to make a component. Also this is good thing to outsource - as web components don't call data, that gets pass in. Lets go. Here we first get our html block to work normally, without any component code, just on a page. If it does not work in plain html, it won't start working once you make it a component. You can go to <https://murder.site44.com/home/compEx/index0.html> and view source of a normal code - before we make it a component:

		<style>
		.small-block {
			min-width: 350px;
			min-height: 250px;
			position: relative;
			overflow: hidden;
			background-color: LightGrey;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 350%;
			transition: .3s;
		}
		.small-block .small-block__stripe {
			width: 100%;
			height: 50px;
			position: absolute;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}
		.small-block .small-block__headline {
			line-height: 40px;
			font-size: 30px;
			color: white;
			margin: 10px;
			margin-top: 5px;
		}
		.small-block:hover {
			background-size: 370%;
			transition: .4s;
		}
		</style>
		<a href="/post/one">
			<div class="small-block" style="background-image: url(/post/one/index.jpg)">
				<div class="small-block__stripe">
					<div class="small-block__headline">Item: One</div>
				</div>
			</div>
		</a>
		<a href="/post/two">
			<div class="small-block" style="background-image: url(/post/two/index.jpg)">
				<div class="small-block__stripe">
					<div class="small-block__headline">Item: Two</div>
				</div>
			</div>
		</a>

Our component block has a few lines of DOM, and it has style, and on hover it zooms in.

Lets see if you can copy the source from <https://murder.site44.com/home/compEx/index0.html> and get it to work w/o any component code first - in your local environment. After it works normally: then we make a part into a component.

### 4. Make your first component|comp

Now that you have a block of DOM, create an empty .html file.

You have already download a tag file, now you can edit it.

	<dom-module id='small-block'>
	<template>
	<style>
		:host {
			background: gray;
		}
		.small-block {
			width: 350px;
			height: 250px;
			position: relative;
			overflow: hidden;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 350%;
			transition: .3s;
		}
		.small-block .small-block__stripe {
			width: 100%;
			height: 50px;
			margin-top: 200px;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}
		.small-block .small-block__headline {
			line-height: 40px;
			font-size: 30px;
			color: white;
			margin: 10px;
			margin-top: 5px;
		}
		.small-block:hover {
			background-size: 370%;
			transition: .4s;
		}
	</style>

	<div class='small-block' style='background-image: url({{ bkimg }})'>
		<div class='small-block__stripe'>
			<div class='small-block__headline'> {{ titl }} </div>
		</div>
	</div>

	</template>
	<script>
		Polymer.log = console.log.bind(console)
		Polymer({
			is: 'small-block'

		})
	</script>

	</dom-module>

In addition to the style, we have some non standard DOM, ex:: `{{ bkimg }}`. 
That is for properties passed in.

Now you can glance the docs on Polymer web site to learn more. I found it best to use B.E.M. naming w/ components and make blocks (B of BEM) into component. Welcome to the world of component based development.

### 5. Make a data binding comp

Once you have some experience and created a few components, you try to do something more. Lets says you use a data-binding library. There are many, one of them is <http://listjs.com/docs>.
You can follow the same pattern we have here, first get it to work with out any component|tag
code. Ex, view source: <http://cekvenich.site44.com/post/datab/index0.html>.

		<ul class="list"></ul>
		<script>
		  var options = {
			valueNames: [ 'name', 'born' ],
			item: '<li><h3 class="name"></h3><p class="born"></p></li>'
		  }

		  var values = [
			{
				name: 'Jonny Strömberg',
				born: 1986
			},
			{
				name: 'Jonas Arnklint',
				born: 1985
			},
			{
				name: 'Martina Elm',
				born: 1986
			}
		  ];

		  function init() {
			console.log('i db')
			var userList = new List('users', options, values);
		  }
		  if(_loaded) init()
		  else {
			_act.addOnce(function(arg1, arg2) {
				init()
				return false
			})
			}
		</script>

Once you are able to get data binding to work w/o component|tag, you can try to get it to work as a component. Here we just call a function. The solution: <http://cekvenich.site44.com/post/datab/> uses a component. If you view source, you can see the component(bind-list.html) file. Notice we are also using head.load to load the script and waiting for the event that all the needed scripts are loaded. (view /_js/main.js )

		<link rel="import" href="/_compHost/bind-list.html">
		</head><body>
			<bind-list></bind-list>
		</div>
		<script>
			var data = [
			{
				name: 'Jonny Strömberg',
				born: 1986
			},
			{
				name: 'Jonas Arnklint',
				born: 1985
			},
			{
				name: 'Martina Elm',
				born: 1986
			}
			]

			var bl = document.querySelector('bind-list')
			bl.init(data) // data comes from page

Note that you should *ALWAYS* pass data from page to the component - and not get the data from inside the component. One reason is that you will need to SEO your page, and SEO means ~no-script. Your tags should have style and interactivity, and encapsulate that.

By using components, you simplify the DOM in page so that you can make the complex web-apps more maintainable. 

Also - if you do something more sophisticated, you can just use Web Componets directly. 