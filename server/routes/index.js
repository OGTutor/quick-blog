const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/user', require('./user.routes'));

module.exports = router;
