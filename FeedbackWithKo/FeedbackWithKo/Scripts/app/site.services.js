/// <reference path="site.core.js" />

///////////////////////////////////////////////////////////////
//  simple DataService sample
//  автор: calabonga.net
///////////////////////////////////////////////////////////////

(function (site) {

  "use strict";

    site.services.utilits = {
        sendFeedback: function (feedback, callback) {
            if (callback === undefined) {throw new Error(200, "callback is undefined");}
            site.fw.ajaxService.postJson("SendFeedback", feedback, callback);
        }
    };
})(site);