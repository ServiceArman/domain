$(document).ready(function() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
    } else {
        $('#welcomeMessage').text(`Hi! ${loggedInUser.name}`);
        $('#userProfile').text(loggedInUser.name).click(function() {
            window.location.href = 'profile.html';
        });

        $.getJSON('order.json', function(orders) {
            var userOrders = orders.filter(order => order.email === loggedInUser.email);
            if (userOrders.length > 0) {
                userOrders.forEach(order => {
                    $('#orderHistory').append(`
                        <div class="card mt-3">
                            <div class="card-body">
                                <h5 class="card-title">Order ID: ${order.order_id}</h5>
                                <p class="card-text">Order Date: ${order.order_date}</p>
                                <p class="card-text">Total Amount: ${order.total_amount}</p>
                                <p class="card-text">Order Status: ${order.order_status}</p>
                            </div>
                        </div>
                    `);
                });
            } else {
                $('#orderHistory').text('No orders found.');
            }
        });
    }
});
