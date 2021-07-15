let customer_form = document.getElementById("customer_form");
let customer_name = document.getElementById("userName");
let customer_email = document.getElementById("userEmail");
let customer_phone = document.getElementById("userPhone");
let search_button = document.getElementById("search_btn");
let search_input = document.getElementById("customer_search")

customer_form.addEventListener("submit", e => {
    e.preventDefault();
    let name = customer_name.value;
    let email = customer_email.value;
    let phone = customer_phone.value;

    let data = {
        name,
        email,
        phone
    }

    fetch("/api/customer", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        console.log(response);
        customer_form.reset();
        window.location.reload("/products");
    })
})

search_button.addEventListener("click", event => {
    let searchValue = search_input.value;
    fetch("/?" + new URLSearchParams({ customer: searchValue })).then(res => res.json().then(data => {
        // Once I get the data back from the server, I will clear the table
        // and then populate it with the customer the user was searching for.
        console.log(data)

        let tbody = document.getElementById("tbody")
        tbody.innerHTML = "";
        for (let i = 0; i < data.length; ++i) {
            let currentCustomer = data[i];

            let tr = document.createElement("tr");
            tr.setAttribute("id", currentCustomer.customer_id);

            let td1 = document.createElement("td");
            td1.setAttribute("class", "table-data");
            td1.innerText = currentCustomer.customer_name;

            let td2 = document.createElement("td");
            td2.setAttribute("class", "table-data");
            td2.innerText = currentCustomer.customer_email;

            let td3 = document.createElement("td");
            td3.setAttribute("class", "table-data");
            td3.innerText = currentCustomer.customer_phone;

            let td4 = document.createElement("td");
            td4.setAttribute("class", "table-data");
            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "btn btn-danger delete");
            deleteBtn.setAttribute("onclick", `deletecustomer(${currentCustomer.customer_id})`);
            deleteBtn.innerText = "Delete";
            td4.appendChild(deleteBtn);

            let td5 = document.createElement("td");
            td4.setAttribute("class", "table-data makeButton");
            let aTag = document.createElement("a")
            aTag.setAttribute("href", `/customers/${currentCustomer.customer_id}`);
            let updateBtn = document.createElement("button")
            updateBtn.setAttribute("class", "btn btn-primary");
            updateBtn.setAttribute("type", "button");
            updateBtn.setAttribute("name", "button");
            updateBtn.innerText = "Update";
            aTag.appendChild(updateBtn);
            td5.appendChild(aTag);

            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            tbody.appendChild(tr);

            console.log(data[i])
        }
        
        

    }))

})