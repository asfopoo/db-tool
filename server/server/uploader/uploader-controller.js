var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
app.use(bodyParser.json());

var jsonResult;
var check = 0;


const Sequelize = require('sequelize');
const sequelize = new Sequelize('returnlogic-lead-gen', 'admin', 'p455w0rd', {
  host: '10.10.1.214',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

exports = module.exports = function uploaderController(leadGenElistModel){
  return [
 {
    route: '/uploader',
    method: 'POST',
    handler(req, res) {

      console.log("EXECUTING UPLOADER");
    return new Promise((resolve, reject) => {
      var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
          cb(null, uploadDirectory); ///tells where to store uploaded file
          //console.log(file);
        },
        filename: function (req, file, cb) {
          var datetimestamp = Date.now();
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
      });
      var upload = multer({ //multer settings
        storage: storage,
        fileFilter: function (req, file, callback) { //file filter
          if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) { //checks to ensure file is excel sheet
            return callback(new Error('Wrong extension type'));
          }
          console.log("VALID");
          callback(null, true);
        }
      }).single('file');
      var exceltojson;
      upload(req,res,function(err){
        if(err){
          res.json({error_code:1,err_desc:err});
          return;
        }
        /** Multer gives us file info in req.file object */
        if(!req.file){
          res.json({error_code:1,err_desc:"No file passed"});
          return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
          exceltojson = xlsxtojson;
        } else {
          exceltojson = xlstojson;
        }
        try {
          exceltojson({
            input: req.file.path,
            output: null, //'/myfile.json', //
            lowerCaseHeaders:true
          }, function(err,result){
            if(err) {
              return res.json({error_code:1,err_desc:err, data: null});
            }
            //res.json({error_code:0,err_desc:null, data: result}); //displays the json result... not needed necessarily
            jsonResult = result;
            resolve(result);
          });
        } catch (e){
          res.json({error_code:1,err_desc:"Corupted excel file"});
        }})
    })
      .then(function(result) { /// result == uploaded excel sheet as an object
        return new Promise((resolve, reject) => {
          //console.log("resutlllllltttt = " + JSON.stringify(result[0]));
          console.log("UPDATING");
          return  leadGenElistModel.findAll().then(function(result) {
            const promises = [];
            console.log(jsonResult[1].hasOwnProperty('rowid'));

              for (let j = 0; j < jsonResult.length; j++) {
                  if (jsonResult[j].hasOwnProperty('rowid')) { //row id assiged by debby, if result has no row id it was never in debby
                    promises.push(leadGenElistModel.update(
                      {
                        domain: jsonResult[j].domain,
                        companyname: jsonResult[j].companyname,
                        vertical: jsonResult[j].vertical,
                        companyphone: jsonResult[j].companyphone,
                        companytwitter: jsonResult[j].companytwitter,
                        companyfacebook: jsonResult[j].companyfacebook,
                        companylinkedin: jsonResult[j].companylinkedin,
                        address: jsonResult[j].address,
                        address2: jsonResult[j].address2,
                        city: jsonResult[j].city,
                        state: jsonResult[j].state,
                        zip: jsonResult[j].zip,
                        country: jsonResult[j].country,
                        ecommerceplatform: jsonResult[j].ecommerceplatform,
                        visualreview: jsonResult[j].visualreview,
                        returnsolution: jsonResult[j].returnsolution,
                        typeofproduct: jsonResult[j].typeofproduct,
                        visualreviewnotes: jsonResult[j].visualreviewnotes,
                        returnslisturl: jsonResult[j].returnslisturl,
                      },
                      {where: {domain: jsonResult[j].domain}}
                    ))
                  /*else {
                    /!*  promises.push(sequelize.query(
                        'INSERT into public.elist (domain, companyname, vertical, companyphone, companytwitter, companyfacebook, companylinkedin, address, address2, city, state, zip, country, ecommerceplatform, visualreview, returnsolution, typeofproduct, visualreviewnotes)'
                        + ' values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        {
                          raw: true,
                          replacements: [jsonResult[i].domain, jsonResult[i].companyname, jsonResult[i].vertical, jsonResult[i].companyphone, jsonResult[i].companytwitter, jsonResult[i].companyfacebook, jsonResult[i].companylinkedin, jsonResult[i].address, jsonResult[i].address2, jsonResult[i].city, jsonResult[i].state, jsonResult[i].zip, jsonResult[i].country, jsonResult[i].ecommerceplatform, jsonResult[i].visualreview, jsonResult[i].returnsolution, jsonResult[i].typeofproduct, jsonResult[i].visualreviewnotes]
                        }));*!/
                    console.log("twos");
                    return promises.push(leadGenElistModel.create(jsonResult[j]))
                  }*/
                }
                else{
                    for(let k = 0; k < result.length; k++) {
                      if (jsonResult[j].domain === result[k].domain) { //if domains match a duplicate will be added to debby
                        //console.log("A duplicate lead has been created -> " + jsonResult[j].domain);
                        check = 1;
                      }
                    }
                    if(check === 1){ // takes care of duplicates
                      check = 0;
                    }
                    else {
                      promises.push(leadGenElistModel.create(jsonResult[j]));
                    }
                  }
        /*        else{ //// updates the rest since the others were all created from jsonResult
                  if (result[i].domain === jsonResult[j].domain) {
                    console.log("threes");
                    return promises.push(leadGenElistModel.update(
                      {
                        domain: jsonResult[j].domain,
                        companyname: jsonResult[j].companyname,
                        vertical: jsonResult[j].vertical,
                        companyphone: jsonResult[j].companyphone,
                        companytwitter: jsonResult[j].companytwitter,
                        companyfacebook: jsonResult[j].companyfacebook,
                        companylinkedin: jsonResult[j].companylinkedin,
                        address: jsonResult[j].address,
                        address2: jsonResult[j].address2,
                        city: jsonResult[j].city,
                        state: jsonResult[j].state,
                        zip: jsonResult[j].zip,
                        country: jsonResult[j].country,
                        ecommerceplatform: jsonResult[j].ecommerceplatform,
                        visualreview: jsonResult[j].visualreview,
                        returnsolution: jsonResult[j].returnsolution,
                        typeofproduct: jsonResult[j].typeofproduct,
                        visualreviewnotes: jsonResult[j].visualreviewnotes
                      },
                      {where: result[i].companyname === jsonResult[j].companyname && result[i].domain === jsonResult[j].domain}
                    ))
                  }
                }*/
              }
            console.log("UPDATED");
            return resolve(Promise.all(promises));
            //return leadGenElistModel.create(jsonResult[0]);
          })
        });
         /* for (let i = 0; i < result.length; i++){
            for (let j = 0; j< jsonResult.length; j++){
               if(result[i].companyname === jsonResult[j].companyname){
                 return promises.push(leadGenElistModel.update(jsonResult));
               }
               else{
                 return promises.push(leadGenElistModel.create(jsonResult));
               }
            }
          }*/
          //console.log("completed");
          //return (Promise.all(promises));
       /* const results = result.map(record => {
          return leadGenElistModel.find({
            where: {
              "rowid": record.rowid,

            }
          }).then(dbModel => {
            console.log(dbModel);
            if (dbModel === null) {
              console.log("createdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");

              return leadGenElistModel.create(record);
            }
            else {
              console.log("updateddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");

              return leadGenElistModel.update(record);
            }
          })
        });
        resolve(Promise.all(results));*/
      })
          .then(function (result) {
            return result;
          }).catch(err => {
            console.log(err);
            return res.status(500).send(err);
          });
    },
  },
  ]
};

exports['controller-name'] = 'uploaderController';

exports['controller-dependencies'] = [
  'leadGenElistModel',
];