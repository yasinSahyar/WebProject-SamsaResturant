

https://trello.com/b/lsjkAzKa/samsa-project

https://www.figma.com/design/YEgomIC1WXIpO62SPamh3Q/Untitled?node-id=2-36&node-type=symbol&t=uR17kugr1bc7xrJo-0


Database Tables and Relationships
Customers:

Primary Key: customer_id
Contains details about each customer.
Relation: Each customer can place multiple orders, linking to the Orders table.
Orders:

Primary Key: order_id
Foreign Key: customer_id (references Customers.customer_id)
Stores details about each order, including order date, status, and total amount.
Relation: Each order can contain multiple items, linking to the Order_Items table.
Menu_Items:

Primary Key: item_id
Contains details about each menu item, including name, description, price, and category.
Relation: Each menu item can appear in multiple orders through the Order_Items table.
Relation: Each menu item can be assigned to multiple dates in the Daily_Menu table to specify its availability.
Order_Items:

Primary Key: order_item_id
Foreign Keys:
order_id (references Orders.order_id)
item_id (references Menu_Items.item_id)
Stores details of each item in an order, including quantity and price at the time of ordering.
Relation: Acts as a join table between Orders and Menu_Items, allowing for a many-to-many relationship between orders and menu items.
Daily_Menu:

Primary Key: daily_menu_id
Foreign Key: item_id (references Menu_Items.item_id)
Contains information about menu items available on specific dates, allowing the restaurant to define a daily menu.
Relation: Links Menu_Items to specific dates for each item’s availability.
Relational Diagram
Here’s how these tables relate to each other in a relational model:

Customers → Orders:

One-to-Many: Each customer (customer_id) can have multiple orders (order_id) in the Orders table.
Orders → Order_Items:

One-to-Many: Each order (order_id) can have multiple items (order_item_id) in the Order_Items table.
Order_Items → Menu_Items:

Many-to-One: Each item in Order_Items references a single item in Menu_Items, linking the items ordered to the available menu items.
Menu_Items → Daily_Menu:

One-to-Many: Each menu item (item_id) can appear on multiple dates in Daily_Menu (menu_date), allowing flexibility in daily availability.

![ER Diagram] (images/db.png)