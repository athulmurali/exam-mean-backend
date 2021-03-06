const express = require('express')
const router = express.Router();
console.log("loading api/courses")

const Course = require('../../models/course')
const Section = require('../../models/section')


const  validateCourseId = (req, res, next) =>{

        const  courseId = parseInt(req.params.courseId)
        console.log("validating course id : ",courseId)
        Course.findOne({courseId}).
        then((course)=>{
            if (course)
            {
                req.course = course
                next()
            }
            else{
                res.status(403).send({message : "Invalid  courseId"})
            }
        }).
        catch(err=>{res.status(403).send({message :err.toString()})})
}




const  validateSectionId = (req, res, next) =>{

    const  sectionId = req.params.sectionId
    console.log("validating section id : ",sectionId)
    Section.findOne({_id :sectionId}).
    then((section)=>{
        if (section)
        {
            req.section = section
            next()
        }
        else{
            res.status(403).send({message : "Invalid  sectionId"})
        }
    }).
    catch(err=>{res.status(403).send({message :"No such section id"})})
}




//
// POST
// /api/course/:courseId/section
// Creates a new section for a given course

router.post('/course/:courseId/section', validateCourseId,(req,res,next) => {


    console.log("Current path:  "  + req.originalUrl)

    new Section(req.body).save().then(newSection=>{
        if (newSection)
        {
            console.log(newSection)
            let editedCourse = req.course
            editedCourse.sections.push(newSection._id);
            editedCourse.save()
                .then((editedCourse)=>{
                    console.log("section added to course successfully")
                    console.log(editedCourse)
                    res.send(newSection)
                })
                .catch((err)=>{
                console.log("Error :...")
                console.log(err)
                res.status(403).send({message : err.toString()})
            })
        }
    }).catch((err)=>{
        console.log("Error :...")
        console.log(err)
        res.status(403).send({message : err.toString()})
    })

})


// GET
// /api/course/:courseId/section
// Retrieves all the sections for a given course
router.get('/course/:courseId/section', validateCourseId,(req,res,next) => {
        console.log("Current path:  " + req.originalUrl)

        // Find and populate
        Course.findOne({courseId: req.course.courseId}).populate('sections').exec(function (err, populatedCourses ){

            if (!err)
            {   console.log(populatedCourses);
               return res.send(populatedCourses.sections)
            }

            else{

                console.log("Error :...")
                console.log(err)
                res.status(403).send({message : err.toString()})
            }
        })
    }
)




// GET
// /api/section/:sectionId
// Retrieves a section by its id
router.get('/section/:sectionId', validateSectionId,(req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
    // res.send({message : "route found success!"}
    res.send(req.section)
})



// PUT
// /api/section/:sectionId
// Updates a section
router.put('/section/:sectionId', validateSectionId,(req,res,next) => {
        console.log("Current path:  " + req.originalUrl);

        console.log("section in req : ");
        console.log(req.section)
        req.section.title                   = req.body.title;
        req.section.totalSeats              = req.body.totalSeats;

        // req.section.enrolledStudents        = req.body.enrolledStudents;


        req.section.save().then(savedSection => {
            console.log("saved section  ")
            console.log(savedSection)
            res.send(savedSection)
        }).catch(err=>{res.status(403).send({message :err.toString()})})

    }
)



// DELETE
// /api/section/:sectionId
// Removes a section
router.delete('/course/:courseId/section/:sectionId', validateCourseId,validateSectionId,(req,res,next) => {


    const section = req.section;
    section.remove().then((result)=>{
        console.log("in Section remove result ")
        console.log(result)
        res.send(result)
    }).catch((err)=>{
        console.log("Error :...")
        console.log(err)
        res.status(403).send({message : err.toString()})
    })


})



// to be restricted to admin
router.post('/course/:courseId', function(req, res, next) {

    const courseId = req.params.courseId
    console.log(req.body)

    const obj = {
        courseId: courseId,
    }

    Course.findOne(  {
            courseId : courseId
        }
    ).then((receivedUser) => {
        if (receivedUser) {
            console.log("Course already exists ! ");
            res.status(409);
            res.send({
                error : "Error ! Course already exists!"
            })
        }

        else {

            console.log("attempting to create new course seats register and save. ")
            console.log(obj)
            new Course(obj).save().then((newCourse) => {
                console.log("newUser created ")
                console.log(newCourse)
                res.send(newCourse);
            }).catch((err)=>{
                console.log("Error :...")
                console.log(err)


            })
        }
    })

})



module.exports = router;
