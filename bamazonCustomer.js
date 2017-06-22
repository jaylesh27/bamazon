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
	purchasePrompt();
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
				res[i].item_id + "    ||    " +
				res[i].product_name + "    ||    " +
				res[i].department_name + "    ||    " +
				res[i].price + "    ||    " +
				res[i].stock_quantity +
				"\n-------------------------------------------------------------------------------------"
			);
		}
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
			name: "item purchase",
			type: "input",
			message: "Enter the ID of the item you want to buy"
		}
	]).then(function (answer) {
		console.log(answer);
	});
}