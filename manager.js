var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "N*ex7USt",
  database: "productsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  managerList();
});

function managerList() {
  inquirer
    .prompt({
      name: "managerChoice",
      type: "list",
      message: "Please choose from the following Options: ",
      choices: [
        "View All Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      if (answer.managerChoice === "View All Products for Sale") {
        queryAllProducts();
      } else if (answer.managerChoice === "View Low Inventory") {
        queryLowProducts();
      } else if (answer.managerChoice === "Add to Inventory") {
        queryAddInventory();
      } else if (answer.managerChoice === "Add New Product") {
        queryNewProduct();
      }
    });
}

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("ALL PRODUCTS FOR SALE: ");
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " | Product Name: " +
          res[i].product_name +
          " | Price: $" +
          res[i].price +
          ".00" +
          " | Quantity: " +
          res[i].stock
      );
    }
    console.log("-----------------------------------");
    menu();
  });
}

function queryLowProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("ALL PRODUCTS WITH LOW INVENTORY: ");
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock <= 5) {
        console.log(
          "Item ID: " +
            res[i].item_id +
            " | Product Name: " +
            res[i].product_name +
            " | Price: $" +
            res[i].price +
            ".00" +
            " | Quantity: " +
            res[i].stock
        );
      }
    }
    console.log("-----------------------------------");
    menu();
  });
}

function queryAddInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("SELECT WHICH ITEM TO ADD INVENTORY TO: ");
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " | Product Name: " +
          res[i].product_name +
          " | Quantity: " +
          res[i].stock
      );
    }
    console.log("-----------------------------------");
    lowId();
  });
}

function lowId() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "lowInventory",
          type: "input",
          message:
            "Please Enter in the ID of the item you would like to add to: "
        },
        {
          name: "addUnits",
          type: "input",
          message:
            "Please Enter in the Amount of unit you would like to add to the inventory: "
        }
      ])
      .then(function(answer) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.lowInventory)) {
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock: parseInt(answer.addUnits) + res[i].stock
                },
                {
                  item_id: res[i].item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Inventory Updated.");
                menu();
              }
            );
          }
        }
      });
  });
}

function queryNewProduct() {
  inquirer
    .prompt([
      {
        name: "itemID",
        type: "input",
        message: "What is the Item ID?: "
      },
      {
        name: "productName",
        type: "input",
        message: "What is the name of the Product?: "
      },
      {
        name: "productDepartment",
        type: "input",
        message: "What is the name of the Department?: "
      },
      {
        name: "productYear",
        type: "input",
        message: "What is the year of the Product?: "
      },
      {
        name: "productPrice",
        type: "input",
        message: "What is the price of the Product?: "
      },
      {
        name: "productStock",
        type: "input",
        message: "What is the inventory amount of the Product?: "
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          item_id: parseInt(answer.itemID),
          product_name: answer.productName,
          department_name: answer.productDepartment,
          year: parseInt(answer.productYear),
          price: parseInt(answer.productPrice),
          stock: parseInt(answer.productStock)
        },
        function(err) {
          if (err) throw err;
          console.log("Your Product was created successfully!");
          menu();
        }
      );
    });
}

function menu() {
  inquirer
    .prompt({
      name: "menuList",
      type: "list",
      message: "Would you like to return to the Manager's Menu?",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      if (answer.menuList === "YES") {
        managerList();
      } else if (answer.menuList === "NO") {
        console.log("You have exited the Manager's List.");
        connection.end();
      }
    });
}
