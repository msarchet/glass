var loader = require('./loader'),
    templater = require('./templater');
var fs = require('fs'),
    path = require('path');

var templateFn = null;

var glassy = function(env) {
  var self = this;
  var config = require(env.configPath);

  templateFn = templater.template(config.template || './node_modules/glassy/lib/default_template.jade');

  loader.load(config.paths, function(er, files) {
    var html = templateFn({
        javascript : files.javascript.files, 
        css: files.css.files,
        relative: config.relative || ''
    });

    var outputPath = path.resolve(env.configBase, config.output);
    fs.writeFileSync(outputPath, html); 
  });
}

module.exports = glassy;
