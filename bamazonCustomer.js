var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('cli-table2');

var table = new Table({
    head: ['Product ID', 'Product', 'Department', 'Price($)', 'Stock Qty']
});

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
	console.log("connected as id " + connection.threadId);
	displayItems();
});

function displayItems() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) {
			throw err;
		}
		for (var i = 0; i < res.length; i++) {
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}
		console.log(table.toString());
	});
}