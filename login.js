document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Fetch user data from JSON file
  fetch('user.json')
    .then(response => response.json())
    .then(users => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        // Save user data in browser storage for 24 hours
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } else {
        alert('Invalid email or password');
      }
    });
});
