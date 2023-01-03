const { Schema, model } = require('mongoose');

const schema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	content: { type: String, required: true },
	themes: { type: Array, required: true },
	cover: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = model('Article', schema);
