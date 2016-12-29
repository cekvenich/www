
# App Shell + S.P.A.
### w/ Pug(Jade) and Smooth State js

One of the PWA fundamental concepts is the app shell. We will create 2 page SPA, with reusable header and footer. I will assume you know how to use pre-processors. A pre processor,
 for example would compile Sass into CSS. In our case, we will compile Pug(Jade) into html. Pug will help us combine header and footer to our page.
 
### 0. Pre-process(/generate) and setup
There are several popular HTML pre-processors - for example if you use CodePen.io, you can glance the settings to see some. One of the popular ones is Pug.
If you are new to Pug(Jade), you can glance
- <http://youtube.com/watch?v=wzAWI9h3q18> and
- <http://html2jade.org>

You should download <http://github.com/cekvenich/what/blob/master/as.zip?raw=true>
and unzip.

##### Out of scope:
I don't have space here to write about pre-processing, I assume you know how. But here is a few words:
There are many ways to pre-process, compile Pug to html. This is also called static app generation. The resulting output can run completely on a CDN - so that it has the benefits
of being distributed.
If you are very new to using pre-processors, you may want to start with something like:
- <http://prepros.io>.
But I use npm/node to write a script - that script calls a Pug npm module, via

		node _sync

So if you go to unzipped folder _pre you can run 'node _sync' as test.
Then run 'node _sync' in folder /post/one and /post/two.

##### In scope:
You should know how to take a .pug file and make it into html. It is a pre-requsite.


### 1. Header and footer
In the unziped folder /_part there is header and footer:
- <http://github.com/cekvenich/what/tree/master/app-shell.site44.com/_part>

We want to have a body:

		<h1>hi1</h1>

- <http://github.com/cekvenich/what/blob/master/app-shell.site44.com/post/one/index.html>

And a second page:

		<h1>hi2</h1>

- <http://github.com/cekvenich/what/blob/master/app-shell.site44.com/post/two/index.html>

But we don't want D.R.Y. header and footer. Server side you could include header and header in PHP, JSP or ASP or such.
But we are doing a static site.


### 2. Create the 2 pages
In post/one and post/two, create index.pug.
Index pug will call the app shell:
- <http://github.com/cekvenich/what/blob/master/app-shell.site44.com/_part/_shellA-base.pug>
The app shell is using Pug syntax to create a 'menu'.
Now run 'node _sync' in folder one and folder two. The generated nav will look like:

		<ul class="mui-list--inline" id="topMenu">
			<li><a href="/post/one/">Item 1</a></li>
			<li><a href="/post/two/">Item 2</a></li>
		</ul>

### 3. SPA
Notice we also have some js in the app shell:

			<script src="/_js/libJs/head.load.min.js"></script>
		</head>
		<body>
		<footer >
			<script>head.load('/_js/main.js')</script>

Head js is a loader. We load:
- <http://github.com/cekvenich/what/blob/master/app-shell.site44.com/_js/main.js>

For SPA, we just lifted code from:
- <http://github.com/miguel-perez/smoothState.js>

Congrats: you are done w/ App-Shell and SPA.

### 4. SPA

Review example on SmoothState.js site.


### 5. Advanced: Using MD

An advanced use would be to use Markdown files(MD) to help generate content. Something that you can do w/ Pug or preprocessors. You should mix a few .md files in your pug file;  and use mostly pug - especially for UI effects.

### 6. Advanced: Starting w/ a layout

When you create app shell, normally you start w/ a layout you like. For example:
<http://muicss.com/docs/v1/example-layouts/responsive-side-menu>
I usually convert html2pug to make it easier to work with.
I then split out header and footer out - away from the 'middle' content. In this way, I splice an app-shell.
