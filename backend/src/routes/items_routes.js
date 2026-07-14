const express = require('express');
const router = express.Router();
const { createItem, getAllItems } = require('../controllers/item_controller');
const { protect, isAdmin } = require('../middleware/auth_middleware');

router.post('/',protect, isAdmin, createItem);
router.get('/',getAllItems);

module.exports = router;