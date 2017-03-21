// ----------------------------------------------------------------------
// JQuery AJAX Helper v1.0.0
// ----------------------------------------------------------------------

!function (window) {
    "use strict";


    // ----------------------------------------------------------------------
    // Private Functions 
    // ----------------------------------------------------------------------

    // conversions
    var toBoolean = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response === "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return (response == "true" || response == "True" || response == 1);
    };

    var toDataRow = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return $.parseJSON(response)[0];
    };

    var toFloat = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return parseFloat(response);
    };

    var toInteger = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return parseInt(response);
    };

    var toObject = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return $.parseJSON(response);
    };

    var toString = function (raw) {
        var response = $.parseJSON(raw).d;
        if (response == "") {
            console.log("An empty string was returned. Check the error log for more details.");
            return null;
        }

        return response;
    };

    // allows user-defined dataType to be less specific
    var getDataType = function (dataType) {
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

    // combines default and user-defined options
    var getOptions = function (url, parms, dataType) {
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


    // ----------------------------------------------------------------------
    // Public Functions 
    // ----------------------------------------------------------------------

    /// An object that allows the fail callback to be executed.   
    var errorCallback = {
        done: function () { return this },
        fail: function (fn) { fn(); return this }
    };

    /// Executes and returns an AJAX call.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    /// dataType {string} - Converts response to the desired type.
    var execute = function (url, parms, dataType) {
        var options = getOptions(url, parms, dataType);
        return $.ajax(options);
    };

    /// Executes and returns an AJAX call. Converts response to a Boolean.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeBoolean = function (url, parms) {
        return execute(url, parms, "boolean");
    };

    /// Executes and returns an AJAX call. Returns a DataRow.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeDataRow = function (url, parms) {
        return execute(url, parms, "datarow");
    };

    /// Executes and returns an AJAX call. Converts response to a DataTable.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeDataSet = function (url, parms) {
        return execute(url, parms, "dataset");
    };

    /// Executes and returns an AJAX call. Converts response to a DataTable.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeDataTable = function (url, parms) {
        return execute(url, parms, "datatable");
    };

    /// Executes and returns an AJAX call. Converts response to a Float.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeFloat = function (url, parms) {
        return execute(url, parms, "float");
    };

    /// Executes and returns an AJAX call. Converts response to an Integer.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeInteger = function (url, parms) {
        return execute(url, parms, "integer");
    };

    /// Executes and returns an AJAX call. Converts response to an Object.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeObject = function (url, parms) {
        return execute(url, parms, "object");
    };

    /// Executes and returns an AJAX call. Converts response to a string.
    /// url {string} - The url for the webservice.
    /// parms {object} - An object containing the parameters for the webservice. The keys must be identical to the parameter names.
    var executeString = function (url, parms) {
        return execute(url, parms, "string");
    };


    // ----------------------------------------------------------------------
    // Add AJAXHelper Namespace
    // ----------------------------------------------------------------------

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
        executeString: executeString,
    };

}(this);