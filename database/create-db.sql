CREATE DATABASE samsa;
USE samsa;

CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Menu_Items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category ENUM('Food', 'Drink', 'Dessert') NOT NULL
);

CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (item_id) REFERENCES Menu_Items(item_id)
);

CREATE TABLE Daily_Menu (
    daily_menu_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    menu_date DATE NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Menu_Items(item_id)
);

INSERT INTO Customers (name, email, password, phone, address) 
VALUES ('husu', 'huau@gmaik.com', 'nopass', '045841222', 'espoo');

INSERT INTO Menu_Items (name, description, price, category) 
VALUES ('Chalaw', 'A delicious traditional food', 19.99, 'Food');

INSERT INTO Orders (customer_id, status, total_amount) 
VALUES (1, 'Completed', 19.99);

INSERT INTO Order_Items (order_id, item_id, quantity, price) 
VALUES (1, 1, 1, 19.99);

INSERT INTO Daily_Menu (item_id, menu_date) 
VALUES (1, '2024-11-05');

-- SELECT Orders.order_id, Orders.order_date, Orders.status, Orders.total_amount,
--        Menu_Items.name AS item_name, Order_Items.quantity, Order_Items.price
-- FROM Orders
-- JOIN Order_Items ON Orders.order_id = Order_Items.order_id
-- JOIN Menu_Items ON Order_Items.item_id = Menu_Items.item_id
-- WHERE Orders.customer_id = 1;

-- SELECT Menu_Items.name, Menu_Items.description, Menu_Items.price
-- FROM Daily_Menu
-- JOIN Menu_Items ON Daily_Menu.item_id = Menu_Items.item_id
-- WHERE Daily_Menu.menu_date = '2024-11-05';

