var loader = require('./loader'),
    templater = require('./templater'),
    fs = require('fs'),
    path = require('path');

var templateFn = null;

function getLocals(config, files) {
    var locals = {
       relative: config.relative || ''
    };

    for(var key in config.paths) {
        locals[key] = files[key].files || [];
    }

    return locals;
}

var glassy = function(env) {
  var config = require(env.configPath);

  templateFn = templater.template(config.template || './node_modules/glassy/lib/default_template.jade');

  loader.load(config.paths, function(er, files) {

    var html = templateFn(getLocals(config, files));

    var outputPath = path.resolve(env.configBase, config.output);
    fs.writeFileSync(outputPath, html);
  });
};

module.exports = glassy;
