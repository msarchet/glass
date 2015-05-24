var fs = require('vinyl-fs'),
  path = require('path'),
	liftoff = require('liftoff'),
	map = require('map-stream');

var keys = {};
module.exports = {
	load: load
};

function load(patterns, cb) {
  keys = {};
  for(var type in patterns) {
    keys[type] = {files : [], finished : false};
  }

  for(var type in patterns) {
    (function() {
      var _type = type;
      fs.src(patterns[_type], {read : false})
        .pipe(map(function(file, scb) {
          var relativePath = path.relative(file.base, file.path);
          var fixedPath = relativePath.replace(path.sep, '/');
          keys[_type].files.push(fixedPath);
          scb(null, file);
        }))
        .on('end', function() {
          keys[_type].finished = true;
          checkFinish(_type, cb)
        });
    })();
  }
}

function build(file, cb) {
}

function checkFinish(key, completion) {
  for(var key in keys) {
      if(keys[key].finished !== true) {
        return;
      }
  }

  completion(null, keys);
}

