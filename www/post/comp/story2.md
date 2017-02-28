### Star Rating Component Example

We will turn a "start rating" feature into a Web Component:
- https://github.com/nashio/star-rating-svg

First we draft a page without a component. Inspect it here:
<https://1595566120.rsc.cdn77.org/post/comp/index0.html>

Each star 'element' has an intial rating. You can mouse-over or click to change the rating.

View the HTML source. See the non-componentized JavaScript constructor $('.my-rating').starRating...( This 
initializes the star elements.
Also see the calls to  $('#rating...').starRating('setRating', ...). They set initial values of the non-componentized 
star elements.

By using components we can develop interactive applications that are easier 
to maintain. The compoment will encapsulate its code. As a result, the page markup will look cleaner 
and if done right, the component will be re-useable.

RIOT.js is one of several web component libraries. We use it here because it is easy to learn. You can always
study other component libraries in a next step.

We want to be loosely coupled to the particular web component's library architecture. For this, we use an 
independent observer in case the web component needs to send a message to the containing page 
(<http://github.com/millermedeiros/js-signals/wiki> )

Now it's time to create the compontent with the RIOT syntax. View the HTML source of this URL to see the component code:
- <http://1595566120.rsc.cdn77.org/_uiComps/star-rating.html>

And use it on a page: <https://1595566120.rsc.cdn77.org/post/comp/>
The page should be now easier to maintain. 

To avoid page jank, we ensure that the component is not visible until ready. In this example 
we did not encapsulate the resources (ex: .js file). You would normally use something like 
<http://github.com/muicss/loadjs> synchronized with the component's mount event. 

This should get you on the road to mastery.
![](/post/comp/master.gif) 

More on RIOT js: <http://channel9.msdn.com/Blogs/semjs/semjs20160411rio>

### Best Practices and Conclusion

1. Do a working page without component first.
2. Don't fetch data from component. Fetch in page, and send to component.
3. Use BEM-sized components. Page is not a component, neither is Button.
4. To avoid page jank, try to size the component in the page CSS and hide the component until ready.
5. Make components emit events to notify the page.
6. Don't nest components.
7. Build components for re-use.
8. Components should be served and hosted from a component web server, behind a CDN.
9. Components should load their own uniqe resources, ex: .js. Common resources such as jQuery will be loaded ahead. 
10. Components should pick up the style of the page. When you put it on another web site it should look 'native'.
11. UI Designer should implement the web components.

When doing mobile version of the page, such as AMP, you can use iframes, like these guys did for example: 
![](/post/comp/amp.png) 

Keep in mind
<http://codepen.io/AllThingsSmitty/pen/pNLVWm>
Are you inspired?


