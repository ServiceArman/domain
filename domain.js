document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if user is not logged in
    window.location.href = 'login.html';
  } else {
    // Fetch domain data from order.json
    fetch('order.json')
      .then(response => response.json())
      .then(orders => {
        const userOrders = orders.filter(order => order.user_id === currentUser.user_id);
        const domainDetailsAccordion = document.getElementById('collapseDomainDetails');
        userOrders.forEach(order => {
          const domainCard = document.createElement('div');
          domainCard.classList.add('card', 'mt-3'); // Added mt-3 for spacing between cards
          domainCard.innerHTML = `
            <div class="card-body">
              <h5 class="card-title">Domain: ${order.domain_name}</h5>
              <p class="card-text">Registered Date: ${order.registration_date}</p>
              <p class="card-text">Expiry Date: ${order.expiry_date}</p>
              <p class="card-text">Status: <span class="${getStatusColor(order.status)}">${order.status}</span></p>
            </div>
          `;
          domainDetailsAccordion.appendChild(domainCard);
        });
      });
  }
});

function getStatusColor(status) {
  if (status === 'Active') {
    return 'text-success';
  } else if (status === 'Pending') {
    return 'text-warning';
  } else if (status === 'Expired') {
    return 'text-danger';
  }
}
