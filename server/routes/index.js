const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/user', require('./user.routes'));
router.use('/article', require('./article.routes'));
router.use('/comment', require('./comment.routes'));
router.use('/reply', require('./reply.routes'));

module.exports = router;
