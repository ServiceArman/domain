$(document).ready(function() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
    } else {
        $('#name').val(loggedInUser.name);
        $('#email').val(loggedInUser.email);
        $('#phone').val(loggedInUser.phone);
        $('#password').val(loggedInUser.password);

        $('#saveBtn').click(function() {
            loggedInUser.name = $('#name').val();
            loggedInUser.phone = $('#phone').val();
            loggedInUser.password = $('#password').val();
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            alert('Profile updated.');
        });

        $('#logoutBtn').click(function() {
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('loginTime');
            window.location.href = 'login.html';
        });
    }
});
