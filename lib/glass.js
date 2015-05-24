#! /usr/bin/env node
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var Liftoff = require('liftoff');
var loader = require('./loader');
var templater = require('./templater');
var MyApp = new Liftoff({name:'glassy', configName : 'glassfile'});
var templateFn;  

var invoke = function (env) {
  var config = require(env.configPath);
  templateFn = templater.template(config.templatePath)
  // load javascript, then load css
  loader.load(config.paths, function(er, files) {
    var html = templateFn({
        javascript : files.javascript.files, 
        css: files.css.files,
        relative: config.relative || ''
    });

    var outputPath = path.resolve(env.configBase, config.output);
    fs.writeFileSync(outputPath, html); 
  });
};

MyApp.launch({
  cwd: argv.cwd,
  require: argv.require,
  completion: argv.completion
}, invoke);

