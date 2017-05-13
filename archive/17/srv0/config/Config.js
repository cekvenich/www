'use strict'
class Config {
get PORT() {return 8081}

// CDN allowed ip

// google cloud:
get CLOUD_PROJECT_ID() {return 'bapo-01'}
get CLOUD_keyFilename(){return './sroute/ds/YourServiceKey.json' }

// tables:
get MEMBERS_TABLE() {return 'MEM-2004'}
get SITE_TABLE() {return 'SITE-01'}
get SITE_CTRIB_TABLE() {return 'SITE-CTRIB-01'}
get CONTENT_TABLE() {return 'CON-2002'}

get mapi_key() {return 'key-f1b2dcd4c4da8dba0d141870debd47a1'}
get mdomain() {return 'masons-foundation.org'}

get SALT (){return 'changeMe!23'} // old passwords must be reset by users

} module.exports = Config