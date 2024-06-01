document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Perform login validation and redirection
    // Example:
    if (email === 'user@gmail.com' && password === '1234') {
      const currentUser = {
        user_id: '78910',
        name: 'John Doe',
        phone: '+1234567890',
        email: 'user@gmail.com',
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });
});
