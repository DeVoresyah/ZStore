var express = require('express');
var conDB = require('../lib/conDB');
var router = express.Router();

router.get('/', function(req, res, next) {
	conDB.query('SELECT * FROM category', function(err, rows, fields) {
		if (err) {
			throw err
		}

		res.send(rows);
	})
});

module.exports = router;