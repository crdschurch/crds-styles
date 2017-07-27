var sass = require('node-sass');
var fs = require('fs-extra');
var pkgJson = require('../package.json');
var argv = require('yargs').argv;

var CRDS = {};

CRDS.Styles = function() {
  var slug = './dist/crds-styles-' + pkgJson.version;
  this.outputFile = slug + '.css';
  this.minOutputFile = slug + '.min.css';
  this.debug = argv.debug || false;
  if(argv.build) {
    this.build();
  }
};

CRDS.Styles.prototype.bind = function(fn, me) {
  return function() {
    return fn.apply(me, arguments);
  };
};

CRDS.Styles.prototype.build = function() {
  this.log('build()');
  this.compile('nested');
  setTimeout(function() {
    this.compile('compressed');
  }.bind(this), 1000);
}

CRDS.Styles.prototype.compile = function(style) {
  this.log('compile()');
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
  this.log('onCompile()');
  if (error) {
    this.log(error.status);
    this.log(error.column);
    this.log(error.message);
    this.log(error.line);
  } else {
    fs.ensureDir('./dist')
      .then(function() {
        // this.log(result.stats);
        this.writeFile(result.css, filename);
        this.writeFile(result.map, filename + '.map');
      }.bind(this))
      .catch(function(err) {
        this.error(err);
      }.bind(this));
  }
};

CRDS.Styles.prototype.writeFile = function(payload, outputFile) {
  this.log('writeFile()');
  fs.writeFile(outputFile, payload, function(err){
    if(!err){
      console.log(outputFile);
    }
  }.bind(this));
}

CRDS.Styles.prototype.log = function(str) {
  if(this.debug) {
    console.log(str);
  }
}

CRDS.Styles.prototype.error = function(str) {
  console.error(str);
}

new CRDS.Styles();
