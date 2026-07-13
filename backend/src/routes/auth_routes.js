const express = require('express');
const router = express.Router();
const { register, Login ,Logout} = require('../controllers/auth_controller');

router.post('/register', register);
router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router;