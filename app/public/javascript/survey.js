$(document).ready(function() {
    // survey question array
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


    // question Div
    var questionDiv = $('#questions');
    i = 0;

    // loding  servey question and answer
    questions.forEach(function (question) {
        i++;
        
        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-control selector">');
        // Create an option for each choice.
        choices.forEach(function(choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });

    // Event handler submit button
    $('#submit').on('click', function(event) {

        event.preventDefault();

    // Capture username and image link values.
        var userName = $('#userName').val();
        var imageLink = $('#imageLink').val();
    // userinput    validation username and imagelink
        if (userName.length > 0 && imageLink.length >0) {
            var answers = [];

    // Add the response for each selector to the array of answers.
            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    // Take only the first character of the answer, which is the number.
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            // Put the data in object form.
            var surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            // POST that data to /api/friends.
            $.post('/api/friends', surveyData, function(data) {

            // Use data callback to display result.
                if (data) {

            // Empty out modal and username and link fields.
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');

            // The results are in array form
                    data.forEach(function(profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;
                        var nameHeader = $('<h3>').text(name);
                        var photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);

                // Add items to the modal.
                        $('#modalContent').append(profileDiv);
                    });

                    if (data.length > 1) {
                        $('.modal-title').text('Your best matches!');
                    } else {
                        $('.modal-title').text('Your best match!');
                    }

                    // Display the result modal.
                    $('#resultModal').modal();
                }
            });
        // If either name or URL is missing, show the error modal.
        } else {
            $('#errorModal').modal();
            // The error modal can be dismissed after 2 seconds.
            setTimeout(function() {
                $('#errorModal').modal('hide');
            }, 2000);
        }
    });
});
