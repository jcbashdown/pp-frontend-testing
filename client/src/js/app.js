var _ = require('lodash');
var moment = require('moment');
var format = require('./formatter')(moment, _);
var c3Adapter = require('./c3_adapter');
var renderC3 = require('./renderc3');
var renderEpoch = require('./renderepoch');

var dashboardSlug = window.location.pathname.split('/').pop();

(function (format) {

  var module_tables = document.querySelectorAll('section.module');

  var table_data = c3Adapter(module_tables);
  /*console.log(JSON.stringify(table_data, null, 2));*/
  console.log(table_data);
  renderC3(table_data, format);
  renderEpoch(table_data, format);


})(format);
