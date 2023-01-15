const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		title: String,
		description: String,
		content: String,
		themes: String,
		cover: Object,
		likedUsers: Array,
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: { createdAt: 'created_at' },
	}
);

module.exports = model('Article', schema);
