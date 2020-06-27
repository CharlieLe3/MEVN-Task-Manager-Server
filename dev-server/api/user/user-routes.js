const express = require('express');
const router = express.Router();
const controller = require('./user-controller');

router.get('/user', controller.index);

module.exports = router;