const mongoose = require("mongoose");

// definig the schema for student collection in Mongodb
const studentSchema = new mongoose.Schema({
  // here we define all the coulmn names
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
    // trim apkay name m say extra spaces ko remove krny kay liay use hota ha
    minLenght: [3, "Name contains at least 3 characters"],
    maxLenght: [40, "Name shuould not be more than 40 characters"],
    // ya string ha is wjah say minlenght or maxlenght use kia ha agar ya string na hoti to hm bs min or max likhtay
  },
  // ... rest of your code
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    // unique true ... agar ak email koi dosra user dobara repeate krta ha to ya osay repaet nai honay day ga
    unique: true,
    lowercase: true,
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    // jb hmnay multiple values ka data show ktrwana ho to hm enum likhtay or ak error msg shoiw krwatay hain
    enum: {
      values: ["Mern stack", "React", "AI", "Web", "Graphic"],
      message:
        "We are only offering these courses: Mern stack, React, AI, Web, Graphic",
    },
  },
  marks: {
    type: Number,
    required: [true, "Marks is required"],
    min: 0,
    max: 200,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Student', studentSchema)