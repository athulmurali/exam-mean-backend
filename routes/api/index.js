var express = require('express');
var router = express.Router();

const apiUsers      = require('./users')
const apiCourses    = require('./courses')
const apiStudents    = require('./student')



router.use('/', apiUsers)
router.use('/', apiCourses)
router.use('/student', apiStudents)



module.exports= router;
