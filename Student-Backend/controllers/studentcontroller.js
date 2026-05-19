// importing  the student model/schema
const Student = require("../models/student");

// API no 1
// now creating the API of adding the student data
const addStudent = async (req, res) => {
  try {
    // getting the data from user for each coulmn/field
    const { name, email, course, city, marks } = req.body;

    // validating the data before saving
    if (!name || !email || !course || !city || marks === undefined || marks === null) {
      return res.status(400).json({
        status: false,
        message: "Please provide all required fields ",
      });
    }

    // if user enter all the fields then save data into database
    const student = await Student.create({ name, email, course, city, marks });

    // getting the success status
    res.status(200).json({
      success: true,
      message: "Student data created successfully !",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// API no 2
// API for fetching all the students data
const getALLStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      message: "All Students fetched successfully!",
      // finding the total lenghth of all data
      count: students.length,
      // displaying all the data
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// API no 3
// API to get any specific data
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Here is Student data",
      data: student,
    });
  } catch (error) {
    // jb koi argument/id  pas kr rhy ho to vo sai nia pass kr rhy to casterror ayay ga
    // casterror mngodb ka ak fixed word ha
    if (error.name == "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// API no 4
// API to update the specific student data
const updateStudent = async (req, res) => {
  try {
    const { name, email, course, city, marks } = req.body;
    //  validation
    if (!name || !email || !course || !city || marks === undefined || marks === null) {
      return res.status(400).json({
        success: false,
        message: "please provide the required fields",
      });
    }

    // getting the student previous data to update
    const updateData = {};
    // getting the previous values from database
    // ab hm jo bi data change kraingay vo yahan pay save hoga changes save krta jayay ga
    updateData.name = name;
    updateData.email = email;
    updateData.course = course;
    updateData.marks = marks;
    updateData.city = city;

    // finally updating the data into database
    const student = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
    // validating if student not found
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Student data updated successfully!",
      data: student,
    });
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// API no 5
// API for deleting the Student data
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Student data deleted successfully!",
      deleteId: req.params.id,
    });
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// exporting this module
module.exports = { addStudent, getALLStudents, getStudentById, updateStudent, deleteStudent};
