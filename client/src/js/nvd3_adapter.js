module.exports = function (module_tables) {
  var table_data = [];
  [].forEach.call(module_tables, function (table) {
    var rows = table.querySelectorAll('tr.data'),
        axes = [];

    [].forEach.call(rows, function (row) {
      var x_value = row.querySelectorAll('td.x')[0].getAttribute('data-raw');
      var y_value = row.querySelectorAll('td.y')[0].getAttribute('data-raw');
      x_value = new Date(x_value);
      axes.push({
        'x': x_value,
        'y': y_value
      })
    });
    var table_id = table.getAttribute('id');
    table_data.push({'rows': rows, 'axes': axes, 'table_id': table_id});
  });
  return table_data;
};
