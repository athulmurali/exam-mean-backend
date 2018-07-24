const express = require('express')
const router = express.Router();
console.log("loading api/courses")


const  validateCourseId = (req, res, next) =>{

    const  courseId = parseInt(req.params.courseId)
    console.log("validating course id : ",courseId)
    if(courseId != -100){
        next()
    }
    else     res.status(403).send({message : "Invalid  courseId"})

}


//
// POST
// /api/course/:courseId/section
// Creates a new section for a given course

router.post('/course/:courseId/section', validateCourseId,(req,res,next) => {

    console.log("Current path:  "  + req.originalUrl)
    res.send({message : "route found success!"})
})





// GET
// /api/course/:courseId/section
// Retrieves all the sections for a given course

router.get('/course/:courseId/section', validateCourseId,(req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
    res.send({message : "route found success!"})
})




// GET
// /api/section/:sectionId
// Retrieves a section by its id
router.get('/section/:sectionId', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
    res.send({message : "route found success!"})
})



// PUT
// /api/section/:sectionId
// Updates a section
router.put('/section/:sectionId', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
    res.send({message : "route found success!"})
})



// DELETE
// /api/section/:sectionId
// Removes a section
router.delete('/section/:sectionId', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
    res.send({message : "route found success!"})
})





module.exports = router;
