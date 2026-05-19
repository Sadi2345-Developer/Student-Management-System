const jwt = require("jsonwebtoken");
const User = require("../models/user");

// registering JWT in this file
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// Register API
const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // validating the data before saving
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide all required fields ",
      });
    }
    // chaecking if the email already exists into DB or not
const existingUser = await User.findOne({email})
if(existingUser){
    return res.status(400).json({
        status:false,
        message:"This Email is already taken!"
    })
}
// else create the user
const user = await User.create({name,email,password})
// also generating the token parallel
const token =signToken(user._id)

res.status(201).json({
    success:true,
    message:'User created successfully!',
    
})
  } catch (err) {
    res.status(500).json({
        success:false,
        message:'Something went wrong!'
    })
  }
};
module.exports = {register};
