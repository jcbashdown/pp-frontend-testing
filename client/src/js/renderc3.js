var c3 = require('c3');

module.exports = function (table_data, format) {
  table_data.forEach(function (module) {
    var table = module.table_element;
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

    table.parentNode.appendChild(chart.element);

  });
};
