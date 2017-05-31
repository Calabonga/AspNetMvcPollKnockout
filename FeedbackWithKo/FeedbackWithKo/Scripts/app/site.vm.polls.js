$(function () {

    var pollData = {
        "question": "За двумя зайцами погонишься...",
        "answers": [
            { votes: 11, name: "ни одного не поймаешь." },
            { votes: 5, name: "больше двух не поймаешь." },
            { votes: 15, name: "ни одного волка не поймаешь." },
            { votes: 9, name: "порвешься на две части." },
            { votes: 39, name: "зачем бегать, лучше на авто!" }
        ],
        "selectedAnswer": null};

    site.vm.Answer = function (value, total) {
        var isSelected = ko.observable(false),
            votes = ko.observable(total),
            name = ko.observable(value);
        return {
            isSelected: isSelected,
            name: name,
            votes: votes
        };
    },

    site.vm.Poll = function (data) {
        var selectedItem = ko.observable(new site.vm.Answer()),
            question = ko.observable(data.question),
            answers = ko.observableArray([]),
            answer = ko.observable(),
            maxVotes = ko.observable(),
            init = function () {
                var max = 0;
                var i;
                for (i in data.answers) {
                    var cur = data.answers[i].votes;
                    if (cur && cur>max) {
                        max = cur;
                    }
                }
                max = Math.round(max * 1.1);
                maxVotes(max);
                for (i in data.answers) {
                    answers.push(new site.vm.Answer(data.answers[i].name, data.answers[i].votes));
                }
                if (data.selectedAnswer) {
                    answer(data.selectedAnswer);
                }
            },
            setSelected = function (item) {
                if (!item.isSelected()) {
                    selectedItem(item.name());
                    ko.utils.arrayForEach(answers(), function (i) {
                        if (i.isSelected && i.isSelected()) { i.isSelected(false); }
                    });
                    item.isSelected(true);
                }
            };

        init();

        return {
            max: maxVotes,
            selectedItem: selectedItem,
            question: question,
            answers: answers,
            answer: answer,
            setSelected: setSelected
        };
    };

    site.vm.pollViewModel = function () {
        var message = ko.observable("Выберите ваш вариант ответа на вопрос."),
            poll = site.vm.Poll(pollData),
            save = function () {
                poll.answer(poll.selectedItem());
            };

        return {
            save: save,
            poll: poll,
            message: message
        };
    }();

    ko.applyBindings(site.vm.pollViewModel);
});