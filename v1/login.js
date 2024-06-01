$(document).ready(function() {
    $('#loginBtn').click(function() {
        var email = $('#email').val();
        var password = $('#password').val();

        $.getJSON('user.json', function(users) {
            var user = users.find(user => user.email === email && user.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                localStorage.setItem('loginTime', Date.now());
                window.location.href = 'dashboard.html';
            } else {
                $('#loginError').show();
            }
        });
    });

    // Check if already logged in
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && (Date.now() - localStorage.getItem('loginTime')) < 24 * 60 * 60 * 1000) {
        window.location.href = 'dashboard.html';
    } else {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loginTime');
    }
});
