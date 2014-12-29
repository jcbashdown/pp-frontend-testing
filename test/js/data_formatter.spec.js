var data_format_functions = require('../../lib/data_formatter.js');
var fs = require('fs');
var JsDiff = require('diff');
var dashboard_response = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/dashboard_response.json', 'utf8'));
var formatted_data = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/formatted_data.json', 'utf8'));

describe('format_data', function () {
  it('return the stripped down data', function () {
    formatted = data_format_functions.format_data(dashboard_response);
    /*console.log(JsDiff.diffJson(JSON.stringify(formatted), JSON.stringify(formatted_data)));*/
    console.log(JSON.stringify(formatted, null, 2));
    expect(formatted).to.deep.equal(formatted_data);
  });
});

describe('data_formatter.get_axis_keys', function () {
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
    var keys = data_format_functions._get_axis_keys(axes);
    expect(keys['x']).to.include('_start_at');
    expect(keys['x']).to.include('_end_at');
    expect(keys['y']).to.include('rate');
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
describe('data_formatter.get_axis_keys', function () {
  var axes;
  beforeEach(function(){
    axes = {
      "x": {
        "label": "Time",
        "key": "_timestamp",
        "format": "time"
      },
      "y": [
        {
          "label": "Number of unique visitors",
          "key": "unique_visitors",
          "format": "integer"
        }
      ]
    }
  });
  it('return strings for regexes to match the required keys', function () {
    var keys = data_format_functions._get_axis_keys(axes);
    expect(keys['x']).to.include('_timestamp');
    expect(keys['y']).to.include('unique_visitors');
  });
});
describe('data_formatter.get_axis_keys', function () {
  var axes;
  beforeEach(function(){
    axes = {
      "y": [
        {
          "format": "percent",
          "key": "score",
          "label": "User satisfaction"
        },
        {
          "format": "integer",
          "key": "rating_1",
          "label": "Very dissatisfied"
        },
        {
          "format": "integer",
          "key": "rating_2",
          "label": "Dissatisfied"
        },
        {
          "format": "integer",
          "key": "rating_3",
          "label": "Neither satisfied or dissatisfied"
        },
        {
          "format": "integer",
          "key": "rating_4",
          "label": "Satisfied"
        },
        {
          "format": "integer",
          "key": "rating_5",
          "label": "Very satisfied"
        }
      ],
      "x": {
        "format": "date",
        "key": "_start_at",
        "label": "Date"
      }
    }
  });
  it('return strings for regexes to match the required keys', function () {
    var keys = data_format_functions._get_axis_keys(axes);
    expect(keys['x']).to.include('_start_at');
    expect(keys['y']).to.include('score');
    expect(keys['y']).to.include('rating_1');
    expect(keys['y']).to.include('rating_2');
    expect(keys['y']).to.include('rating_3');
    expect(keys['y']).to.include('rating_4');
    expect(keys['y']).to.include('rating_5');
  });
});
