
# Fetch and Middleware API/MicroServices

Here we will fetch() and use a middleware API. Fetch is the new API that replaces Ajax/XHR. For older browsers it has a polyfill listed on CanIUse.com.

## 0. (Warm up) Deploy to cloud.

Running your own back end or database software is not a good practice. There are many back end providers for Node+Express and database api: Firebase, Backendless, AWS and GAE. The last two seem a notch above. You choice may depends on what back end you will need, as each cloud has a different back end offering. For example, do you like GAE BigQuery/DataStore or AWS Simple DB offerings. You can use any cloud/BaaS that you like, but avoid hosting your own servers, ex: Mongo in the cloud - where you have to scale it. 

For GAE:
- <http://cloud.google.com/appengine/docs/flexible/nodejs/quickstart>
- <http://cloud.google.com/appengine/docs/flexible/nodejs>
- <https://github.com/GoogleCloudPlatform/google-cloud-node>

		gcloud init 
		gcloud app deploy -v 1

Once you know how to deploy "Hello World" to cloud, go to the next step. We will soon deploy a micro service to the cloud.

## 1. View the source of this page, and click the button. This will help you review how to fetch() from a browser - against a working service. So you know any error is not on client side.
	
	
		function tstGet() {
			fetch('http://jsonplaceholder.typicode.com/comments', { //1 call
					method: 'get'
				}).then(function(response) { //2 promise
					return (response.json())
					}).then(function(value) { //3
						// your code here
						console.log('back')
						console.log(JSON.stringify(value))
				}).catch(function(err) {
					console.log('error')
					console.log(err)
			})//fetch()
		}//()

Run this code on a button clicked event to *fetch* some data.

## 2. Lets deploy our microservice.

Download and expand: <https://www.masons-foundation.org/zCDN/mserv.zip>
Deploy this node service to your cloud.


### Once deployed, you can test that the microservice works via:
![](//www.masons-foundation.org/post/fetch/rest_test.png)

### Rest-Client is a browser plug in that can POST a request to your microservice.

If you are not able to test that the microservice we deployed works, read next step and come back to this step so it does work.

### 3. Lets do a code review of the microservice. 

We recommend that the routes match url on the front end. So if you are calling the microservice from /home/member then the route in express should be /home/member + a descriptive name of the function. Some REST people name routes based on back end entities. We believe it's a better practice to mirror the front end instead. The microservice will deal with entities as needed and shield the implementation from the front end. The most widley used software by full stack developer is *express*. Unzip the sample and the index.js looks like this:

		const middle = express()
		const membersPg = require('./front_routes/membersPg')
		const cfenv = require('cfenv')

		//set up filters chain ###################### 
		middle.use(bodyParser.json()) // parse application/json
		middle.use(cors())
		//routes ###################### 
		middle.use('/membersPg', membersPg) //front route 1 - match the front end

		// get the app environment from Cloud Foundry
		var appEnv = cfenv.getAppEnv();
		// start server on the specified port and binding host
		middle.listen(appEnv.port, '0.0.0.0', function() {
			console.log("server starting on " + appEnv.url)
		})

And the route:

		const router = express.Router()
		const fake = require('./backend/fake')

		router.post('/list', function (req, res) {
			var ret = fake._fakeBackCall()
			res.status(200).send(JSON.stringify(ret))
		})
		module.exports = router

If there is an error, return status that is not 200. 
And our back end:

		module.exports = {
			_fakeBackCall: function() {
			return {
			"data": [
				[
					"Cedric Kelly",
					"Senior Javascript Developer",
					"Edinburgh",
					"6224",
					"2012/03/29",
					"$433,060"
				],
				[
					"Airi Satou",
					"Accountant",
					"Tokyo",
					"5407",
					"2008/11/28",
					"$162,700"
				] ....

We fake a DB for now. Of course you can add other middleware, like GZIP and setup JWT.


### 4. Full stack

When writing middleware, you for sure should do integration testing, via QUnit for example as well as help with the data binding for the front end team, for example <http://github.com/corinis/jsForm>. Also check out list.js and datatables.net.

