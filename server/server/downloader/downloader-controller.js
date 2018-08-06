



exports = module.exports = function uploaderController(leadGenMasterCleanModel){
  return [
    {
      route: '/downloader',
      method: 'GET',
      handler(req, res) {

          console.log("downloader working");
      }
    },
  ]
};

exports['controller-name'] = 'downloaderController';

exports['controller-dependencies'] = [
  'leadGenMasterCleanModel',
];