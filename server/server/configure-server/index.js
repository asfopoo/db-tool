const cors = require('cors');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const compression = require('compression');

const passport = require('passport');

const expressBoom = require('express-boom');

module.exports = function configureServer(){
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
