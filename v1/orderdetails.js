$(document).ready(function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const selectedOrderId = localStorage.getItem('selectedOrderId');

    if (!loggedInUser || !selectedOrderId) {
        window.location.href = 'login.html';
        return;
    }

    $.getJSON('order.json', function(orders) {
        const order = orders.find(order => order.order_id === selectedOrderId && order.customer_id === loggedInUser.user_id);

        if (order) {
            $('#orderDetails').html(`
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Order ID: ${order.order_id}</h5>
                        <p class="card-text">Order Date: ${order.order_history[0].order_date}</p>
                        <p class="card-text">Total Amount: ${order.order_history[0].total_amount}</p>
                        <p class="card-text">Order Status: ${order.order_history[0].order_status}</p>
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
                                        <button class="btn btn-primary" id="saveNameservers">Save</button>
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
                                        <div class="form-group">
                                            <label for="controlPanelURL">Control Panel URL</label>
                                            <input type="text" class="form-control" id="controlPanelURL" value="${order.domain_info[0].control_panel_access.url}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="controlPanelUsername">Username</label>
                                            <input type="text" class="form-control" id="controlPanelUsername" value="${order.domain_info[0].control_panel_access.username}" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="controlPanelPassword">Password</label>
                                            <input type="text" class="form-control" id="controlPanelPassword" value="${order.domain_info[0].control_panel_access.password}" readonly>
                                        </div>
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
                                        <p>Customer Name: ${order.name.first_name} ${order.name.last_name}</p>
                                        <p>Customer Number: ${order.phone}</p>
                                        <p>Customer Email: ${order.email}</p>
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
                                            <label for="customerMobile">Customer Mobile</label>
                                            <input type="text" class="form-control" id="customerMobile">
                                        </div>
                                        <button class="btn btn-primary" id="submitTransfer">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        } else {
            $('#orderDetails').html('<p>No order details found.</p>');
        }
    });
});
