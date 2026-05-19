// in this file we are going to make mongodb connection
const mongoose = require("mongoose");
// node.js asynchronous ha
// try catch is using for exceptional handling

const connectDB = async () => {
  try {
    // getting mongoDB file from env file
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb is connected succesfully");
    
  } catch (error) {
    console.log("Error in connecting to MOngodb:", error);
  }
};

// export this file to use in server.js
module.exports= connectDB;