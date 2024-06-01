document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if user is not logged in
    window.location.href = 'login.html';
  } else {
    document.getElementById('userName').textContent = currentUser.name;
    // Fetch order history data from JSON file
    fetch('order.json')
      .then(response => response.json())
      .then(orders => {
        const userOrders = orders.filter(order => order.user_id === currentUser.user_id);
        if (userOrders.length > 0) {
          userOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('card', 'mb-3');
            orderCard.innerHTML = `
              <div class="card-body">
                <h5 class="card-title">Order ID: ${order.order_id}</h5>
                <p class="card-text">Domain: ${order.domain_name}</p>
                <p class="card-text">Expiration Date: ${order.expiry_date}</p>
                <p class="card-text">Status: ${order.status}</p>
              </div>
            `;
            document.getElementById('orderHistory').appendChild(orderCard);
          });
        } else {
          // Display message if user has no orders
          const noOrdersMessage = document.createElement('p');
          noOrdersMessage.textContent = 'You have no orders.';
          document.getElementById('orderHistory').appendChild(noOrdersMessage);
        }
      });
  }
});
