const express = require('express');
const auth = require('../middleware/auth.middleware');
const fileMiddleware = require('../middleware/file.middleware');
const Article = require('../models/Article');
const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(async (req, res) => {
		try {
			const { orderBy, equalTo } = req.query;
			const list = await Article.find({ [orderBy]: equalTo });
			res.send(list);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred on the server. Try it later!' });
		}
	})
	.post(auth, fileMiddleware.single('cover'), async (req, res) => {
		try {
			const newArticle = await Article.create({
				...req.body,
				cover: req.file,
				userId: req.user._id,
			});

			res.status(201).send(newArticle);
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred on the server. Try it later!' });
		}
	});

router.patch(
	'/:articleId',
	auth,
	fileMiddleware.single('cover'),
	async (req, res) => {
		try {
			const { articleId } = req.params;
			const article = { ...req.body, cover: req.file };

			if (articleId && article) {
				const updatedArticle = await Article.findByIdAndUpdate(
					articleId,
					article,
					{ new: true }
				);
				res.send(updatedArticle);
			} else {
				res.status(401).json({ message: 'Unauthorized' });
			}
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred on the server. Try it later!' });
		}
	}
);

router.delete('/:articleId', auth, async (req, res) => {
	try {
		const { articleId } = req.params;
		const removedArticle = await Article.findById(articleId);

		if (removedArticle.userId.toString() === req.user._id) {
			await removedArticle.remove();
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
