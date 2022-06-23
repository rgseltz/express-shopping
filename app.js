const express = require('express');
const shoppingRoutes = require('./shoppingRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use('/api/shopping', shoppingRoutes);

//404 for invalid url
app.use((req, res, next) => {
	let err = new ExpressError('Invalid URL', 404);
	return next(err);
});

//generic error handler
app.use((err, req, res, next) => {
	let message = err.message;
	let status = err.status;
	res.status(status).json(message);
	return next();
});

module.exports = app;
