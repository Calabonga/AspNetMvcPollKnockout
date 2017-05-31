/// <reference path="site.core.js" />
/// <reference path="../lib/knockout-2.2.0.debug.js" />



///////////////////////////////////////////////////////////////
//  Controls Set for site
//  author:         calabonga.net
//  depend on:      site.core
//                  jQuery
//                  Knockout        
///////////////////////////////////////////////////////////////

; (function (site,ko) {

    "use strict";
    
    site.fw.Metadata = function (title, description, helplink) {
        var metatitle = ko.observable(title),
            metadescription = ko.observable(description),
            metahelplink = ko.observable(helplink);
        
        return {
            title: metatitle,
            description: metadescription,
            helplink: metahelplink
        };
    };

    site.controls.Clock = function () {
        var clock = ko.observable(),
            v1 = ko.observable(),
            v2 = ko.observable(),
            v3 = ko.observable(),
            getTime = function () {
                var ct = new Date();
                v1(ct.getHours());
                v2(c(ct.getMinutes()));
                v3(c(ct.getSeconds()));
                clock(v1() + ":" + v2() + ":" + v3());
            },
            c = function (i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            };

        setInterval(function () { getTime(); }, 500);

        return {
            time: clock
        };
    };

})(site,ko);