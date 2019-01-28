$(document).ready(function () {
    $(document).on('click', '#generateSign', function () {
        let message =  $('#message').val();
        if(message){
            $.ajax({
                url: '/',
                method: 'POST',
                data: {message},
                success: function (data) {
                    $('#signature').val(data);
                },
                error: function (err) {
                    // console.log(err.statusText);
                }
            });
        }
    });

    $(document).on('click', '#check', function () {
        let message =  $('#message').val();
        let signature =  $('#signature').val();
        let publickey = $('#publickey').val();
        if(message){
            $.ajax({
                url: '/check',
                method: 'POST',
                data: {message,signature,publickey},
                success: function (data) {
                    $('.card-footer').html(data);
                },
                error: function (err) {
                }
            });
        }
    });
});