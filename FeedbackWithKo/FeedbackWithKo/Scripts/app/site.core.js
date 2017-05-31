
// Main namespace
var site = site || {};

// Framework (engine) module
site.fw = site.fw || {};

// ViewModels module
site.vm = site.vm || {};

// DataServices module
site.services = site.services || {};

// Utilites
site.utils = site.utils || {};

// Js-controls 
site.controls = site.controls || {};

// Models
site.models = site.models || {};



///////////////////////////////////////////////////////////////
//  DataServices для site
//  author:         calabonga.net
//  depend on:      site.core.js
//                  jQuery.js
///////////////////////////////////////////////////////////////

(function (site) {

    "use strict";

    var baseUrl = "/ajax/",
        serviceUrl = function (method) {
            if (method.indexOf('/') >= 0) { return method; }
            return baseUrl + method;
        };

    site.fw.ajaxService = function () {
        var getAjaxJson = function (method, jsonIn, callback) {
            $.ajax({
                url: serviceUrl(method),
                data: ko.toJS(jsonIn),
                type: 'GET',
                cache: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (json) {
                    callback(json);
                },
                error: function (jqXhr, textStatus) {
                    if (confirm(jqXhr.status + " " + textStatus + ":" + jqXhr.statusText)) {
                        alert(jqXhr.responseText);
                    }
                }
            });
        },
            postAjaxJson = function (method, jsonIn, callback) {
                $.ajax({
                    url: serviceUrl(method),
                    data: ko.toJS(jsonIn),
                    type: 'POST',
                    cache: false,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (json) {
                        callback(json);
                    },
                    error: function (jqXhr, textStatus) {
                        if (confirm(jqXhr.status + " " + textStatus + ":" + jqXhr.statusText)) {
                            alert(jqXhr.responseText);
                        }
                    }
                });
            }
        return {
            getJson: getAjaxJson,
            postJson: postAjaxJson
        };
    }();
})(site);

