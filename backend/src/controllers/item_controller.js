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

const getItemById = async(req,res) => {
    try {
        const {id} = req.params;
        const findItem = await Item.findById(id);
        if(!findItem){
            return res.status(404).json({ msg: 'Itme not found'});  
        }
        res.status(200).json({
            item:{
                _id: findItem._id,
                name: findItem.name,
                description: findItem.description,
                 price: findItem.price,
                 category: findItem.category,
                 image: findItem.image,
                  stock: findItem.stock
            }
        })
    } catch (error) {
        res.status(500).json({ msg: 'failed to fetch item', error: error.message});
    }
}


const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if(!deletedItem){
            return res.status(404).json({ msg: 'product not found'});
        }
        res.status(200).json({ msg: 'Item deleted successfully'});
    } catch (error) {
        res.status(500).json({ msg: "Failed to delete item", error:error.message});
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        res.status(200).json({ item: updatedItem });

    } catch (error) {
        res.status(500).json({ msg: 'Failed to update item', error: error.message });
    }
};


module.exports = { createItem,getAllItems,getItemById, deleteItem,updateItem };