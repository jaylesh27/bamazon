var inquirer = require("inquirer");
var mysql = require("mysql");
//var Table = require('cli-table2');

/*var table = new Table({
    head: ['Product ID', 'Product', 'Department', 'Price($)', 'Stock Qty'],
    //colWidths: [15, 55, 55, 10, 10]
}); */

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "Bamazon"
});

connection.connect(function (err) {
	if (err) {
		throw err;
	}
	//console.log("connected as id " + connection.threadId);
	displayItems();
});

function displayItems() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) {
			throw err;
		}
		console.log(
			'Product ID' + "    ||    " +
			'Product' + "    ||    " +
			'Department' + "    ||    " +
			'Price($)' + "    ||    " +
			'Stock Qty' +
			"\n-------------------------------------------------------------------------------------"
		);

		for (var i = 0; i < res.length; i++) {
			console.log(
				res[i].item_id + "             ||    " +
				res[i].product_name + "    ||    " +
				res[i].department_name + "    ||    " +
				res[i].price + "    ||    " +
				res[i].stock_quantity +
				"\n-------------------------------------------------------------------------------------"
			);
		}
		purchasePrompt();
		/*
		for (var i = 0; i < res.length; i++) {
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}
		console.log(table.toString());
		*/
	});
}

function purchasePrompt() {
	inquirer.prompt([
		{
			name: "item",
			type: "input",
			message: "Enter the ID of the item you want to buy"
		},
		{
			name: "itemqty",
			type: "input",
			message: "Enter the amount of the item you'd like to buy"
		}
	]).then(function (answer) {
		//console.log(answer.item);
		//console.log(answer.itemqty);
		connection.query("SELECT * FROM products WHERE item_id=?", [answer.item], function (err, res) {
			if (err) {
				throw err;
			}
			console.log(res[0].product_name);
			if (res[0].stock_quantity - answer.itemqty < 0) {
				console.log("We do not have enough stock on hand to fulfill your order.");
				console.log("Stock on hand: " + res[0].stock_quantity + "\nYour requested qty: " + answer.itemqty);
				displayItems();
			}else {
				var updatedQty = res[0].stock_quantity - answer.itemqty;
				//console.log(answer.item);
				changeQty(answer.item, updatedQty);
			}
		});
	});
}

function changeQty(orderQty, updatedQty) {
	connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",[updatedQty, orderQty], function (err, res) {
		if (err) {
			throw err;
		}
		console.log("Your order was placed!");
		//console.log("New stock on hand: " + res[0].stock_quantity);
	});
	displayItems();
}