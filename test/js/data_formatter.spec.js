var data_format_functions = require('../../lib/data_formatter.js');
var fs = require('fs');
var JsDiff = require('diff');
var dashboard_response = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/dashboard_response.json', 'utf8'));
var formatted_data = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/formatted_data.json', 'utf8'));
var short_dashboard_response = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/short_dashboard_response.json', 'utf8'));
var short_formatted_data = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/short_formatted_data.json', 'utf8'));

//describe('format_data', function () {
//  it('return the stripped down data', function () {
//    formatted = data_format_functions.format_data(dashboard_response);
//    expect(formatted).to.deep.equal(formatted_data);
//  });
//});

describe('short format_data', function () {
  it('return the stripped down data', function () {
    formatted = data_format_functions.old_format_data(short_dashboard_response);
    expect(formatted).to.deep.equal(short_formatted_data);
  });
});

describe('short format_data', function () {
  it('return the stripped down data', function () {
    formatted = data_format_functions.format_data(short_dashboard_response);
    expect(formatted).to.deep.equal(short_formatted_data);
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
  it('return strings to match the required keys', function () {
    var keys = data_format_functions._get_axis_keys(axes);
    console.log('unique_visitors');
    console.log(JSON.stringify(keys, null, 2));
    console.log('^unique_visitors');
    expect(keys['x'][0]['value']).to.include('_timestamp');
    expect(keys['x'][0]['formatted_value']).to.include('formatted_timestamp');
    expect(keys['y'][0]['value']).to.include('unique_visitors');
    expect(keys['y'][0]['formatted_value']).to.include('formatted_unique_visitors');
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
  it('return strings to match the required keys', function () {
    var keys = data_format_functions._get_axis_keys(axes);
    console.log('completion');
    console.log(JSON.stringify(keys, null, 2));
    console.log('^completion');
    expect(keys['x'][0]['value']).to.include('_start_at');
    expect(keys['x'][0]['value']).to.include('_end_at');
    expect(keys['x'][0]['formatted_value']).to.include('formatted_start_at');
    expect(keys['x'][0]['formatted_value']).to.include('formatted_end_at');
    expect(keys['y'][0]['value']).to.include('rate');
    expect(keys['y'][0]['formatted_value']).to.include('formatted_rate');
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
  it('return strings to match the required keys', function () {
    var keys = data_format_functions._get_axis_keys(axes);
    console.log('other');
    console.log(JSON.stringify(keys, null, 2));
    console.log('^other');
    expect(keys['x'][0]['value'][0]).to.equal('_start_at');
    expect(keys['x'][0]['formatted_value'][0]).to.equal('formatted_start_at');
    expect(keys['x'].length).to.equal(1);
    expect(keys['y'][0]['value'][0]).to.equal('score');
    expect(keys['y'][0]['formatted_value'][0]).to.equal('formatted_score');
    expect(keys['y'].length).to.equal(6);
    expect(keys['y'][1]['value']).to.include('rating_1');
    expect(keys['y'][2]['value']).to.include('rating_2');
    expect(keys['y'][3]['value']).to.include('rating_3');
    expect(keys['y'][4]['value']).to.include('rating_4');
    expect(keys['y'][5]['value']).to.include('rating_5');
  });
});
describe('data_formatter.simple_get_axis_keys', function () {
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
  it('return strings to match the required keys', function () {
    var keys = data_format_functions._simple_get_axis_keys(axes);
    console.log('other');
    console.log(JSON.stringify(keys, null, 2));
    console.log('^other');
    expect(keys['x']['value']).to.equal('_start_at');
    expect(keys['x']['formatted_value']).to.equal('formatted_start_at');
    expect(keys['y']['value']).to.equal('score');
    expect(keys['y']['formatted_value']).to.equal('formatted_score');
  });
});
