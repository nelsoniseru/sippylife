const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/register', async (req, res) => {
    await authController.register(req, res);
});

router.post('/login', async (req, res) => {
    await authController.login(req, res);
});

module.exports = router;