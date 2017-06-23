# bamazon
An Amazon-like store built using node.js and MySQL.  This app uses the Inquirer and MySQL npm packages and will mimic a storefront, such as taking orders and depleting inventory.

1. In order to run this program successfully, you will need MySQL, nodejs, and bash (or terminal if you're on a Mac).
2. Once you have the required technologies, run bash and navigate to the folder in which the JavaScript file (bamazonCusterom.js) is located.  Once you are in the correct directory, run the javascript file like so: node bamazonCusteomer.js
3. Assuming you're connected to MySQL, you will need a database with data to run the app successfully.  Use the following schema for MySQL in order to meet this requirement:

```
CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	-- unique id for each product --
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    -- Name of product --
    product_name VARCHAR(50) NOT NULL,
    -- department for each product --
    department_name VARCHAR(50) NOT NULL,
    -- cost to customer --
    price INTEGER NOT NULL,
    -- how much of the product is available in stores --
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "electronics", 750, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothbrush", "personal care", 2, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("notebook", "office supplies", 1, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Game of Thrones season 1", "entertainment", 30, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pens", "office supplies", 3, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "electronics", 2500, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("deodorant", "personal care", 5, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod", "electronics", 400, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 1500, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ground coffee", "food", 20, 1200);


SELECT * FROM products;
```
4. You will be prompted to choose the item you'd like to purchase (by item id) and enter the quantity you'd like to purchase as well.
![Image of order screen](images/image-one.png?raw=true)
5. If there is sufficient quantity on hand for the purchase, the order will go through successfully and you will be notified of your total order cost.
6. If the quantity you'd like exceeds the quantity on hand, you will be notified that we don't have sufficient qty on hand to complete the order.
7. Whether there is enough stock or isn't, you will be returned to the main display of the table of items.
