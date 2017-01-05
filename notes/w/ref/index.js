//http://github.com/bitinn/node-fetch
const DATASTORE = require('@google-cloud/datastore');
const fetch = require('node-fetch')
const bluebird = require('bluebird')

// -----------------------------------

//aws simple db
//gae datastore
// https://cloud.google.com/datastore/docs/
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/0.6.0/datastore


const PROJECT_ID = 'refref2-154623'

const datastore = DATASTORE({
	projectId: PROJECT_ID,
	keyFilename: './apiServiceKey.json'
})


function getAllBooks(callback) {
	var query = datastore.createQuery(['Book']);
	datastore.runQuery(query, callback);
}

function getUserBooks(userId, callback) {
	var query = datastore.createQuery(['Book']).filter('userId', '=', userId);
	datastore.runQuery(query, callback);
}

function addBook(title, author, coverImageData, callback) {
	var entity = {
		key: datastore.key('Book'),
		data: {
		title: title,
		author: author,
		}
	}
	datastore.save(entity, callback);
}

function deleteBook(bookId, callback) {
	var key = datastore.key(['Book', parseInt(bookId, 10)])

	datastore.get(key, function(err, book) {
		if (err) return callback(err)
		datastore.delete(key, callback)
	})
}


// -----------------------------------
const USER = 'vicmasons@gmail.com'
const KEY = 'durY/UjgRYtkpCkWbvDWFFF/b2vQNg8SWAS+EwqirwQ='

const DS = '1237'
const SECRET = 'aec8e29d671dfe029efe4ee839495d01955e9036'
// -----------------------------------
let send_ = {
	'datastoreId': DS,
	'rfid_id': 123,
	'item_id': 123,
	'item_desc': 'yellow rubber ducky',
	'location_id': 321,
	'location_desc': '123 Main St',
	'epoch_event': (new Date).getTime(),
	'contract' : 'cc',
	'exception': 'cc'
}


function fed() {
fetch('https://api.tierion.com/v1/records', { 
	method:	'POST',
	body:	JSON.stringify(send_),
	headers: {
		'X-Username': USER
		,'X-Api-Key': KEY
		,'Content-Type': 'application/json'
		}
	})
	.then(function(res) {
		return res.json()
	}).then(function(json) { //id
		console.log(json.id) 		
	})
}