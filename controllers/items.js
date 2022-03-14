'use strict'

const mysql = require('mysql')
const client = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'point_of_sale'
  });

  client.connect()

// GET ALL ITEMS
exports.get_all_items = (req, res, err) => {
	const query_string = 'SELECT * FROM items;';
	const payload = [];

	client.query(query_string, payload, (err, data) => {
		if(!err) {
			res.send(data);
		    console.log('Successfully got all items!');
		} else {
		    console.log('An error encountered in getting all items!');
		}

		client.end()
	});
};

// GET SINGLE FIELD
exports.search_item = (req, res, next) => {
	const query_string = 'SELECT * FROM items WHERE id = ?;';
	const payload = [req.params.id];

	client.query(query_string, payload, (err, data) => {
		if(!err) {
			res.send(data);
		    console.log('Item was found!');
		} else {
		    console.log('Item was not found!');
		}

		client.end()
	});
};

// ADD AN ITEM
exports.add_item = (req, res, next) => {
	const query_string = 'INSERT INTO items (name, quantity, price) VALUES(?,?,?);';
	const payload = [
		req.body.name,
	    req.body.quantity,
	    req.body.price
	];
	
	client.query(query_string, payload, (err, data) => {
	    if (!err) {
		    res.send(data);
		    console.log('Successfully added an item!');
		} else {
			console.log(err);
	        console.log('An error encountered in adding an item!');
		}
	});
};

// EDIT AN ITEM INFO
exports.edit_item_info = (req, res, next) => {
	const query_string = 'UPDATE items SET name = ?, quantity = ?, price = ? WHERE id = ?;';
	const payload = [
		req.body.name,
	    req.body.quantity,
	    req.body.price,
	    req.body.id
	];

	client.query(query_string, payload, (err, data) => {
	    if (!err) {
		    res.send(data);
		    console.log('Successfull in updating item basic information!');
		} else {
            console.log("An error occured in editing an item information!");
            console.log(err);
		}
	});
};

// DELETE AN ITEM
exports.delete_item = (req, res, next) => {
	const query_string = 'DELETE FROM items WHERE id = ?;';
	const payload = [req.params.id];

	client.query(query_string, payload, (err, data) => {
		if (!err) {
			res.send(data);
	        console.log('Successfully deleted an item!');
		} else {
			console.log('Item was not found!');
		}
	});
};