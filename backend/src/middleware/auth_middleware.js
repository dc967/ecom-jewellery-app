 const jwt = require('jsonwebtoken');
 const User = require('../models/Users');



const protect = async (req , res, next) => {
   try {
      const authHeader = req.headers.authorization;
       if(!authHeader || !authHeader.startsWith('Bearer')){
         return res.status(401).json({ msg: 'Not authorized, no token'});
       }
       const token = authHeader.split(' ')[1];
       
       const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

       const user = await User.findById(decoded.id).select('-password');

       if(!user){
         return res.status(401).json({ msg: 'Not authorized, user not found'});
       }
        
       req.user = user;
       next();

   } catch (error) {
       res.status(401).json({ msg: 'Not authorized, token failed'});
   }
};

const isAdmin = (req,res,next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({ msg: 'Access denied, admin only'});
    }
};

module.exports = { protect, isAdmin};
