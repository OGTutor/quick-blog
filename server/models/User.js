const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		name: String,
		email: { type: String, required: true, unique: true },
		password: String,
		image: String,
		typeOfBlog: String,
		biography: String,
		instagram: String,
		pinterest: String,
		github: String,
	},
	{ timestamps: true }
);

module.exports = model('User', schema);
