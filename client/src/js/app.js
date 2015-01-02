var _ = require('lodash');
var moment = require('moment');
var format = require('./formatter')(moment, _);
var c3Adapter = require('./c3_adapter');
var epochAdapter = require('./epoch_adapter');
var renderC3 = require('./renderc3');
var renderEpoch = require('./renderepoch');
var renderNvD3 = require('./rendernvd3');

var dashboardSlug = window.location.pathname.split('/').pop();

(function (format) {

  var module_tables = document.querySelectorAll('section.module');

  var table_data = c3Adapter(module_tables);
  renderC3(table_data, format);

  var table_data = epochAdapter(module_tables);

  renderNvD3(table_data, format);

  renderEpoch(table_data, format);


})(format);
