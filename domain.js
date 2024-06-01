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
        const contactInfoAccordion = document.getElementById('collapseContactInformation');
        userDomains.forEach(domain => {
          // Display contact information for the first domain found
          const owner = domain.owner;
          if (owner) {
            document.getElementById('registrarNamePlaceholder').textContent = domain.registrar;
            document.getElementById('customerNamePlaceholder').textContent = owner.name;
            document.getElementById('customerNumberPlaceholder').textContent = currentUser.phone;
            document.getElementById('customerEmailPlaceholder').textContent = owner.contact_email;
            // Additional information can be added as needed
            break; // Stop loop after finding the first domain
          }
        });
      });
  }
});
