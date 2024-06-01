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
                                <!-- Domain details -->
                            </div>
                            <div class="card">
                                <!-- Name Servers -->
                            </div>
                            <div class="card">
                                <!-- Control Panel Access -->
                            </div>
                            <div class="card">
                                <!-- Contact Information -->
                            </div>
                            <div class="card">
                                <!-- Domain Transfer -->
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
