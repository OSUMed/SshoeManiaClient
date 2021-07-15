DROP Database sshoe_mania;
CREATE DATABASE sshoe_mania;
USE sshoe_mania;
-- Database Schema
CREATE TABLE Customers (
	customer_id INT AUTO_INCREMENT NOT NULL,
    customer_name VARCHAR(30) NOT NULL,
    customer_email VARCHAR(30) NOT NULL,
    customer_phone VARCHAR(15),
    PRIMARY KEY(customer_id)
);

CREATE TABLE Payment_Methods (
	payment_method_id INT AUTO_INCREMENT NOT NULL,
    payment_type VARCHAR(30) NOT NULL,
    credit_card_name VARCHAR(30) NOT NULL,
    credit_card_number VARCHAR(30) NOT NULL,
    credit_card_exp_date VARCHAR(30) NOT NULL,
    PRIMARY KEY(payment_method_id)
);

CREATE TABLE Products (
	product_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    product_price DECIMAL(6, 2) NOT NULL,
    product_information VARCHAR(255),
    stock_amount INT NOT NULL,
    PRIMARY KEY(product_id)
);


CREATE TABLE Orders (
	order_id INT AUTO_INCREMENT NOT NULL,
    customer_id INT NOT NULL,
    payment_method_id INT DEFAULT NULL,
    order_date DATE NOT NULL,
    price_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY(payment_method_id) REFERENCES Payment_Methods(payment_method_id) ON DELETE SET NULL,
    PRIMARY KEY (order_id)
);

CREATE TABLE Orders_Products (
	order_product_id INT AUTO_INCREMENT NOT NULL,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
    PRIMARY KEY(order_product_id)
);

-- Seeding Database
INSERT INTO Customers (customer_name, customer_email, customer_phone)
VALUES
	("Jorge Jones", "jorge@gmail.com", "5553456785"),
    ("Amanda Cei", "amnda@gmail.com", "6553321785"),
    ("Kelly Mateo", "cats@gmail.com", "1553456785"),
    ("Bill Li", "goats@gmail.com", "8853456785"),
    ("Chip Jones", "pringles@gmail.com", "9053456785");

INSERT INTO Payment_Methods (payment_type, credit_card_name, credit_card_number, credit_card_exp_date)
VALUES
	("Credit Card", "Visa", "4024007181308379", "2022-03-23"),
    ("Credit Card", "MasterCard", "5471235649740561", "2026-09-26"),
    ("Credit Card", "AMEX", "373010965743147", "2024-11-23"),
    ("Credit Card", "Maestro", "6761448681692825", "2028-12-25"),
    ("Credit Card", "Discover", "6011703981813036", "2039-08-13");

INSERT INTO Products (product_name, product_price, product_information, stock_amount)
VALUES
	("Nike Air Force One", 100.00, "The original white shoes released in 1950.", 100),
    ("Oliver Cabell Low 1", 200.00, "Oliver Cabell is making a name for itself, delivering consistently high-quality premium sneakers with simple minimalist design.", 22),
    ("Nike Air Max 270", 80.00, "The Nike Air Max 270 is quite simply the most popular men’s sneaker of 2021. This low-top pair comes in a range of colours, shown here in simple black and white.", 3000),
    ("Koio Capri Castagna", 300.00, "These simple yet elegant brown leather sneakers are perfect to match with jeans when dressing casually.", 33),
    ("Adidas Originals", 100.00, "Some call them the best sneakers of all time. The shoes come in a variety of colours.", 10000),
    ("Adidas UltraBoost 20", 250.00, "You’ll feel just like you’re walking on clouds! The latest version, the Adidas UltraBoost 20, is excellent for running as well. And best of all, the UltraBoost are made from recyclable materials.", 500),
    ("Adidas Yeezy Boost", 1000.00, "Born from a collaboration between Kanye West and Adidas.", 5),
    ("Balmain B-Court", 30.00, "The shoe is made with high-quality leather and extra padding. The back of the sole features a glossy rubberized trip with the luxury house logo embossed at the heel.", 7),
    ("Gucci Screener", 6000.00, "Gucci nailed the sneakers throwback design with this retro-inspired shoe. Influenced by classic runners from the ’70s, this pair of Gucci Screener sneakers are carefully distressed to look like authentic vintage sports shoes.", 12),
    ("Tom Ford Warwick", 3000.00, "Easy to wear with everything for a casual to business casual look. Made in Italy from premium materials, this pair of Tom Ford Warwick sneakers is finished with discreet branding, including perforated ‘T’s and gold designer stamps.", 1);

INSERT INTO Orders (customer_id, payment_method_id, order_date, price_total)
VALUES
	(4, 3, "2020-01-02", 300.00),
    (1, 1, "2018-07-04", 380.00),
    (2, 5, "2021-03-12", 350.00),
    (1, NULL, "2021-03-12", 100.00);

INSERT INTO Orders_Products (order_id, product_id)
VALUES
	(1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 6);
