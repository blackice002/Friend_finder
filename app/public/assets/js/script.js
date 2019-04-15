$(document).ready(function () {
    var questions = [
        'sleep in on my days off',
        'Extraordinarily cynical',
        'Enjoy cooking for myself and others',
        'I am a pet person',
        'Generally speaking, you rely more on your experience than your imagination.',
        'I have a poor grip on reality',
        'You rarely do something just out of sheer curiosity',
        'I believe that everything happens for a reason',
        'People can rarely upset you.',
        'It is often difficult for you to relate to other people’s feelings',
    ];
    var choices = [
        '1(Strongly Disagree)',
        '2(Disagree)',
        '3 (Neutral)',
        '4 (Agree)',
        '5 (Strongly Agree)'
    ];

    var questionDiv = $('#questions');
    var i = 0
    questions.forEach(function (question) {
        i++;
        var item = $('<div class = question>');
        var headline = $('<h4>').text('question' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class= "form-group">');
        var select = $('<select class = "form-control selector">');
        choices.forEach(function (choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        dropDown.append(select);
        item.append(headline, questionText, dropdown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });
    $('#submit').on('click', function (event) {
        event.preventDefault();

        var userName = $('#username').val().trim();
        var ImageLink = $('imageLink').val().trim();

        if (userName.length > 0 && imagelink.length > 0) {
            var answer = [];
            var survayData = {
                name: userName,
                photo: imagelink,
                answers: answers
            };
            $.post('/api/friends', surveyData, function (data) {
                if (data) {
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');
                    data.forEach(function (profile) {
                        var profileDiv = $('<div class ="profile');
                        var name = profile.name;
                        var photoURL = profile.photo;

                        var nameHeader = $('<h3>').text(name);
                        var photo = $('<img>').attr(src, photoURL);
                        profileDiv.append(nameHeader, photo);
                        $('modalContent').apend(profileDiv);
                    });
                    if (data.length > 1) {
                        $('.modal-title').text('Your best matches !');
                    }
                    else {
                        $('.modal-title').text('your best match!');
                    }
                    $('#resultModal').modal();
                }
            });
        } else {
            $('#errorModal').modal();
            setTimeout(function () {
                $('#errorModal').modal('hide');
            })
        }
    })


});

