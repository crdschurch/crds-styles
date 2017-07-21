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
  this.compile('compressed');
}

CRDS.Styles.prototype.compile = function(style) {
  var isCompressed = style == 'compressed' ? true : false;
  sass.render({
    file: './assets/stylesheets/bootstrap.scss',
    outFile: (isCompressed ? this.minOutputFile : this.outputFile),
    sourceMap: true,
    sourceComment: 'true',
    includePaths: [ 'assets/', 'node_modules/' ],
    outputStyle: style
  }, this.bind(this.onCompile, this));
};

CRDS.Styles.prototype.onCompile = function(error, result, zzz) {
  console.log(zzz);

  if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  } else {

    fs.ensureDir('./dist')
      .then(this.bind(function() {
        // console.log(JSON.stringify(result.stats));
        // this.writeFile(result.css, outputFile);
        // this.writeFile(result.map, outputFile + '.map');
      }, this))
      .catch(this.bind(function(err) {
        console.error(err);
      }, this));
  }
};

CRDS.Styles.prototype.writeFile = function(payload, outputFile) {
  fs.writeFile(outputFile, payload, function(err){
    if(!err){
      //file written on disk
    }
  });
}

new CRDS.Styles();