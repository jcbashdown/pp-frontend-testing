var d3 = require('d3');
var epoch = require('./lib/epoch.min.js');

module.exports = function (table_data, format) {
  table_data.forEach(function (module) {
    var table_id = module.table_id;
    var table = document.querySelectorAll('section#'+table_id+' > .epoch')[0];
    var axes = module.axes;
    console.log(JSON.stringify(axes, null, 2));
    /*table.appendChild(chart.element);*/
  });
};
