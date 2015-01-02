module.exports = function (table_data, format) {
  table_data.forEach(function (module) {
    var table_id = module.table_id;
    var table = document.querySelectorAll('section#'+table_id+' > .epoch')[0];
    var axes = module.axes;
    var data = [
      { label: 'Layer', values: axes }
    ];
    var areaChartInstance = $('section#'+table_id+' > .epoch').epoch({
      type: 'area',
      data: data,
      axes: ['left', 'right', 'bottom']
    });
    /*console.log(JSON.stringify(axes, null, 2));*/
    /*table.appendChild(chart.element);*/
  });
};
