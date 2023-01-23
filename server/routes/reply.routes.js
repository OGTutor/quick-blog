const express = require('express');
const auth = require('../middleware/auth.middleware');
const Reply = require('../models/Reply');
const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(auth, async (req, res) => {
		try {
			const { orderBy, equalTo } = req.query;
			const list = await Reply.find({ [orderBy]: equalTo });
			res.send(list);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred on the server. Try it later!' });
		}
	})
	.post(auth, async (req, res) => {
		try {
			const newReply = await Reply.create({
				...req.body,
				userId: req.user._id,
			});
			res.status(201).send(newReply);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred on the server. Try it later!' });
		}
	});

router.patch('/:replyId', auth, async (req, res) => {
	try {
		const { replyId } = req.params;
		const reply = req.body;

		if (replyId && reply) {
			const updatedReply = await Reply.findByIdAndUpdate(replyId, reply, {
				new: true,
			});
			res.send(updatedReply);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'An error occurred on the server. Try it later!' });
	}
});

router.delete('/:replyId', auth, async (req, res) => {
	try {
		const { replyId } = req.params;
		const removedReply = await Reply.findById(replyId);

		if (removedReply.userId.toString() === req.user._id) {
			await removedReply.remove();
			return res.send(null);
		} else {
			res.status(401).json({ message: 'Unauthorized' });
		}
	} catch (error) {
		res
			.status(500)
			.json({ message: 'An error occurred on the server. Try it later!' });
	}
});

module.exports = router;
