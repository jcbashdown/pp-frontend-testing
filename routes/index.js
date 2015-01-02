var data_format_functions = require('../lib/data_formatter.js');
var express = require('express');
var router = express.Router();
var _ = require('underscore'),
  Dashboard = require('performanceplatform-client.js');

/* GET home page. */
router.get('/:slug', function(req, res) {
  var dashboard = new Dashboard(req.params['slug']);
  dashboard.getDashboardMetrics().
    then(function(config){
      config = data_format_functions.format_data(config);
      res.render('index', { title: config['title'], modules: config['modules']});
    }); 
});

module.exports = router;
