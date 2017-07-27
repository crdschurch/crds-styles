var sass = require('node-sass');
var fs = require('fs-extra');
var pkgJson = require('../package.json');

var CRDS = {};

CRDS.Styles = function() {
  var slug = './dist/crds-styles-' + pkgJson.version;
  this.outputFile = slug + '.css';
  this.minOutputFile = slug + '.min.css';
  this.build();
};

CRDS.Styles.prototype.bind = function(fn, me) {
  return function() {
    return fn.apply(me, arguments);
  };
};

CRDS.Styles.prototype.build = function() {
  this.compile('nested');
  setTimeout(function() {
    this.compile('compressed');
  }.bind(this), 1000);
}

CRDS.Styles.prototype.compile = function(style) {
  var filename = style == 'compressed' ? this.minOutputFile : this.outputFile;
  sass.render({
    file: './assets/stylesheets/bootstrap.scss',
    outFile: filename,
    sourceMap: true,
    sourceComment: 'true',
    includePaths: [ 'assets/', 'node_modules/' ],
    outputStyle: style
  }, function(error, result){
    this.onCompile(error, result, filename)
  }.bind(this));
};

CRDS.Styles.prototype.onCompile = function(error, result, filename) {
  if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  } else {
    fs.ensureDir('./dist')
      .then(function() {
        // console.log(result.stats);
        this.writeFile(result.css, filename);
        this.writeFile(result.map, filename + '.map');
      }.bind(this))
      .catch(function(err) {
        console.error(err);
      }.bind(this));
  }
};

CRDS.Styles.prototype.writeFile = function(payload, outputFile) {
  fs.writeFile(outputFile, payload, function(err){
    if(!err){
      console.log(outputFile);
    }
  });
}

new CRDS.Styles();