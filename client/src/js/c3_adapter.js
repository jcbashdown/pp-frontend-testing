module.exports = function (module_tables) {

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
    console.log('flibble');
    console.log(JSON.stringify(axes, null, 2));
    console.log('^flibble');
    table_data.push({'rows': rows, 'axes': axes, 'table_id': table_id});
  });
  return table_data;
};
