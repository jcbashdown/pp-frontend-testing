var _ = require('lodash');
var moment = require('moment');
var format = require('./formatter')(moment, _);
var renderC3 = require('./renderc3');

var dashboardSlug = window.location.pathname.split('/').pop();

(function (format) {

  var module_tables = document.querySelectorAll('section.module');

  var table_data = [];
  [].forEach.call(module_tables, function (table) {
    var header_cells = table.querySelectorAll('th'),
        rows = table.querySelectorAll('tr'),
        axes = new Array(header_cells.length);

    [].forEach.call(header_cells, function (header_cell, i) {
      axes[i] = {
        format_options: JSON.parse(header_cell.getAttribute('data-format')),
        data: [header_cell.innerText]
      }
    });

    [].forEach.call(rows, function (row) {
      [].forEach.call(row.querySelectorAll('td'), function (cell, i) {
        axes[i].data.push(cell.getAttribute('data-raw'));
      });
    });
    var table_id = table.getAttribute('id');
    table_data.push({'rows': rows, 'axes': axes, 'table_id': table_id});
  });
  /*console.log(JSON.stringify(table_data, null, 2));*/
  console.log(table_data);
  renderC3(table_data, format);


})(format);
