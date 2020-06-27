const express = require('express');
const router = express.Router();
const controller = require('./tasks-controller');
const authService = require('../../services/auth-service');

router.post('/task', authService.requireLogin, controller.create);

router.get('/task', authService.requireLogin, controller.index);

router.get('/task/:id', authService.requireLogin, controller.show);

router.put('/task', authService.requireLogin, controller.update);

router.delete('/task/:id', authService.requireLogin, controller.remove);

module.exports = router;