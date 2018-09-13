var express = require('express');
var conDB = require('../lib/conDB');
var router = express.Router();

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

router.post('/', function(req, res, next) {
	var phone = req.body.phone;

	conDB.query('SELECT * FROM transaction WHERE phone = '+ phone +' LIMIT 5', function(err, rows, fields) {
		if (err) {
			throw err
		}

		res.send(rows);
	});
});

router.get('/detail/:id', function(req, res, next) {
	var id = req.params.id;
	var dataToSend = {
		id: "",
		status: "",
		date: "",
		total: 0,
		orders: []
	}

	conDB.query('SELECT transaction_id, status, date, total FROM transaction WHERE id='+id, function(err, rows, fields) {
		var theTransaction = rows[0];
		dataToSend.id = theTransaction.transaction_id;
		dataToSend.status = theTransaction.status;
		dataToSend.date = theTransaction.date;
		dataToSend.total = theTransaction.total;
	});

	setTimeout(function() {
		conDB.query('SELECT orders.qty, orders.subtotal, products.name, products.image FROM orders INNER JOIN products ON orders.product_id = products.id WHERE orders.transaction_id="'+dataToSend.id+'"', function(err, rows, fields) {
			for (i=0; i<rows.length; i++) {
				dataToSend.orders.push(rows[i])
			}

			res.send(dataToSend);
		});
	}, 1500)
});

router.post('/create', function(req, res, next) {
	var data = req.body;
	var orders = req.body.orders;

	var dataPayload = {};

	var today = formatDate(new Date());
	var totalPrice = 0,
		insertId;

	for (i=0; i<orders.length; i++) {
		totalPrice = totalPrice + orders[i].subtotal
	}

	conDB.query('INSERT INTO transaction VALUES ("", "'+ data.transaction_id +'", "pending", "'+ today +'", "'+ totalPrice +'", "'+ data.phone +'")', function(err, rows, fields) {
		if (err) {
			throw err
		}

		setTimeout(() => {
			for (i=0; i<orders.length; i++) {
				conDB.query('INSERT INTO orders VALUES ("", "'+ orders[i].transaction_id +'", "'+ orders[i].product_id +'", "'+ orders[i].qty +'", "'+ orders[i].subtotal +'")', function(err, rows, fields) {
					if (err) {
						throw err
					}
				});
			}
		}, 500);

		insertId = rows.insertId
	});

	setTimeout(function(){
		res.send({
			id: insertId,
			transaction_id: data.transaction_id,
			status: 'Pending',
			date: today,
			total: totalPrice,
			phone: data.phone
		});
	}, 1000)
});

module.exports = router;