const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });
const fileMiddleware = require('../middleware/file.middleware');

router.patch(
	'/:userId',
	auth,
	fileMiddleware.single('avatar'),
	async (req, res) => {
		try {
			const { userId } = req.params;
			const user = { ...req.body, avatar: req.file };

			if (userId === req.user._id) {
				const updatedUser = await User.findByIdAndUpdate(userId, user, {
					new: true,
				});
				res.send(updatedUser);
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

router.get('/', auth, async (req, res) => {
	try {
		const list = await User.find();
		res.send(list);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'An error occurred on the server. Try it later!' });
	}
});

module.exports = router;
