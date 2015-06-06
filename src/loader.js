var fs = require('vinyl-fs'),
    path = require('path'),
    map = require('map-stream');

var keys = {};

function checkFinish(completion) {
  for(var key in keys) {
      if(keys[key].finished !== true) {
        return;
      }
  }

  completion(null, keys);
}

function loadMatchingFiles(pattern, key, cb) {
  fs.src(pattern, {read: false})
    .pipe(map(function(file, streamcb) {
      var relativePath = path.relative(file.base, file.path);
      var fixedPath = relativePath.replace(path.sep, '/');
      key.files.push(fixedPath);
      streamcb(null, file);
    }))
    .on('end', function() {
      key.finished = true;
      checkFinish(cb);
    });
}

function load(patterns, cb) {
  keys = {};
  for(var index in patterns) {
    keys[index] = {files: [], finished: false};
  }

  for(var p in patterns) {
    loadMatchingFiles(patterns[p], keys[p], cb);
  }
}

module.exports = {
    load: load
};
