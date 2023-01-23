const { Schema, model } = require('mongoose');

const schema = new Schema(
	{
		content: { type: String, required: true },
		commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
		pageId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		likedUsers: Array,
		likes: Number,
	},
	{
		timestamps: { createdAt: 'created_at' },
	}
);

module.exports = model('Reply', schema);
