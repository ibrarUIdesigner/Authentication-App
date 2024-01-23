const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {
		type: 'String',
		required: [true, 'Please provide a unique username'],
		unique: [true, 'username already exists, Please try another one'],
	},
	password: {
		type: 'String',
		required: [true, 'Please provide a password'],
		unique: false,
		select: false,
	},
	email: {
		type: 'String',
		required: [true, 'Please enter a valid email address'],
		unique: true,
	},
	firstName: { type: 'String' },
	lastName: { type: 'String' },
	mobile: { type: 'String' },
	address: { type: 'String' },
	profile: { type: 'String' },
	createdAt: { type: 'String', default: Date.now() },
});

module.exports = mongoose.model('Users', userSchema);
