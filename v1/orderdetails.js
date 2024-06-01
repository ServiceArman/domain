                          $(document).ready(function() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
    } else {
        $.getJSON('order.json', function(orders) {
            var userOrders = orders.filter(order => order.email === loggedInUser.email);
            if (userOrders.length > 0) {
                var order = userOrders[0];  // Displaying details of the first order for simplicity
                $('#orderDetails').html(`
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Order ID: ${order.order_id}</h5>
                            <p class="card-text">Order Date: ${order.order_date}</p>
                            <p class="card-text">Total Amount: ${order.total_amount}</p>
                            <p class="card-text">Order Status: ${order.order_status}</p>
                            <div class="accordion" id="orderAccordion">
                                <div class="card">
                                    <div class="card-header" id="headingDomain">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseDomain" aria-expanded="true" aria-controls="collapseDomain">
                                                Domain Details
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseDomain" class="collapse show" aria-labelledby="headingDomain" data-parent="#orderAccordion">
                                        <div class="card-body">
                                            <p>Domain Name: ${order.domain_info[0].domain_name}</p>
                                            <p>Registrar: ${order.domain_info[0].registrar}</p>
                                            <p>Registration Date: ${order.domain_info[0].registration_date}</p>
                                            <p>Expiry Date: ${order.domain_info[0].expiry_date}</p>
                                            <button class="btn btn-success">Renew</button>
                                            <button class="btn btn-danger">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingNameservers">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseNameservers" aria-expanded="false" aria-controls="collapseNameservers">
                                                Name Servers
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseNameservers" class="collapse" aria-labelledby="headingNameservers" data-parent="#orderAccordion">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="ns1">Name Server 1</label>
                                                <input type="text" class="form-control" id="ns1" value="${order.domain_info[0].name_servers[0]}">
                                            </div>
                                            <div class="form-group">
                                                <label for="ns2">Name Server 2</label>
                                                <input type="text" class="form-control" id="ns2" value="${order.domain_info[0].name_servers[1]}">
                                            </div>
                                            <button class="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingControlPanel">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseControlPanel" aria-expanded="false" aria-controls="collapseControlPanel">
                                                Control Panel Access
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseControlPanel" class="collapse" aria-labelledby="headingControlPanel" data-parent="#orderAccordion">
                                        <div class="card-body">
                                            <p>URL: <input type="text" class="form-control" value="${order.domain_info[0].control_panel_access.url}" readonly></p>
                                            <p>Username: <input type="text" class="form-control" value="${order.domain_info[0].control_panel_access.username}" readonly></p>
                                            <p>Password: <input type="text" class="form-control" value="${order.domain_info[0].control_panel_access.password}" readonly></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingContact">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseContact" aria-expanded="false" aria-controls="collapseContact">
                                                Contact Information
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseContact" class="collapse" aria-labelledby="headingContact" data-parent="#orderAccordion">
                                        <div class="card-body">
                                            <p>Registrar Name: ${order.domain_info[0].owner.name}</p>
                                            <p>Customer Name: ${order.domain_info[0].owner.name}</p>
                                            <p>Customer Number: ${loggedInUser.phone}</p>
                                            <p>Customer Email: ${loggedInUser.email}</p>
                                            <p>Customer Address: ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip_code}, ${order.address.country}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingTransfer">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTransfer" aria-expanded="false" aria-controls="collapseTransfer">
                                                Domain Transfer
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTransfer" class="collapse" aria-labelledby="headingTransfer" data-parent="#orderAccordion">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="transferCompany">Transfer Company</label>
                                                <input type="text" class="form-control" id="transferCompany">
                                            </div>
                                            <div class="form-group">
                                                <label for="customerPhone">Customer Phone</label>
                                                <input type="text" class="form-control" id="customerPhone">
                                            </div>
                                            <button class="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            } else {
                $('#orderDetails').text('No order details found.');
            }
        });
    }
});
                              
