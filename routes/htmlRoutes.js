// This has all of our HTML routes:

const router = require("express").Router();
const mysql = require("../db/dbcon");

// Certain functions that we may need to call for populating our tables:

function getCustomers() {
  let sqlQuery = "SELECT customer_name FROM Customers";
  mysql.pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  })
}

function getPayments() {
  let sqlQuery = "SELECT credit_card_name FROM Payment_Methods";
  mysql.pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  })
}

function getProducts() {
  let sqlQuery = "SELECT product_name FROM Products";
  mysql.pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  })
}

function getOrdersTable(data) {
  let sqlQuery = "SELECT o.order_id, c.customer_name, p.product_name, o.order_date, pm.payment_type, o.price_total FROM Orders o JOIN Orders_Products op ON o.order_id = op.order_id JOIN Products p ON op.product_id = p.product_id INNER JOIN Customers c ON o.customer_id = c.customer_id INNER JOIN Payment_Methods pm ON o.payment_method_id = pm.payment_method_id;";
  mysql.pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //data.ordersTable = result
      console.log(result)
      console.log(" space    ")
      return result;
    }
  })
}


router.get("/", (req, res) => {
  if (JSON.stringify(req.query) === '{}') {
    let sqlQuery = "SELECT * FROM Customers ORDER BY customer_id ASC";
    mysql.pool.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // handlebars accepts an object an then one property that should hold an array of values.
        let data = {
          customer: result,

        }
        res.render("index", data);
      }
    })
  }
  else {
    console.log(req.query.customer)
    let sqlQuery = "SELECT * FROM Customers WHERE customer_name REGEXP ?";
    mysql.pool.query(sqlQuery, ['^' + req.query.customer], (err, result) => {
      if (err) {
        console.log(err);
      }
      else {
        res.json(result)
      }
    })
  }

})

//Get the Orders table data through several calls and then send it to handlebars
router.get("/orders", (req, res) => {
  let customers;
  let payments;
  let products;
  let orders;
  let ordersTable;

  new Promise((resolve, reject) => {
    let sqlQuery = "SELECT customer_name, customer_id FROM Customers ORDER BY customer_id ASC";
    mysql.pool.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        resolve(result);
      }
    })
  }).then(val => {
    customers = val;
    new Promise((resolve, reject) => {
      let sqlQuery = "SELECT payment_method_id, credit_card_name FROM Payment_Methods";
      mysql.pool.query(sqlQuery, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          resolve(result);
        }
      })
    }).then(val => {
      payments = val;
      new Promise((resolve, reject) => {
        let sqlQuery = "SELECT product_id, product_name FROM Products ORDER BY product_id ASC";
        mysql.pool.query(sqlQuery, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            resolve(result);
          }
        })
      }).then(val => {
        products = val;
        new Promise((resolve, reject) => {
          let sqlQuery = "SELECT order_id, order_date, c.customer_name FROM Orders o INNER JOIN Customers c ON o.customer_id = c.customer_id ORDER BY order_id ASC";
          mysql.pool.query(sqlQuery, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              resolve(result);
            }
          })
        }).then(val => {
          orders = val;
          new Promise((resolve, reject) => {

            let sqlQuery = "(SELECT o.order_id, op.order_product_id, c.customer_name, p.product_name, o.order_date, pm.payment_type, o.price_total FROM Orders o JOIN Orders_Products op ON o.order_id = op.order_id JOIN Products p ON op.product_id = p.product_id INNER JOIN Customers c ON o.customer_id = c.customer_id LEFT JOIN Payment_Methods pm ON o.payment_method_id = pm.payment_method_id ORDER BY o.order_id ASC)";
            mysql.pool.query(sqlQuery, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                resolve(result);
              }
            })
          }).then(val => {
            ordersTable = val;

            let data = {
              customers,
              products,
              payments,
              orders,
              ordersTable
            }
            //getOrdersTable(data)
            console.log("Order page stuff: ", ordersTable)
            res.render("orders", data);
          })
        })
      })
    })


  })
})

//Get the Payment Methods table data through several calls and then send it to handlebars
router.get("/paymentMethods", (req, res) => {
  let sqlQuery = "SELECT * FROM Payment_Methods ORDER BY payment_method_id ASC";
  mysql.pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // handlebars accepts an object an then one property that should hold an array of values.
      let data = {
        paymentMethod: result
      }
      res.render("payment_methods", data);
    }

  })
})

//Get the Products table data through several calls and then send it to handlebars
router.get("/products", (req, res) => {
  let sqlQuery = "SELECT * FROM Products ORDER BY product_id ASC";
  mysql.pool.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // handlebars accepts an object an then one property that should hold an array of values.
      let data = {
        product: result
      }
      res.render("products", data);
    }

  })
})

// The following get methods are for the supplementary update pages to update
// user data. The user needs to see what they are updating so we write these
// queries for them. Idea is taken from lecture:

// Sources for Update supplement page idea: 340 Introduction to Databases Class
// Lectures: Week 8: Learn using JavaScript and NodeJS. College: Oregon State
// University:
// https://canvas.oregonstate.edu/courses/1810923/pages/week-8-learn-using-javascript-and-nodejs?module_item_id=20621587

router.get("/paymentMethods/:id", (req, res) => {
  let inserts = req.params.id;
  let sqlQuery = "SELECT * FROM Payment_Methods WHERE payment_method_id = ?";
  mysql.pool.query(sqlQuery, [inserts], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      // We return just the first index value because we only want the first record data:
      let paymentMethod = result[0]
      console.log("result here: ", result)
      res.render("updatepaymentmethod", paymentMethod)
    }
  })
});

router.get("/customers/:id", (req, res) => {
  let customerId = req.params.id;
  let sqlQuery = "SELECT * FROM Customers WHERE customer_id = ?";
  mysql.pool.query(sqlQuery, [customerId], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      let customer = result[0]
      res.render("updatecustomer", customer)
    }
  })
});

router.get("/products/:id", (req, res) => {
  let customerId = req.params.id;
  let sqlQuery = "SELECT * FROM Products WHERE product_id = ?";
  mysql.pool.query(sqlQuery, [customerId], (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      let product = result[0]
      res.render("updateproduct", product)
    }
  })
});



// Here we export our route:
module.exports = router;
