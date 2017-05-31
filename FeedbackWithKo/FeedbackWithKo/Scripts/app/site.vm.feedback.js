$(function () {

    site.vm.Feedback = function () {
        var item = this;
        item.subject = ko.observable()
            .extend({ required: true, maxLength: 100 });
        item.message = ko.observable()
            .extend({ required: true, maxLength: 500 });
        item.emailadrress = ko.observable()
            .extend({ required: true, maxLength: 50, email: true });
        item.username = ko.observable()
            .extend({ required: true, maxLength: 50 });
        return item;
    };

    site.vm.feedbackViewModel = function () {
        var message = ko.observable("заполните форму"),
            feedback = new site.vm.Feedback(),
            isbusy = ko.observable(false),
            issended = ko.observable(false),
            errors = ko.validatedObservable(feedback),
            send = function () {
                isbusy(true);
                var jsonData = ko.toJSON(feedback);
                site.services.utilits.sendFeedback(jsonData, callback);
            },
            callback = function (json) {
                if (!json.error) {
                    alert(json.result);
                    message(json.result);
                    issended(true);
                } else {
                    alert(json.error);
                    message(json.error);
                }
                isbusy(false);
            };

        return {
            issended:issended,
            isbusy:isbusy,
            errors: errors,
            send: send,
            feedback: feedback,
            message: message
        };
    }();

    ko.applyBindings(site.vm.feedbackViewModel);
});