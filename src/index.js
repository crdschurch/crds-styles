var sass = require('node-sass');
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var pkgJson = require('../package.json');
var argv = require('yargs').argv;
var AWS = require('aws-sdk');
var tildeImporter = require('node-sass-tilde-importer');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var _ = require('lodash');
var glob = require('glob');

// ------------------------------------------------- |

var CRDS = {};

CRDS.Styles = function() {
  this.setup();
  this.build();
};

CRDS.Styles.prototype.setup = function() {
  var slug = './dist/crds-styles-' + pkgJson.version;
  this.outputFile = slug + '.css';
  this.minOutputFile = slug + '.min.css';
  this.debug = argv.debug || false;
}

CRDS.Styles.prototype.bind = function(fn, me) {
  return function() {
    return fn.apply(me, arguments);
  };
};

CRDS.Styles.prototype.build = function() {
  this.log('build()');
  this.compile('nested');
  this.copySVGs();
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
    importer: tildeImporter,
    outputStyle: style
  }, function(error, result){
    this.onCompile(error, result, filename)
  }.bind(this));
};

CRDS.Styles.prototype.copySVGs = function() {
  fs.ensureDir('./dist/svgs');
  glob('./assets/**/*.svg', {}, (err, files) => {
    files.forEach((file) => {
      var filename = this.filenameFromPath(file);
      var newFilename = this.fileBasename(file) + '-' + pkgJson.version + '.' +
                        this.fileExt(file);
      var newFile = './dist/svgs/' + newFilename;
      fs.copySync(path.resolve(__dirname, '../' + file), newFile);
      console.log(newFile);
    });
  });
}

CRDS.Styles.prototype.filenameFromPath = function(path) {
  return _.last(path.split('/'));
}

CRDS.Styles.prototype.fileExt = function(path) {
  return _.last(path.split('.'));
}

CRDS.Styles.prototype.fileBasename = function(path) {
  return this.filenameFromPath(path).replace('.' + this.fileExt(path), '');
}

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
        postcss([ autoprefixer ]).process(result.css).then((css) => {
          css.warnings().forEach((warn) => {
            this.log(warn.toString());
          });
          this.writeFile(css, filename);
          this.writeFile(result.map, filename + '.map');
        });
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

// ------------------------------------------------- |

CRDS.Styles.prototype.log = function(str) {
  if(this.debug) {
    console.log(str);
  }
}

CRDS.Styles.prototype.error = function(str) {
  console.error(str);
}

new CRDS.Styles();
