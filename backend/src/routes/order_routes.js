const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/order_controller');
const { protect, isAdmin } = require('../middleware/auth_middleware');


router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, isAdmin, getAllOrders);
router.put('/:id', protect, isAdmin, updateOrderStatus);

module.exports = router;