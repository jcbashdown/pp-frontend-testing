var _ = require('lodash');
var moment = require('moment');
var format = require('./formatter')(moment, _);
var c3Adapter = require('./c3_adapter');
var epochAdapter = require('./epoch_adapter');
var nvd3Adapter = require('./nvd3_adapter');
var highchartsAdapter = require('./highcharts_adapter');
var renderC3 = require('./renderc3');
var renderEpoch = require('./renderepoch');
var renderHighCharts = require('./renderhighcharts');
var renderNvD3 = require('./rendernvd3');

var dashboardSlug = window.location.pathname.split('/').pop();

(function (format) {

  var module_tables = document.querySelectorAll('section.module');

  var table_data = c3Adapter(module_tables);
  renderC3(table_data, format);

  var table_data = nvd3Adapter(module_tables);

  renderNvD3(table_data, format);

  var table_data = epochAdapter(module_tables);

  renderEpoch(table_data, format);

  var table_data = highchartsAdapter(module_tables);

  renderHighCharts(table_data, format);

})(format);
