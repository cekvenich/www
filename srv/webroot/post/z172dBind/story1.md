
# Data Binding
One of the things that nodes has over JSP/ASP/PHP and such is that you can reuse more front end/browser and server side code. And data binding is one of key skills to have. 

### Prerequesites
Surprisingly, this exercise can be a broad topic. In this case, I need you to know how to do pre-processing before starting, learned elsewhere. For example Sass and Pug (found in CodePen and lots of google github examples). Learning pre-processing allows us to manage the potential of sprawl. 
Also, we are using fetch() browser api, as even jquery 3.1 started deprecating 'ajax' by makeing it optional in jquery slim. 

### Browser side data binding
In a browser we can fetch() from a micro service and bind. This is the bind code itself:

	<ul>{{for people}}
		<li>Name: {{:name}}</li>  
	{{/for}}
	</ul>

And your page also needs a .js library imported, I'm using a library that works in browser and in node, server side, jsRender:

	<script src="jsrender.min.js">

And now we can implement the library by calling a microservice, with that template:

	fetch('https://rch-demo.appspot.com/membersPg/mem/', { 
		method: 'get'
		}).then(function(response) {
			return (response.json())
		}).then(function(value) {
			// your code here
			let tmpl = $.templates("#peopleList") // the id of template
			let html2 = tmpl.render( value )
			$('#peopleList').html(html2)
		}).catch(function(err) {
			console.log(err)
	})//fetch()

And we have to serve this page, with node/express it is one line:

	server.use(express.static('www')) //folder w/ content

Notice how we have UI and then the browser executes the fetch for data.

The file layout looks something like this:
![](/post/dBind/layout.png)
Notice on the far left of the image we have index.js, that we run via:

	node index

And to the far right of the image is a folder that has spa.html. The folder contains the bundle needed for that url, in this case http://localhost:8080/post/one/spa.html.  
For me each folder maps to url and has spa.html that is served for browser rendered page. I also re-use code, for example header, footer, and combine partials using Pug. Also it has amp.html - that is rendered on the server, next:

### Data binding in Node:

So we are going to re-use, of course. Here is the files:
	<http://github.com/topseed/topseed-demos/tree/master/webApp/www/members/dBindEx>

Make sure you view _common.pug file above, it is used in spa.html and amp.html :-). We have to read the amp.file in node:

	server.get('/members/dBindEx/', function (req, res) {
		fs.readFile('./www//members/dBindEx/amp.html', 'utf8', function(err, data) {
			let tmpl = jsrender.templates(data)
			fetch('https://rch-demo.appspot.com/membersPg/mem/', { 
				method: 'get'
				}).then(function(response) {
					return (response.json())
				}).then(function(value) { 
					// your code here
					let html2 = tmpl.render( value )
					res.send(html2)
				}).catch(function(err) {
					console.log(err)
			})//fetch()
		})// readfile

In this case, the server waits for the microservice, and sends the UI and bound data together. There is no js scripts in the browser.

To do server both  node side and browser side data binding you need something like:

	server.get('/members/dBindEx/', function (req, res) {
		const isWWWW = ...
		if(isWWWW) {
			...
			}
		else { ...

ex: <http://github.com/topseed/topseed-demos/blob/master/webApp/index.js>



## Summary and misc.

Most sites required dynamic data. We can do data binding from browser; and then reuse the template and use similar code to do that server side, before the page is sent to the browser - and we can do both at the same time. Sometimes we need a rich interactive page and sometimes we can't use .js in a browser.
I suggest you avoid data binding libraries that only do one or the other. 

There are component libraries that do data binding, they require you to write a component if you want to do data binding. I suggest you use components for re-use and encapsulation of UI. If it does not work in a plain page, it won't work well when you make it re-usable. (there is an article here on proper use of standard web components)




