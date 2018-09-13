var express = require('express');
var conDB = require('../lib/conDB');
var router = express.Router();

router.get('/:id', function(req, res, next) {
	var category = req.params.id;
	conDB.query('SELECT products.id, products.name, products.image, products.price, category.title FROM products INNER JOIN category ON products.category_id=category.id WHERE category_id='+category, function(err, rows, fields) {
		if (err) {
			throw err
		}

		res.send(rows);
	})
});

router.get('/detail/:id', function(req, res, next) {
	var pid = req.params.id;
	conDB.query('SELECT * FROM products WHERE id='+pid, function(err, rows, fields) {
		if (err) {
			throw err
		}

		res.send(rows[0]);
	})
});

router.post('/cart', function(req, res, next) {
	var data = req.body.product_id;
	var output = [];

	data.forEach(item => {
		conDB.query('SELECT id, name, image, price FROM products WHERE id='+item, function(err, rows, fields) {
			output.push(rows[0])
		});
	});

	setTimeout(()=> {
		res.send(output);
	}, 1000);
});

module.exports = router;