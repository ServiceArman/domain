document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if user is not logged in
    window.location.href = 'login.html';
  } else {
    // Fetch domain data and populate accordion
    fetch('order.json')
      .then(response => response.json())
      .then(data => {
        const userDomains = data.domain_info.filter(domain => domain.user_id === currentUser.user_id);
        const accordion = document.getElementById('accordion');
        if (userDomains.length === 0) {
          accordion.innerHTML = '<p>No domains found.</p>';
        } else {
          userDomains.forEach(domain => {
            const card = createDomainCard(domain);
            accordion.appendChild(card);
          });
        }
      });
  }
});

function createDomainCard(domain) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  cardHeader.innerHTML = `
    <h5 class="mb-0">
      <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${domain.domain_name}" aria-expanded="true" aria-controls="collapse${domain.domain_name}">
        ${domain.domain_name}
      </button>
    </h5>
  `;

  const collapseDiv = document.createElement('div');
  collapseDiv.id = `collapse${domain.domain_name}`;
  collapseDiv.classList.add('collapse');
  collapseDiv.setAttribute('aria-labelledby', `heading${domain.domain_name}`);
  collapseDiv.setAttribute('data-parent', '#accordion');
  collapseDiv.innerHTML = `
    <div class="card-body">
      <p>Registrar: ${domain.registrar}</p>
      <p>Registration Date: ${domain.registration_date}</p>
      <p>Expiry Date: ${domain.expiry_date}</p>
      <p>Status: ${domain.status}</p>
      <!-- Additional details can be added here -->
    </div>
  `;

  card.appendChild(cardHeader);
  card.appendChild(collapseDiv);
  return card;
}
