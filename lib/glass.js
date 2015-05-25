#! /usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var Liftoff = require('liftoff');
var glassy = require('../src/main.js');
var MyApp = new Liftoff({name:'glassy', configName : 'glassfile'});

var invoke = function (env) {
  // attempt to load from local glassy to get the default template
  new glassy(env);
};

MyApp.launch({
  cwd: argv.cwd
}, invoke);

