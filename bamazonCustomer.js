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
  queryAllProducts();
});

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("AVAILABLE ITEMS: ");
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Item ID: " +
          res[i].item_id +
          " | Product Name: " +
          res[i].product_name +
          " | Price: $" +
          res[i].price +
          ".00"
      );
    }
    console.log("-----------------------------------");
    start();
  });
}

function start() {
  inquirer
    .prompt({
      name: "ItemToPurchase",
      type: "input",
      message: "Please Enter in the Item ID that you would like to purchase: "
    })
    .then(function(response) {
      connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(response.ItemToPurchase)) {
            var chosenItem = res[i];
            enterAmount(chosenItem);
          }
        }
      });
    });
}

function enterAmount(item) {
  console.log(
    "You have chosen the " +
      item.product_name +
      " at $" +
      item.price +
      ".00 per unit."
  );
  inquirer
    .prompt({
      name: "ItemAmount",
      type: "input",
      message:
        "Please Enter in the amount of units that you would like to purchase: "
    })
    .then(function(response) {
      if (item.stock >= parseInt(response.ItemAmount)) {
        var totalPurchase = item.stock * item.price;
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock: item.stock - parseInt(response.ItemAmount)
            },
            {
              item_id: item.item_id
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Your Total Purchase is: $" + totalPurchase + ".00");
            restart();
          }
        );
      } else {
        console.log(
          "Insufficent funds. Your Purchase could not be processed at this time."
        );
        restart();
      }
    });
}

function restart() {
  inquirer
    .prompt({
      name: "itemsList",
      type: "list",
      message: "Would you like to see the items list again? [YES] or [NO]",
      choices: ["YES", "NO"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.itemsList === "YES") {
        queryAllProducts();
      } else if (answer.itemsList === "NO") {
        console.log("Thank you for shopping with us! Come again soon.");
        connection.end();
      } else {
        connection.end();
      }
    });
}
