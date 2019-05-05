DROP DATABASE IF EXISTS productsDB;
CREATE database productsDB;

USE productsDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  year INT NULL,
  price DECIMAL(10,4) NULL,
  stock DECIMAL(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (123456, "Diamond Earrings", "Accessories", 2015, 150, 10);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (123789, "Purple Scarf", "Accessories", 2018, 25, 50);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (321654, "Navy Sweater", "Clothes", 2019, 45, 25);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (321987, "Black Jeans", "Clothes", 2019, 75, 15);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (456789, "Cast Iron SKillet", "Kitchen", 2012, 50, 5);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (456123, "Dining Utensil Set", "Kitchen", 2019, 20, 5);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (654987, "Black Stilletos", "Shoes", 2019, 115, 2);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (654321, "Running Sneakers", "Shoes", 2019, 55, 10);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (789456, "Wheat Bread", "Grocery", 2019, 5, 25);

INSERT INTO products (item_id, product_name, department_name, year, price, stock)
VALUES (789123, "Chocolate Chip Cookies", "Grocery", 2019, 5, 10);