const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		title: String,
		description: String,
		content: String,
		themes: String,
		cover: Object,
		likedUsers: Array,
		likes: Number,
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: { createdAt: 'created_at' },
	}
);

module.exports = model('Article', schema);
