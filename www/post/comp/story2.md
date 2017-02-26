### Star rating component example

Here is what we will make into a component:
- https://github.com/nashio/star-rating-svg
First we draft a page without a component:
<https://1595566120.rsc.cdn77.org/post/comp/index0.html>

If you view source, you can see that by using components, we can develop interactive applications that are easier to maintain. The page markup looks cleaner, since the custom tag encapsulates it's code, and the component could be re-useable.

There are a few web component libraries, and you'll end up learning a few, as it is a religious issue (ex: tabs vs spaces, vi vs emacs). Since you will have to know a few, easiest to learn is RIOT js, so that is what we will use.

Since I want to be loosely coupled to the particular web component's library architecture, I will use an independent observer in case web component needs to send a message to the containing page (<http://github.com/millermedeiros/js-signals/wiki> )

So back to our code, since we have working page, we just cut that code and put in component, with the RIOT syntax; view source of the component:
- <http://1595566120.rsc.cdn77.org/_uiComps/star-rating.html>

And use it on a page: <https://1595566120.rsc.cdn77.org/post/comp/>
The page should be now easier to maintain. 

For the example, I did not encapsulate the resources (ex: .js file), you would normally use something like <http://github.com/muicss/loadjs> synchronized with the component's mount event. Also, you would make the component not visible till ready - to avoid page jank. That should get you on the road to mastery.
![](/post/comp/master.gif) 

More on RIOT js: <http://channel9.msdn.com/Blogs/semjs/semjs20160411rio>

### Best practices and conclusion
When doing mobile version of the page, such as AMP, you can use iframe, like these guys did for example: 
![](/post/comp/amp.png) 

- Draft a working page w/o component first
- Don't fetch data from component, fetch in page, and send to component
- Page 'sets' data to component, component emits events to notify page
- Encapsulate
- Use BEM seized components.
- To avoid page jank, try to size the component in the page CSS, and hide the component till ready.
- Don't nest components
- A button is not a component, use something BEM size.
- Page is not a component
- Plan and try to re-use components
- Components should be served and hosted from a component web server, behind a CDN.
- Component should load it's own uniqe resources, ex: .js. Common resources such as jQuery will be loaded ahead. 
- Component should pick up the style of the page, so when you put it on another web site, it looks 'native'.
- UI Designer should implement the web components

Keep in mind
<http://codepen.io/AllThingsSmitty/pen/pNLVWm>
Are you inspired?


