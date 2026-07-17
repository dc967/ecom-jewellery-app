const Order = require('../models/Order');


const createOrder = async (req , res) => {
   try {
    const { items, shippingAddress } = req.body;
    if(!items || items.length === 0){
        return res.status(400).json({ msg: 'Order must have at least one item'});
    }

    const totalPrice = items.reduce((sum,item) => sum + (item.price * item.quantity), 0);

     const newOrder = await Order.create({
        user: req.user._id,
        items,
        totalPrice,
        shippingAddress
     });

     res.status(201).json({ order: newOrder});



   } catch (error) {
      res.status(500).json({ msg: 'failed to create order', error: error.message});
   }
}



const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.item');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ msg: 'failed to fetch orders', error: error.message });
    }
};

module.exports = {createOrder,getMyOrders};


const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
              .populate('user', 'name email')
              .populate('items.item');

              res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch orders', error: error.message});
    }
};

const updateOrderStatus = async (req,res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const findOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if(!findOrder){
            return res.status(404).json({ msg: 'Order not found'});
        }

        res.status(200).json({ order: findOrder });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to update orders status', error: error.message});
    }
}


module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };