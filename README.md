# BAMAZON

## Overview

Bamazon is an app that will take in orders from customers and deplete stock from the store's inventory. It will also allow the manager to check the inventory of the store and restock products if they are low in stock.

## Packages

* MySQL - for holding the database data
* Inquirer - for prompting the customer/manager with questions

## Using Bamazon

#### 1. bamazonCustomer.js File:

* When you run the javascript file in the terminal, the list of products for sale will populate and be shown. 

![BCFILE1](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\BC_start.PNG)

* The customer will then be prompted to enter in the product ID that they would like to purchase and the amount.
 - if the store has the inventory for the purchase, the transaction will complete, prompting the customer with the total price of the purchase.
 - if the store does not have the inventory for the purchase, the customer will be alerted and would be able to edit the amount.

 ![BCFILE2](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\BC_1.PNG)

 * When the purchase is complete, the database will be updated and reflect the new inventory amount.

  ![BCFILE3](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\BC_2.PNG)


 #### 2. manager.js File:
 
 * When you run this javascript file in the terminal, a menu for the manager will be shown

 ![MANAGER1](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\Manager_start.PNG)

 * If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
 
 ![MANAGER2](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\Manager_1.PNG)

 * If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

 ![MANAGER3](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\Manager_2.PNG)

 * If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

 ![MANAGER4](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\Manager_3.PNG)

 * If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

 ![MANAGER5](C:\Users\Anna Warner\Documents\Class\Homework_Assignments\Assignment_12\bamazon\images\Manager_4.PNG)



