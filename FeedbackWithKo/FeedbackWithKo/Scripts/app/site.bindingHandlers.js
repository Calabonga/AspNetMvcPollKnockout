
(function (ko) {

    "use strict";

    ko.bindingHandlers.progressbar = {
    
        init: function (element, valueAccessor) {
            var options = valueAccessor() || {};
            $(element).progressbar(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).progressbar("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var options = valueAccessor();
            $(element).progressbar({ value: parseInt(options.value), max: parseInt(options.max) });
        }
    };


    ko.bindingHandlers.jqDialog = {
        init: function (element, valueAccessor) {
            var model = ko.utils.unwrapObservable(valueAccessor()),
                options = ko.utils.extend(model.options || {}, ko.bindingHandlers.jqDialog.defaultOptions);

            //initialize the dialog
            $(element).dialog(options);

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).dialog("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).dialog(ko.utils.unwrapObservable(value.open) ? "open" : "close");

            if (value.title) {
                var title = value.title();
                if (title) {
                    $(element).dialog("option", "title", title);
                }
            }
            //handle positioning
            if (value.position) {
                var target = value.position();
                if (target) {
                    var pos = $(target).position();
                    $(element).dialog("option", "position", [pos.left + $(target).width(), pos.top + $(target).height()]);
                }
            }
        },
        defaultOptions: {
            options: {
                buttons: {}
            },
            autoOpen: false,
            resizable: false,
            modal: true
        }
    };




    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для модального окна
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  moment
    ///////////////////////////////////////////////////////////////

    var stringTemplate = function (key, template) {
        if (arguments.length === 1) {
            this.template = key;
        } else {
            this.templateName = key;
            this.template = template;
        }
    };
    stringTemplate.prototype.text = function () {
        return this.template;
    };
    var stringTemplateEngine = new ko.nativeTemplateEngine();
    stringTemplateEngine.makeTemplateSource = function (templateName) {
        return new stringTemplate(templateName);
    };



    ko.bindingHandlers.jqDialogContext = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            // alert("initing");
            var model = ko.utils.unwrapObservable(valueAccessor()),
                options = ko.utils.extend(model.options || {}, ko.bindingHandlers.jqDialogContext.defaultContextOptions);

            if (!options.isInitialized) {
                //setup our buttons
                options.buttons = {
                    "Готово": model.accept.bind(viewModel, viewModel),
                    "Отмена": model.cancel.bind(viewModel, viewModel)
                };
                options.closeOnEscape = false;

                //handle disposal
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(element).dialog("destroy");
                });
                $(element).append("<span>\\текст/</span>");

                //initialize the dialog
                $(element).dialog(options);

                options.isInitialized = true;

            }
            return {
                "controlsDescendantBindings": true
            };
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var openState = ko.utils.unwrapObservable(value.open);

            $(element).dialog(openState ? "open" : "close");

            if (openState && !value.isOpenNow) {
                value.isOpenNow = true;
                if (value.title) {
                    var title = value.title();
                    if (title) {
                        $(element).dialog("option", "title", title);
                    }
                }

                if (value.width) {
                    var width = value.width();
                    if (width) {
                        $(element).dialog("option", "width", width);
                    }
                }

                if (value.height) {
                    var height = value.height();
                    if (height) {
                        $(element).dialog("option", "height", height);
                    }
                }

                $(element).dialog("option", "position", "center");

                if (value.context() !== undefined) {
                    var context = value.context();
                    if (context) {
                        ko.editable(context);
                        context.beginEdit();

                        var divv = document.createElement("DIV");
                        ko.renderTemplate(value.options.contextTemplate /*ko.bindingHandlers.jqDialogContext.defaultContextOptions.contextTemplate*/, context, {
                            templateEngine: stringTemplateEngine
                        }, divv, null);
                        $(element).html(divv);
                    }
                }
            }
        },
        defaultContextOptions: {
            autoOpen: false,
            resizable: false,
            modal: true//,
            //contextTemplate: '<div data-bind="html: PeriodEndFullName"></div><p>propverka</p>'
        }
    };






    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для DateTime
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  moment
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.date = {
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            var valueUnwrapped = ko.utils.unwrapObservable(value);
            if (valueUnwrapped) {
                var t = moment(valueUnwrapped).format("DD.MM.YYYY");
                $(element).text(t);
            }
        }
    };


    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для развертывания контента
    //  автор: calabonga.net
    //  зависит от:     knockout
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.expand = {
        init: function (element, valueAccessor) {
            if ($(element).hasClass('ui-expander')) {
                var expander = element;
                var head = $(expander).find('.ui-expander-head');
                var content = $(expander).find('.ui-expander-content');

                $(head).click(function () {
                    $(head).toggleClass('ui-expander-head-collapsed');
                    $(content).toggle();
                });

                var v = valueAccessor();
                var v1 = ko.utils.unwrapObservable(v);
                if (v1) {
                    $(head).removeClass('ui-expander-head-collapsed');
                    content.show();
                } else {
                    $(head).addClass('ui-expander-head-collapsed');
                    content.hide();
                }
            }
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            var valuerUnwraped = ko.utils.unwrapObservable(value);
            var head = $(element).find('.ui-expander-head');
            var content = $(element).find('.ui-expander-content');
            if (valuerUnwraped) {
                $(head).removeClass('ui-expander-head-collapsed');
                content.show();
            } else {
                $(head).addClass('ui-expander-head-collapsed');
                content.hide();
            }
        }
    };



    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для Pager (control)
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  bridge.controls
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.pager = {
        update: function (element, valueAccessor) {
            var value = valueAccessor(),
                pager = ko.utils.unwrapObservable(value),
                index = pager.currentIndex() - 1;
            if (pager.pages().length) {
                var container = $(document.createElement("div"));
                container.addClass("ui-pager");
                if (pager.pages().length > 0) {
                    if (pager.prevGroup() > 0) {
                        var pg = $(document.createElement("span"));
                        pg.text("<");
                        pg.attr("title", pager.prevGroup());
                        pg.addClass("ui-pager-page");
                        pg.click(function () {
                            pager.changePage(pager.prevGroup());
                        });
                        container.append(pg);
                    }
                    for (var i = 0; i < pager.pages().length; i++) {
                        var page = $(document.createElement("span")),
                            p = ko.utils.unwrapObservable(pager.pages());
                        page.click(function () {
                            pager.changePage($(this).text());
                        });

                        if (p[i] == index) page.addClass("ui-pager-page-current");
                        else page.addClass("ui-pager-page");

                        page.text(p[i] + 1);
                        page.attr("title", p[i] + 1);
                        container.append(page);
                    }
                    if (pager.nextGroup() > 0) {
                        var ng = $(document.createElement("span"));
                        ng.text(">");
                        ng.attr("title", pager.nextGroup());
                        ng.click(function () {
                            pager.changePage(pager.nextGroup());
                        });
                        ng.addClass("ui-pager-page");
                        container.append(ng);
                    }
                }
                if (container.children().length) {
                    $(element).first("ui-pager").empty();
                    $(element).append(container);
                }
            }
        }
    };





    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для отображения процесса загрузки
    //  IsBusy blockUI
    //  автор: calabonga.net
    //  зависит от:     knockout
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.blockUI = {
        update: function (element, valueAccessor) {
            var value = valueAccessor(),
                isReady = ko.utils.unwrapObservable(value);
            if (isReady) {
                $.blockUI({
                    fadeIn: 500,
                    message: "<p>Ждите...<img src='/content/images/loader.gif'  alt=''/></p>",
                    overlayCSS: { backgroundColor: '#0a6698', opacity: .7 }
                });
            } else {
                $.unblockUI();
            }
        }
    };






    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для затухания текста 
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  jQuery
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.fadeInText = {
        update: function (element, valueAccessor) {
            $(element).hide();
            ko.bindingHandlers.text.update(element, valueAccessor);
            $(element).fadeIn();
        }
    };






    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers вспышка текста 
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  jQuery
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.flash = {
        update: function (element, valueAccessor) {
            ko.utils.unwrapObservable(valueAccessor()); //unwrap to get subscription
            $(element).hide().fadeIn(500);
        }
    };





    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers кнопка jQuery
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  jQuery
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.jqButton = {
        init: function (element, valueAccessor) {
            var options = valueAccessor() || {};
            $(element).button(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).button("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var value = valueAccessor();
            $(element).button("option", "disabled", value.enable === false);
        }
    };



    ///////////////////////////////////////////////////////////////
    //  Утилиты
    //  Расширение knockoutjs
    //  bindingHandlers для DateTime
    //  автор: calabonga.net
    //  зависит от:     knockout
    //                  moment
    ///////////////////////////////////////////////////////////////

    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            options.onSelect = function (dateText, inst) {
                //alert('selected date');
                $(element).hide();
            };
            $(element).datepicker(options);

            //handle the field changing
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($(element).datepicker("getDate"));
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datepicker("destroy");
            });

        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            //handle date data coming via json from Microsoft
            if (String(value).indexOf('/Date(') == 0) {
                value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, "$1")));
            }

            current = $(element).datepicker("getDate");

            if (value - current !== 0) {
                $(element).datepicker("setDate", value);
            }
        }
    };
})(ko);