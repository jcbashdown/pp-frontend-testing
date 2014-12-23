var data_formatter = require('../../lib/data_formatter.js');
var fs = require('fs');
var dashboard_response = fs.readFileSync(__dirname + '/../fixtures/dashboard_response.json', 'utf8');
var formatted_data = fs.readFileSync(__dirname + '/../fixtures/formatted_data.json', 'utf8');

describe('data_formatter', function () {
  it('should do something', function () {
    expect(data_formatter(dashboard_response)).to.deep.equal(formatted_data);
  });
});
