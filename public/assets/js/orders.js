let order_form = document.getElementById("orders_form");
let order_date = document.getElementById("order_date");
let order_price = document.getElementById("total_price");
let customer = document.getElementById("customer-dropdown");
let payment = document.getElementById("payment-dropdown");

let product_form = document.getElementById("orders_products_form");
let order = document.getElementById("order-dropdown");
let product = document.getElementById("product-dropdown");

order_form.addEventListener("submit", event => {
    event.preventDefault();
    let date = order_date.value;
    let price = order_price.value;
    let selected_customer = customer.value;
    let selected_payment = payment.value;
    console.log(selected_payment);

    let data = {
        date: date,
        price: price,
        customer: selected_customer,
        payment: selected_payment
    }

    fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        console.log(response);
        order_form.reset();
        window.location.reload(true);
    })
})

product_form.addEventListener("submit", event => {
    event.preventDefault();

    let selected_order = order.value;
    let selected_product = product.value;


    let data = {
        selected_order,
        selected_product
    }

    fetch("/api/orders_products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        console.log(response);
        product_form.reset();
        window.location.reload(true);
    })
})
