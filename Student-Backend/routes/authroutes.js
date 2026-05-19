// Router() it is expressjs function use to setup the path
const express = require('express');

const router= express.Router();

const {register} =require('../controllers/authcontroller');

router.post('/register',register);

module.exports = router;