var express = require('express');
var conDB = require('../lib/conDB');
var router = express.Router();

var dataPayload = {
	bank: [],
	digital: []
};

router.get('/', function(req, res, next) {
	conDB.query('SELECT * FROM banktransfer', function(err, rows, fields) {
		dataPayload.bank = rows
	});

	conDB.query('SELECT * FROM digitalpayment', function(err, rows, fields) {
		dataPayload.digital = rows
	});

	setTimeout(function() {
		res.send(dataPayload)
	}, 1000)
});

router.get('/bank/:id', function(req, res, next) {
	var id = req.params.id;

	conDB.query('SELECT * FROM banktransfer WHERE id='+id, function(err, rows, fields) {
		res.send(rows[0])
	});
});

router.get('/digital/:id', function(req, res, next) {
	var id = req.params.id;

	conDB.query('SELECT * FROM digitalpayment WHERE id='+id, function(err, rows, fields) {
		res.send(rows[0])
	});
})

module.exports = router;