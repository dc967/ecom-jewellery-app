const express = require('express');
const router = express.Router();
const { createItem, getAllItems,getItemById, updateItem, deleteItem } = require('../controllers/item_controller');
const { protect, isAdmin } = require('../middleware/auth_middleware');

router.post('/',protect, isAdmin, createItem);
router.get('/',getAllItems);
router.get('/:id', getItemById);
router.put('/:id', protect, isAdmin, updateItem);
router.delete('/:id', protect, isAdmin, deleteItem);

module.exports = router;