'use strict'
// vars -----------------------------------------------

const DIR = '../'

/* install -----------------------------------------------
http://moduscreate.com/better-builds-begin-with-broccoli/
http://solitr.com/blog/2014/02/broccoli-first-release/
http://blog.qmx.me/broccoli-is-good-for-you/
http://givan.se/broccolijs-from-scratch/
http://youtube.com/watch?v=VQio2Rl_74c
http://givan.se/broccolijs-from-scratch/


npm -g install broccoli-cli
cd my-project/_pre
npm init
npm install --save-dev broccoli
npm install broccoli-sass

npm install broccoli-funnel
npm install broccoli-merge-trees
npm install broccoli-concat
npm install broccoli-static-compiler
npm install broccoli-uglify-js

broccoli-watched-tree

*/
// imports -----------------------------------------------
const broccoli = require('broccoli')
const compileSass = require('broccoli-sass')

const Funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const concatenate = require('broccoli-concat')
const pickFiles = require('broccoli-static-compiler')
const uglifyJs = require('broccoli-uglify-js')

// configure -----------------------------------------------
var css = compileSass(['../_sass/'], 'main.sass', '../_sass/main.css')

var tree = broccoli.makeTree(DIR)
tree = compileSass(tree)
module.exports = tree


// run -----------------------------------------------
const builder = new broccoli.Builder(DIR)
builder.build().then(function(output){
	console.log(JSON.stringify(output))
})


//broccoli serve