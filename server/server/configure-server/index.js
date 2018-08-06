const cors = require('cors');

const multer = require('multer');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const compression = require('compression');

const passport = require('passport');

const expressBoom = require('express-boom');

const { join } = require('path');

const uploadDirectory = join(__dirname, '../uploads');

module.exports = function configureServer(){
  this.server.use(function(req, res, next){
    //console.log(req);
    return next();
  });

  this.server.use(compression());

  this.server.use(cors());

  this.server.use(cookieParser());

  this.server.use(bodyParser.urlencoded({
    extended: false,
  }));

  this.server.use(bodyParser.json({
    limit: '50mb',
  }));

  this.server.use(passport.initialize());

  this.server.use(expressBoom());

  var storage = multer.diskStorage({ //Duplicated in uploader-controller BUT needed in both places
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
       console.log(file);
       console.log("configure-server");
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
  });
  var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
      if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
        return callback(new Error('Wrong extension type'));
      }
      console.log("VALID");
      callback(null, true);
    }
  }).single('file');   ///////////////////////////////////////////////////////////////////////////////

  this.server.use(upload);

  this.server.use(function(req, res, next){
    Object.assign(res, {
      sendBoom(boomMessage){
        const {
          payload: {
            statusCode,
            message,
          },
        } = boomMessage.output;


        return res.status(statusCode).json({
          message,
        });
      },
      jsonSuccess(msg){
        return res.status(200).json(msg);
      },
    });

    return next();
  });

  this.server.use(function(req, res, next){
    return next();
  });
};
