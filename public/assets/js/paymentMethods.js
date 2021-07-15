let payment_form = document.getElementById("payment_form");
let payment_type = document.getElementById("payment_type");
let credit_card_name = document.getElementById("credit_card_name");
let credit_card_number = document.getElementById("credit_card_number");
let credit_card_exp_date = document.getElementById("credit_card_exp_date")



payment_form.addEventListener("submit", e => {
    e.preventDefault();
    let ptype = payment_type.value;
    let ccName = credit_card_name.value;
    let ccNumb = credit_card_number.value;
    let ccExpDate = credit_card_exp_date.value;

    let data = {
        ptype,
        ccName,
        ccNumb,
        ccExpDate
    }

    fetch("/api/paymentMethod", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        console.log(response);
        payment_form.reset();
        window.location.reload(response);
    })
})
