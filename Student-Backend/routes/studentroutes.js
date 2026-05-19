// Router() it is expressjs function use to setup the path
const express = require('express');

const router= express.Router();

// importing the student controller
const { addStudent, getALLStudents, getStudentById, updateStudent, deleteStudent }= require('../controllers/studentcontroller')

// defining the route
router.post('/add',addStudent);
router.get('/allstudents',getALLStudents );
router.get('/getstudent/:id',getStudentById);
router.put('/update/:id',updateStudent );
router.delete('/delete/:id',deleteStudent);

// finally exporting the router
module.exports = router;