const router = require("express").Router();
const mysql = require("../db/dbcon");

function extractObjValues(obj) {
    // this function extracts the values of the input object
    let values = [];
    for (let key in obj) {
        values.push(obj[key]);
    }
    return values;
}

// Allows users to post a new customer to the database.
router.post("/customer", (req, res) => {

    let userInput = extractObjValues(req.body);
    let sqlQuery = "INSERT INTO Customers (customer_name, customer_email, customer_phone) VALUES (?, ?, ?)";
    mysql.pool.query(sqlQuery, userInput, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.sendStatus(200);
    });
});

// Allows users to post a new order to the database.
router.post("/order", (req, res) => {
  let userInput = extractObjValues(req.body);
  console.log(userInput);
  if (userInput[3] === "NULL") {
    let sqlQuery = "INSERT INTO Orders (order_date, price_total, customer_id) VALUES (?, ?, ?)";
    mysql.pool.query(sqlQuery, userInput, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.sendStatus(200);
    });
  }
  else {
    let sqlQuery = "INSERT INTO Orders (order_date, price_total, customer_id, payment_method_id) VALUES (?, ?, ?, ?)";
    mysql.pool.query(sqlQuery, userInput, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.sendStatus(200);
    });
  }
});

// Allows users to post a new entry into orders_products table.
router.post("/orders_products", (req, res) => {

    let userInput = extractObjValues(req.body);
    console.log(userInput)
    let sqlQuery = "INSERT INTO Orders_Products (order_id, product_id) VALUES (?, ?)";
    mysql.pool.query(sqlQuery, userInput, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.sendStatus(200);
    });
});



router.post("/product", (req, res) => {

    let userInput = extractObjValues(req.body);
    let sqlQuery = "INSERT INTO Products (product_name, product_price, product_information, stock_amount) VALUES (?, ?, ?, ?)";
    mysql.pool.query(sqlQuery, userInput, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.sendStatus(200);
    });
});

router.post("/paymentMethod", (req, res) => {
    let userInput = extractObjValues(req.body);
  var sqlQuery = "INSERT INTO Payment_Methods (payment_type, credit_card_name, credit_card_number, credit_card_exp_date) VALUES (?, ?, ?, ?)";
  // var inserts = [req.body.payment_type, req.body.Credit_card_name, req.body.Credit_card_number, req.body.Credit_card_exp_date];
  mysql.pool.query(sqlQuery, userInput, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.sendStatus(200);
  });
});


router.get("/paymentMethods/:id", (req, res) => {
    let sqlQuery = "SELECT * FROM Payment_Methods WHERE payment_method_id = ?";
    let insert = [req.params.payment_method_id]
    mysql.pool.query(sqlQuery, insert, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            let data = {
                paymentMethod: result[0]
            }
            res.render("/updatepaymendmethod", data)
        }
    })
});

router.put("/paymentMethods/:id", (req, res) => {
    // Create Query with placeholders and then create placeholder array:
    let sqlQuery = "UPDATE Payment_Methods SET payment_type = ?, credit_card_name = ?, credit_card_number = ?, credit_card_exp_date = ? WHERE payment_method_id = ?";
    let insert = [req.body.payment_type, req.body.credit_card_name, req.body.credit_card_number, req.body.credit_card_exp_date, req.params.id];

    mysql.pool.query(sqlQuery, insert, (err, result) => {
        if (err) {
            console.log(err);
        }else{
          res.status(200);
          res.end();
        }
    })
});


// Here we put the table data from our update-customer table into our databse:
router.put("/customers/:id", (req, res) => {

    let sqlQuery = "UPDATE Customers SET customer_name = ?, customer_email = ?, customer_phone = ? WHERE customer_id = ?";
    let insert = [req.body.customer_name, req.body.customer_email, req.body.customer_phone, req.params.id];
    mysql.pool.query(sqlQuery, insert, (err, result) => {
        if (err) {
            console.log(err);
        }else{
          res.status(200);
          res.end();
        }
    })
});

// Here we put the table data from our update-product table into our databse:
router.put("/products/:id", (req, res) => {

    let sqlQuery = "UPDATE Products SET product_name = ?, product_price = ?, product_information = ?, stock_amount = ? WHERE product_id = ?";
    let insert = [req.body.product_name, req.body.product_price, req.body.product_information, req.body.stock_amount, req.params.id];
    console.log(insert);
    mysql.pool.query(sqlQuery, insert, (err, result) => {
        if (err) {
            console.log(err);
        }else{
          res.status(200);
          res.end();
        }
    })
});

// Here we delete the record from our order table:
router.delete("/orders/:order_product_id", (req, res) => {

  // Create Query with placeholders and then placeholder array:
  let sqlQuery = "DELETE FROM Orders_Products WHERE order_product_id= ?"
  let inserts = [req.params.order_product_id];
  mysql.pool.query(sqlQuery, inserts, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.sendStatus(200);
  });
});

// Here we delete the record from our payment method table:
router.delete("/paymentMethods/:payment_method_id", (req, res) => {
  // Create Query with placeholders and then placeholder array:
  let sqlQuery = "DELETE FROM Payment_Methods WHERE payment_method_id = ?"
  let inserts = req.params.payment_method_id;
  mysql.pool.query(sqlQuery, [inserts], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.sendStatus(200);
  });
});

// Here we delete the record from our customer table:
router.delete("/:customer_id", (req, res) => {
  let inserts = req.params.customer_id;
  let sqlQuery = "DELETE FROM Customers WHERE customer_id = ?"
  mysql.pool.query(sqlQuery, [inserts], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.sendStatus(200);
  });
});

// Here we delete the record from our product table:
router.delete("/products/:product_id", (req, res) => {
  let inserts = req.params.product_id;
  let sqlQuery = "DELETE FROM Products WHERE product_id = ?"
  mysql.pool.query(sqlQuery, [inserts], (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.sendStatus(200);
  });
});


// Export route to server.js:
module.exports = router;
