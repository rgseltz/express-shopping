const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/', (req, res) => {
	res.status(200).json({ items });
});

router.post('/', (req, res, next) => {
	try {
		let newItem = { name: req.body.name, price: req.body.price };
		items.push(newItem);
		if (!req.body.name || !req.body.price) throw new ExpressError('invalid product/price entry', 401);
		return res.status(201).json({ items: newItem });
	} catch (err) {
		return next(err);
	}
});

router.get('/:name', (req, res, next) => {
	let foundItem = items.find((i) => i.name === req.params.name);
	return res.status(200).json({ items: foundItem });
});

router.patch('/:name', (req, res, next) => {
	let foundItem = items.find((item) => item.name === req.params.name);
	foundItem.name = req.body.name;
	foundItem.price = req.body.price;
	return res.status(201).json({ items: foundItem });
});

module.exports = router;
