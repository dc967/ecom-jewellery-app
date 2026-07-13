const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const { generateAccessToken , generateRefreshToken } = require('../utils/generateTokens');



async function register(req, res){
   
    try {
         const {name,email,password } = req.body;

         if(!name || !password || !email ){
            return res.status(400).json({ msg: 'Name, email and password are required'});
         }


         const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({ msg: 'email already registered'});
        }

        const usercount = await User.countDocuments();
        const role = usercount === 0 ? 'admin' : 'customer';

        const user = new User({name,email,password,role});
        await user.save();
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

       res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 *  1000
       });

       res.status(201).json({
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
       })

    } catch (error) {
        res.status(500).json({ msg: 'Registration failed', error: error.message});
    }
}


async function Login(req, res){
    try {
        
      const { email, password } = req.body;

      if(!email || !password){
        return res.status(400).json({ msg: 'email and password required'});
      }
      
      const user = await User.findOne({email});
      if(!user){
        return res.status(401).json({ msg: 'Invalid email aur password'});
      }

       
    const ismatch = await user.comparePassword(password);
    if(!ismatch){
        return res.status(401).json({ msg: 'Invalid email aur password'});
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
       });

       res.status(200).json({
        accessToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
       })

    } catch (error) {
        res.status(500).json({ msg: 'Login failed', error:error.message});
    }
}



  async function Logout(req,res){
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });
        res.status(200).json({ msg: 'logout successfully'});
    } catch (error) {
        res.status(500).json({ msg: 'logout failed', error: error.message});
    }
  }

  module.exports = { register , Login,Logout};