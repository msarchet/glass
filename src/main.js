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
    // make sure 

    var html = templateFn(self.getLocals(config, files));

    var outputPath = path.resolve(env.configBase, config.output);
    fs.writeFileSync(outputPath, html); 
  });
}

glassy.prototype.getLocals = function(config, files) {
    var locals = {
       relative : config.relative || '' 
    };

    for(var key in config.paths) {
        locals[key] = files[key].files || []
    }

    return locals;
}

module.exports = glassy;
