$(document).ready(function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    $('#userName').text(loggedInUser.name);

    $.getJSON('order.json', function(orders) {
        const userOrders = orders.filter(order => order.email === loggedInUser.email);

        if (userOrders.length > 0) {
            userOrders.forEach(order => {
                $('#orderHistory').append(`
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Order ID: ${order.order_id}</h5>
                            <p class="card-text">Order Date: ${order.order_history[0].order_date}</p>
                            <p class="card-text">Total Amount: ${order.order_history[0].total_amount}</p>
                            <p class="card-text">Order Status: ${order.order_history[0].order_status}</p>
                            <button class="btn btn-primary view-details" data-order-id="${order.order_id}">View Details</button>
                        </div>
                    </div>
                `);
            });

            $('.view-details').click(function() {
                const orderId = $(this).data('order-id');
                localStorage.setItem('selectedOrderId', orderId);
                window.location.href = 'orderdetails.html';
            });
        } else {
            $('#orderHistory').text('No order history found.');
        }
    });
});
