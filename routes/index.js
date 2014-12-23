var express = require('express');
var router = express.Router();
var _ = require('underscore'),
  Dashboard = require('performanceplatform-client.js');

/* GET home page. */
router.get('/:slug', function(req, res) {
  var dashboard = new Dashboard(req.params['slug']);
  dashboard.getDashboardMetrics().
    then(function(config){
      console.log(JSON.stringify(config, null, 2));
      res.render('index', { title: config['title'], modules: config['modules']});
    }); 
});

module.exports = router;
