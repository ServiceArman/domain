document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if user is not logged in
    window.location.href = 'login.html';
  } else {
    // Display welcome message
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = `Hi, ${currentUser.name}!`;

    // Fetch order history data and populate
    fetch('order.json')
      .then(response => response.json())
      .then(data => {
        const userOrders = data.domain_info.filter(order => order.user_id === currentUser.user_id);
        const orderHistory = document.getElementById('orderHistory');
        if (userOrders.length === 0) {
          orderHistory.innerHTML = '<p>No orders found.</p>';
        } else {
          orderHistory.innerHTML = '<h2>Order History</h2>';
          userOrders.forEach(order => {
            orderHistory.innerHTML += `
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">${order.domain_name}</h5>
                  <p class="card-text">Registration Date: ${order.registration_date}</p>
                  <p class="card-text">Expiry Date: ${order.expiry_date}</p>
                  <p class="card-text">Status: ${order.status}</p>
                </div>
              </div>
            `;
          });
        }
      });
  }
});
