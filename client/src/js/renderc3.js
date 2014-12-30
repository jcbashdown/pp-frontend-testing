var c3 = require('c3');

module.exports = function (table_data, format) {
  table_data.forEach(function (module) {
    var table_id = module.table_id;
    var table = document.querySelectorAll('section#'+table_id+' > .c3')[0];
    var axes = module.axes;
    var chart = c3.generate({
      data: {
        x: axes[0].data[0],
        xFormat: '%Y-%m-%dT%H:%M:%S+00:00',
        columns: axes.map(function (axis) {
          return axis.data;
        })
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: { format: format.bind(null, axes[0].format_options) }
        },
        y: {
          tick: { format: format.bind(null, axes[1].format_options) }
        }
      }
    });
    table.appendChild(chart.element);

  });
};
