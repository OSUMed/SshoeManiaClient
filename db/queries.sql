-- Customers Page

-- Query for adding a new customer to our db where the $ symbol is used to denote the variables that will be inputted by a user.
	INSERT into Customers (customer_name, customer_email, customer_phone)
    VALUES
		($name, $email, $phone);

-- Query for viewing all customers in our db, viewing their name, email and phone number
    SELECT * FROM Customers;

-- Query for searching through the customers by a specific name. $ symbol is used to denote the variables that will be inputted by a user.
	SELECT * FROM Customers WHERE customer_name = $name;


-- Payment Methods Page

-- Query for adding a new payment method into our db where the $ symbol is used to denote the variables that will be inputted by a user.
	INSERT INTO Payment_Methods (payment_type, credit_card_name, credit_card_number, credit_card_exp_date)
    VALUES
		($paymentType, $ccName, $ccNumber, $ccExpDate);

-- Query for viewing all payment methods in our db.
    SELECT * FROM Payment_Methods;

-- Query for updating a payment method where the $ symbol is used to denote the variables that will be inputted by a user.
	UPDATE Payment_Methods
    SET payment_type = $paymentType, credit_card_name = $ccName, credit_card_number = $ccNumber, credit_card_exp_date = $ccExpDate
    WHERE payment_method_id = $id;

-- Query for deleting a payment method entry in our db. $ symbol is used to denote specific id of payment method that user wants to delete.
	DELETE FROM Payment_Methods WHERE payment_method_id = $id;


-- Products Page

-- Query for adding a new product into our db where the $ symbol is used to denote the variables that will be inputted by a user.
	INSERT INTO Products (product_name, product_price, product_information, stock_amount)
    VALUES
		($name, $price, $info, $stockAmount);

-- Query for viewing all products in our db.
    SELECT * FROM Products;

-- Query for updating a product where the $ symbol is used to denote the variables that will be inputted by a user.
	UPDATE Products
    SET product_name = $name, product_price = $price, product_information = $info, stock_amount = $stockAmount
    WHERE product_id = $id;

-- Query for deleting a product in our db. $ symbol is used to denote specific id of product that user wants to delete.
	DELETE FROM Products WHERE product_id = $id;


-- Orders / Orders_Products Page

-- Query for viewing all Orders.
	SELECT * FROM Orders;

-- Query for viewing all the customers (which will be populated in the drop down menu), so that an Order can belong to ONE customer
	SELECT * FROM Customers;

-- Query for viewing all payment methods (which will be populated in the drop down menu), so that an Order can belong to ZERO or ONE payment method.
	SELECT * FROM Payment_Method;

-- Query for viewing all products (which will be populated in the drop down menu), so that a user can associate an order with a product(s).
	SELECT * FROM Products;

-- Query for viewing all orders (which will be populated in the drop down menu), so that a user can associate an order with a product(s).
	SELECT order_id, order_date, c.customer_name
	FROM Orders o
	INNER JOIN Customers c ON o.customer_id = c.customer_id
	ORDER BY order_id ASC

-- Query for adding a new order into our db where the $ symbol is used to denote the variables that will be inputted by a user.
	INSERT INTO Orders (customer_id, payment_method_id, order_date, price_total)
    VALUES
		($customerId, $paymentId, $orderDate, $totalPrice);

-- Query for inserting an association between Orders and Products, into Orders_Products. $ is used to denote usper input.
	INSERT INTO Orders_Products (order_id, product_id)
    VALUES
		($orderId, $productId);

-- Query for deleting an order in our db. $ symbol is used to denote specific id of the order that user wants to delete.
	DELETE FROM Orders WHERE order_id = $id;

-- Query for viewing orders that contain the customer it belongs to along with products associated with that order.
	SELECT o.order_id, c.customer_name AS "Customer Name", p.product_name AS "Product Name", o.order_date AS "Order Date", pm.payment_type AS "Payment Method", o.price_total AS "Total Price"
	FROM Orders o
		JOIN Orders_Products op ON o.order_id = op.order_id
		JOIN Products p ON op.product_id = p.product_id
		INNER JOIN Customers c ON o.customer_id = c.customer_id
		LEFT JOIN Payment_Methods pm ON o.payment_method_id = pm.payment_method_id
		ORDER BY o.order_id ASC;
