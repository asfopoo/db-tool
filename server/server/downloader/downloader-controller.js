var json2xls = require('json2xls');
var path = require('path');
var fs = require('fs');
var FileSaver = require('file-saver');
var writeStream = fs.createWriteStream("file.xls");



exports = module.exports = function downloaderController(leadGenMasterCleanModel){
  return [
    {
      route: '/downloader',
      method: 'POST',
      handler(req, res) {

          console.log("downloader working");
          return leadGenMasterCleanModel.findAll({
            limit : req.body.leads
            }, {
            where: {
              visualreview: '',
            }
            }).then(function(result){ //gets all values from debby

            let xls = json2xls(result,{ //converts json to excel
              fields: ['rowid', 'domain', 'companyname', 'vertical', 'companyphone', 'companytwitter', 'companyfacebook', 'companylinkedin', 'address', 'address2', 'city', 'state', 'zip', 'country', 'ecommerceplatform', 'visualreview', 'returnsolution', 'typeofsolution', 'visualreviewnotes', 'returnslisturl'] //extracts only these fields
            });
            //let buffer = new Buffer(xls, 'binary');
            /*fs.writeFileSync('sheet.xlsx', xls, 'binary'); // writes file to platform
            res.download(__dirname + '/../../sheet.xlsx');*/
            //res.setHeader('Content-disposition', 'attachment; filename=sheet.xlsx'); //sets headers
            //res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            let contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            let fileName = "sheet.xlsx";
            return res.status(200).json({data: xls, contentType: contentType, fileName: fileName});
          }).catch(err => {
            console.log(err);
            return res.status(500).send(err); //yo shit broke
          })
      }
    },
  ]
};

exports['controller-name'] = 'downloaderController';

exports['controller-dependencies'] = [
  'leadGenElistModel',
];