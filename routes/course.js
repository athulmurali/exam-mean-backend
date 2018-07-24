

var express = require('express');
var router = express.Router();

const Course = require('../models/course')
/* GET users listing. */
router.put('/enroll',   function(req, res, next) {
    console.log(req.query.courseId)

    const courseId = parseInt(req.query.courseId)

    const studentId= req.body.studentId

    Course.findOne({courseId : courseId}).then(course=>{
        if(course){

            console.log("before push ")
            console.log(course)

            if(course.enrolledStudents.includes(studentId))
            {
                res.status(409)
                res.send({message : "student id already enrolled"})
            }
            else
                {
                course.enrolledStudents.push(studentId)
                console.log(course)

                course.save().then(courseAfterSave=> {

                        console.log(courseAfterSave)

                        res.send(courseAfterSave)

                    })

                }

        }
        else{

            res.status(403)
            res.send({message : "Unable to find the course id "})

        }
    })
});

router.put('/unenroll', function(req, res, next) {
    console.log(req.query.courseId)

    const courseId = parseInt(req.query.courseId)

    const studentId= req.body.studentId

    Course.findOne({courseId : courseId}).then(course=>{
        if(course){

            console.log("before push ")
            console.log(course)

            if(!course.enrolledStudents.includes(studentId))
            {
                res.status(403)
                res.send({message : "student id not present"})
            }
            else
            {
                course.enrolledStudents.push(studentId)
                const unenrolledList = course.enrolledStudents.filter(currentStudentId =>  (currentStudentId!=studentId))
                course.enrolledStudents = unenrolledList
                course.save().then(courseAfterSave=> {
                    console.log(courseAfterSave)
                    res.send(courseAfterSave)
                })
            }
        }
        else{

            res.status(403)
            res.send({message : "Unable to find the course id "})

        }
    })

});


module.exports = router;
