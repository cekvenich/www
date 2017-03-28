
# S. P. A. (Single Page Applications)

Most Web Apps are being converted to SPA.

![](/post/SPA/SPA.png)


## 1. SmoothState.js

I use SmoothState.js 

![](/post/SPA/ss.png)

As you navigate, only a part of the page is loaded, and there is no flicker. Check their
examaple <https://rawgit.com/miguel-perez/smoothState.js/master/demos/barebones/index.html>

My basic code is this:

		onStart: {
			duration: 50,
			render: function (url, $container)  {
				_stateA.dispatch(_PRE, window.location, $container)//*a
				$('#content-wrapper').fadeTo(100,.2)
			}
		},
		onReady: {
			duration: 100,
			render: function ($container, $newContent) {
				$container.html($newContent) // VIEW!!!

				$('#content-wrapper').fadeTo(200,1)

				_stateA.dispatch(_stateA, window.location, $newContent)//*a

			}//ren
		}//ready()

## 2. SPA allows for page transitions

If you navigate <https://www.masons-foundation.org/home/home2/> you can see a page effect.
Having interactive navigation makes the user more engaged with the content of your web app.

## 3 Take it easy on yourself

Before SPA, you could use PHP|ASP|JSP or such to reuse code, such as top menu and footer.
Now we use a concept of App-Shell:

![](/post/SPA/shell.png)

And easy way to do that is via pug: <https://www.youtube.com/watch?v=wzAWI9h3q18>


