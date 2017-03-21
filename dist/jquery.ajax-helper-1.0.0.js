/*!
 * jquery.ajax-helper v1.0.0 (https://github.com/tmentink/jquery.ajax-helper)
 * Copyright 2017 Trent Mentink
 * Licensed under MIT
 */
!function(window) {
  "use strict";
  var toBoolean = function(raw) {
    var response = $.parseJSON(raw).d;
    if (response === "") {
      console.log("An empty string was returned. Check the error log for more details.");
      return null;
    }
    return response == "true" || response == "True" || response == 1;
  };
  var toDataRow = function(raw) {
    var response = $.parseJSON(raw).d;
    if (response == "") {
      console.log("An empty string was returned. Check the error log for more details.");
      return null;
    }
    return $.parseJSON(response)[0];
  };
  var toFloat = function(raw) {
    var response = $.parseJSON(raw).d;
    if (response == "") {
      console.log("An empty string was returned. Check the error log for more details.");
      return null;
    }
    return parseFloat(response);
  };
  var toInteger = function(raw) {
    var response = $.parseJSON(raw).d;
    if (response == "") {
      console.log("An empty string was returned. Check the error log for more details.");
      return null;
    }
    return parseInt(response);
  };
  var toObject = function(raw) {
    var response = $.parseJSON(raw).d;
    if (response == "") {
      console.log("An empty string was returned. Check the error log for more details.");
      return null;
    }
    return $.parseJSON(response);
  };
  var toString = function(raw) {
    var response = $.parseJSON(raw).d;
    if (response == "") {
      console.log("An empty string was returned. Check the error log for more details.");
      return null;
    }
    return response;
  };
  var getDataType = function(dataType) {
    dataType = dataType || "string";
    dataType = dataType.toLowerCase();
    switch (dataType) {
     case "string":
     case "text":
     case "html":
     case "xml":
      return "string";

     case "float":
     case "double":
      return "float";

     case "integer":
     case "int":
      return "integer";

     case "boolean":
     case "bool":
     case "bit":
      return "boolean";

     case "datarow":
     case "row":
     case "dr":
      return "datarow";

     case "dataset":
     case "ds":
     case "datatable":
     case "table":
     case "dt":
     case "array":
     case "object":
     case "obj":
     case "json":
      return "object";

     default:
      return "string";
    }
  };
  var getOptions = function(url, parms, dataType) {
    var defaults = {
      type: "POST",
      contentType: "application/json; charset=utf-8",
      converters: {
        "text boolean": toBoolean,
        "text datarow": toDataRow,
        "text float": toFloat,
        "text integer": toInteger,
        "text object": toObject,
        "text string": toString
      }
    };
    var options = {
      url: url,
      data: JSON.stringify(parms),
      dataType: getDataType(dataType)
    };
    return $.extend({}, defaults, options);
  };
  var errorCallback = {
    done: function() {
      return this;
    },
    fail: function(fn) {
      fn();
      return this;
    }
  };
  var execute = function(url, parms, dataType) {
    var options = getOptions(url, parms, dataType);
    return $.ajax(options);
  };
  var executeBoolean = function(url, parms) {
    return execute(url, parms, "boolean");
  };
  var executeDataRow = function(url, parms) {
    return execute(url, parms, "datarow");
  };
  var executeDataSet = function(url, parms) {
    return execute(url, parms, "dataset");
  };
  var executeDataTable = function(url, parms) {
    return execute(url, parms, "datatable");
  };
  var executeFloat = function(url, parms) {
    return execute(url, parms, "float");
  };
  var executeInteger = function(url, parms) {
    return execute(url, parms, "integer");
  };
  var executeObject = function(url, parms) {
    return execute(url, parms, "object");
  };
  var executeString = function(url, parms) {
    return execute(url, parms, "string");
  };
  window.AJAXHelper = {
    errorCallback: errorCallback,
    execute: execute,
    executeBoolean: executeBoolean,
    executeDataRow: executeDataRow,
    executeDataSet: executeDataSet,
    executeDataTable: executeDataTable,
    executeFloat: executeFloat,
    executeInteger: executeInteger,
    executeObject: executeObject,
    executeString: executeString
  };
}(this);