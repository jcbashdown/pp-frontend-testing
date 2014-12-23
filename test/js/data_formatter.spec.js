var data_format_functions = require('../../lib/data_formatter.js');
var fs = require('fs');
var dashboard_response = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/dashboard_response.json', 'utf8'));
var formatted_data = fs.readFileSync(__dirname + '/../fixtures/formatted_data.json', 'utf8');

describe('format_data', function () {
  it('return the stripped down data', function () {
    console.log(JSON.stringify(data_format_functions.format_data(dashboard_response),null,2));
    expect(data_format_functions.format_data(dashboard_response)).to.deep.equal(formatted_data);
  });
});

describe('data_formatter.get_key_regexes', function () {
  var axes;
  beforeEach(function(){
    axes = {
      "y": [
        {
          "label": "Completion percentage",
          "format": {
            "type": "percent"
          },
          "key": "rate"
        }
      ],
      "x": {
        "format": "date",
        "key": [
          "_start_at",
          "_end_at"
        ],
        "label": "Date"
      }
    }
  });
  it('return strings for regexes to match the required keys', function () {
    var strings_for_regexes = data_format_functions._get_key_regex_strings(axes);
    expect(strings_for_regexes).to.include('^_start_at$');
    expect(strings_for_regexes).to.include('^_end_at$');
    expect(strings_for_regexes).to.include('^rate$');
    expect(strings_for_regexes).to.include('^formatted');
    expect(strings_for_regexes.length).to.equal(4);
  });
});
