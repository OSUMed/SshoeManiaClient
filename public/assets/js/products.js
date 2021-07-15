let product_form1 = document.getElementById("product_form");
let product_name = document.getElementById("product_name");
let product_price = document.getElementById("product_price");
let product_info = document.getElementById("product_info");
let product_amount = document.getElementById("product_amount");

product_form1.addEventListener("submit", e => {
    e.preventDefault();
    let name = product_name.value;
    let price = product_price.value;
    let info = product_info.value;
    let amount = product_amount.value;

    let data = {
        name,
        price,
        info,
        amount
    }

    fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        console.log(response);
        product_form1.reset();
        window.location.reload(response);
    })
})