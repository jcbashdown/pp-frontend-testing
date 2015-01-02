/*var d3 = require('d3');*/

module.exports = function (table_data, format) {
  var chart;
  table_data.forEach(function (module) {
    nv.addGraph(function () {
      var table_id = module.table_id;
      var axes = module.axes;
      var data = [
        { key: 'Layer', values: axes, color: '#2222ff' }
      ];
      chart = nv.models.lineChart()
          .options({
              transitionDuration: 300,
              useInteractiveGuideline: true
          })
      ;
      chart.xAxis
          .axisLabel('Time (s)')
          .tickFormat(d3.format(',.1f'));
      chart.yAxis
          .axisLabel('Voltage (v)')
          .tickFormat(d3.format(',.2f'));
      console.log('floooo');
      console.log(data);
      console.log('^floooo');
      d3.select('section#'+table_id+' > .nvd3').append('svg')
          .datum(data)
          .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
    });
  });
};
