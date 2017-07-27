var sass = require('node-sass');
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var pkgJson = require('../package.json');
var argv = require('yargs').argv;
var AWS = require('aws-sdk');

// ------------------------------------------------- |

var CRDS = {};

CRDS.Styles = function() {
  this.setup();
  this.init();
};

CRDS.Styles.prototype.setup = function() {
  var slug = './dist/crds-styles-' + pkgJson.version;
  this.outputFile = slug + '.css';
  this.minOutputFile = slug + '.min.css';
  this.debug = argv.debug || false;

  AWS.config.update({
    accessKeyId: process.env.CRDS_STYLES_AWS_ACCESS_KEY,
    secretAccessKey: process.env.CRDS_STYLES_AWS_SECRET_KEY
  })
}

CRDS.Styles.prototype.init = function() {
  if(argv.build) {
    this.build();
  } else if(argv.publish) {
    this.publish();
  }
}

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

// ------------------------------------------------- |

CRDS.Styles.prototype.publish = function() {
  this.log('publish()');
  this.s3 = new AWS.S3();
  var directoryPath = './dist';
  fs.readdir(directoryPath, function(err, files) {
    if (err) {
      this.log('Cannot read directory ' + directoryPath + ' or doesn\'t exist')
    } else {
      async.mapLimit(files, 5, this.upload.bind(this))
    }
  }.bind(this));
}

CRDS.Styles.prototype.upload = function(filename) {
  var stream = fs.createReadStream('./dist/' + filename);
  var ext = path.extname(filename);
  var mime_type = ext == '.css' ? 'text/css' : 'application/octet-stream'
  var params = {
    Bucket: process.env.CRDS_STYLES_S3_BUCKET,
    Key: 'styles/' + filename,
    ContentType: mime_type,
    Body: stream,
    ACL: 'public-read'
  };
  this.s3.upload(params, function(err, data) {
    console.log(err, data);
  });
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
