document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if user is not logged in
    window.location.href = 'login.html';
  } else {
    document.getElementById('name').value = currentUser.name;
    document.getElementById('email').value = currentUser.email;
    document.getElementById('phone').value = currentUser.phone;

    document.getElementById('profileForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Update user data in localStorage
      currentUser.name = document.getElementById('name').value;
      currentUser.email = document.getElementById('email').value;
      currentUser.phone = document.getElementById('phone').value;
      currentUser.password = document.getElementById('password').value;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      alert('Profile updated successfully!');
    });

    document.getElementById('logoutBtn').addEventListener('click', function() {
      // Clear user data from localStorage and redirect to login page
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  }
});
