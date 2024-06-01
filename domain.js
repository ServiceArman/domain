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
        const userDomains = orders.filter(order => order.user_id === currentUser.user_id);
        const accordionContainer = document.querySelector('.container');
        userDomains.forEach(domain => {
          const accordion = document.createElement('div');
          accordion.classList.add('accordion', 'mt-3');
          accordion.innerHTML = `
            <div class="card">
              <div class="card-header" id="heading${domain.order_id}">
                <h2 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${domain.order_id}" aria-expanded="true" aria-controls="collapse${domain.order_id}">
                    Domain: ${domain.domain_name}
                  </button>
                </h2>
              </div>
              <div id="collapse${domain.order_id}" class="collapse" aria-labelledby="heading${domain.order_id}" data-parent=".accordion">
                <div class="card-body">
                  <p>Registered Date: ${domain.registration_date}</p>
                  <p>Expiry Date: ${domain.expiry_date}</p>
                  <p>Status: <span class="${getStatusColor(domain.status)}">${domain.status}</span></p>
                  <!-- Additional domain details can be displayed here -->
                </div>
              </div>
            </div>
          `;
          accordionContainer.appendChild(accordion);
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
