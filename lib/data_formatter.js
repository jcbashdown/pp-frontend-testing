var _ = require('underscore');

var data_format_functions = {
  _get_key_regex_strings: function (axes) {
    var _get_keys_from_single_axis = function (single_axis) {
      var res;
      if(typeof(single_axis.key) === 'string'){
        res = "^"+single_axis.key+"$";
      } else {
        res = _.map(single_axis.key, function(value){return "^"+value+"$"});
      }
      return res;
    }
    return _.reduce(axes, function(array, axis, k){
      var keys;
      if(axis.constructor === Array){
        keys = axis.reduce(function (inner_array, single_axis){
          inner_array = inner_array.concat(_get_keys_from_single_axis(single_axis));
          return inner_array;
        }, []);
      } else {
        var single_axis = axis;
        keys = _get_keys_from_single_axis(single_axis);
      }
      array = array.concat(keys);
      return array;
    }, ['^formatted']);
  },
  _get_axis_keys: function (axes) {
    var _get_keys_from_single_axis = function (single_axis) {
      var res;
      if(typeof(single_axis.key) === 'string'){
        res = [single_axis.key];
      } else {
        res = _.map(single_axis.key, function(value){return value});
      }
      return res;
    }
    return _.reduce(axes, function(obj, axis, k){
      var keys;
      if(axis.constructor === Array){
        keys = axis.reduce(function (inner_array, single_axis){
          inner_array = inner_array.concat(_get_keys_from_single_axis(single_axis));
          return inner_array;
        }, []);
      } else {
        var single_axis = axis;
        keys = _get_keys_from_single_axis(single_axis);
      }
      obj[k] = keys;
      return obj;
    }, {});
  },
  _reduce_module_data: function (data, keys) {
    return _.map(data, function(datum){
      var new_datum = {};
      _.each(keys, function(key){
        var key_regex = new RegExp(key)
        _.each(datum, function(value,key){
          if(key.match(key_regex)){
            new_datum[key] = value;
          }; 
        });
      })
      return new_datum;
    }); 
  },
  _get_table_data: function (data, keys) {
    return _.map(data, function(datum){
      var new_datum = {};
      new_datum['x'] = datum[keys['x'][0]];
      new_datum['y'] = datum[keys['y'][0]];
      return new_datum;
    }); 
  },
  format_data: function (dashboard) {
    _.each(dashboard.modules, function(module){
      var key_regexes = this._get_key_regex_strings(module.axes);
      var data = this._reduce_module_data(module.data, key_regexes);
      module.data = data;
      var key_regexes = this._get_axis_keys(module.axes);
      var table = this._get_table_data(module.data, key_regexes);
      module.table = table;
    }, this);
    return dashboard;
  },
  tabularize: function () {
    //something to turn into something easy to iterate and nicely paired with formatted values
  }
}

module.exports = data_format_functions;



