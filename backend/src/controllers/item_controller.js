const Item = require('../models/Item');


const createItem = async(req , res) => {
    try {
        const {name , description, price, category, image, stock} = req.body;
        const newItem = await Item.create({name,description,price,category,image,stock});
        
         res.status(201).json({
        
        Item: {
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          category: newItem.category,
          image: newItem.image,
          stock: newItem.stock
        }
       })
    } catch (error) {
        res.status(500).json({ msg: 'Failed to create item', error: error.message});
    }
}


const getAllItems = async(req,res) => {
    try {
        const {category} = req.query;
         let filter = {};
         if(category){
            filter.category = category;
         }

         const items = await Item.find(filter);
         res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ msg: 'failed to fetch items', error: error.message});
    }
}

module.exports = { createItem,getAllItems };