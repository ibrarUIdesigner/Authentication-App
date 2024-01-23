const express = require('express');
const corse = require('cors');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const UserRoutes = require('./Routers/User.routes');
const errorHandler = require('./ErrorHandlers/errorHandler');
const AppError = require('./ErrorHandlers/appError');

const app = express();

//* Middlewares
app.use(express.json());
app.use(corse());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

//* ROUTES
app.use('/api', UserRoutes);
app.disable('x-powered-by'); //less hacker know about your stack

app.all('*', (req, res, next) => {
	return next(new AppError(`cant fint ${req.originalUrl} on this server`, 400));
});

//* ERROR HANDLER

// app.use((err, req, res, next) => {
// 	err.statusCode = err.statusCode || 500;
// 	err.status = err.status || 'fails';

// 	console.log('MID ERRIR', err);

// 	return res.status(err.statusCode).json({
// 		status: err.status,
// 		code: err.statusCode,
// 		message: err.message,
// 		name: err.name,
// 		error: err,
// 		stack: err.stack,
// 	});
// });

app.use(errorHandler);

module.exports = app;
