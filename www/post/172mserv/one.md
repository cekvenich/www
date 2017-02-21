
# Fetch and Middleware API/MicroServices

Here we will fetch() and use a middleware API. Fetch() is the new js API that replaces Ajax/XHR. For older browsers it has a polyfill listed on CanIUse.com.

## 0. (Warm up) Deploy to cloud.

Running your own back end or database software is not a good practice. There are many back end providers for Node+Express and database api: Firebase, Backendless, AWS and Google Cloud. You choice may depends on what back end you will need, as each cloud has a different back end offering. For example, do you like GAE BigQuery/DataStore or AWS Simple DB offerings. You can use any cloud/BaaS that you like, but avoid hosting your own servers, ex: Mongo in the cloud - where you have to scale or secure it. Much better to Bass

Here are some docs on Google Cloud:
- <http://cloud.google.com/appengine/docs/flexible/nodejs>
- <https://github.com/GoogleCloudPlatform/google-cloud-node>

		gcloud init 
		gcloud app deploy -v 1

Once you know how to deploy "Hello World" express to (Google) cloud, go to the next step. We will next deploy our micro service to the cloud.

## 1. View the source of this page, and click the button. This will help you review how to fetch() from a browser - against a working service. So you know any error is not on client side.
	
		function tstGet() {
			fetch('https://rch-demo.appspot.com/membersPg/mem/', { //1 call
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

Run this code in a browser, on a button clicked event to *fetch* some data. Optionally, test, ex: QUnit. 

## 2. Lets deploy our microservice.

Download and expand: <https://www.masons-foundation.org/zCDN/mserv.zip>

Deploy this code as node service to your (Google) cloud. Test, ex: QUnit.

If you are not able to get above microservice to work, go to next step anyway.

### 3. Lets do a code review of the microservice. 

We recommend that the routes match url on the front end. So if you are calling the microservice from /home/member then the route in express should be /home/member + a descriptive name of the function. Some REST zelots name routes based on back end entities. We believe it's a better practice to mirror the front end instead. The microservice will deal with entities as needed and shield the implementation away from the front end reqs. The sample and the index.js looks like this:

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
		const fake = require('./fake')

		router.all('/mem', function (req, res) {
			var ret = fake._fakeBind()
			res.status(200).send(JSON.stringify(ret))
		})
		module.exports = router

If there is an error, return status that is not 200. 
And our back end:


		exports._fakeBind = function() {
			let _people = {people: [{name: 'Jim'}, {name: 'Pedro'}] }
			return _people
		}

We fake a DB for now (vs using Google Cloud DataStore). And of course you can add other middleware, like GZIP and setup JWT.


### 4. Full stack

Middleware also includes data binding for the front end team, such us jsRender, <http://github.com/corinis/jsForm>, datatables.net.

#### Tst 
Cekvenich Crkvencic Vic
