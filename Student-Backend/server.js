// iska purpose y ha kay ya poray project ki base file ha ismy hm sb kuch main cheezain define kraingay

// import the packages that  we need to use in our server
const express = require("express");
const mongoose = require("mongoose");
// routing kay liay cors ko use kr rhay haina
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes =require("./routes/authroutes");
// import the database connection  function from config/db.js file
const connectDB = require("./config/db");

// importing the route file
const studentRoutes = require('./routes/studentroutes')

// load environment variables from .env file
dotenv.config();

// call the databse connection function to connect to mongoose
connectDB();

// express jo ha vo as a middleware kam kr rha ha like bridge
// create a variable for using express package
const app = express();



// app ko use kr rhay hain apis kay liay or hmnay isy json format m rakh dia ha
// now indicating the express server to use json format for sending and recieving data
app.use(express.json());

// enabling cors for all routes
app.use(cors());

// router calling
app.use('/api/students', studentRoutes);

app.use('/api/auth', authRoutes);
// running nodejs on registered port
// getting prort from .env file
const PORT = process.env.PORT;

// running the server on this port now
app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});
