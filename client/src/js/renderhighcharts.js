var HighCharts = require('highcharts-browserify');

module.exports = function (table_data, format) {
  var chart;
  table_data.forEach(function (module) {
    var table_id = module.table_id;
    var axes = module.axes;
    var finder = 'section#'+table_id+' > .highcharts';
    $(finder).highcharts({
      title: {
          text: 'Monthly Average Temperature',
          x: -20 //center
      },
      subtitle: {
          text: 'Source: WorldClimate.com',
          x: -20
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
          title: {
              text: 'Temperature (°C)'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          valueSuffix: '°C'
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
      },
      series: [{
          name: 'Tokyo',
          data: axes 
      }]
    });
  });
};
