const express = require('express')
const router = express.Router();
const studentModel = require('../../models/user')

const validateStudent=(req,res,next)=>{
    console.log("validating student ")

    const studentId = req.params.sid;

    studentModel.findOne( {username : studentId}).then((student)=>{


        console.log("finding student by Id ");
        console.log(student)
        req.student = student;
        if(student) next()
        else res.status(403).send({message : "studentId validation error"})
    })

}



//
// POST
// /api/student/:sid/section/:kid
// Enrolls student sid into section kid
router.post('/:sid/section/:kid',validateStudent, (req,res,next)=>{
    console.log(req.originalUrl)

    const kid = req.params.kid

    var student = req.student;
    student.enrolledSections.push(kid)
    student.save().then((student)=>console.log(student))
    res.status(501).send({student})

})

//
// GET
// /api/student/:sid/section
// Retrieves all the sections a student is enrolled in
router.get('/:sid/section',validateStudent, (req,res,next)=>{
    console.log(req.originalUrl)

    const student = req.student;

    res.status(501).send({enrolledSections : student.enrolledSections})
})


//
// DELETE
// /api/student/:sid/section/:kid
// Un-enrolls a student sid from section kid
router.delete('/:sid/section/:kid',validateStudent, (req,res,next)=>{
    console.log(req.originalUrl)
    const kid = req.params.kid

    var student = req.student;
    const tempSectionList = student.enrolledSections.filter(((sectionId)=>{return sectionId != kid}))
    student.enrolledSections = tempSectionList
    student.save().then((student)=>console.log(student))
    res.status(501).send({student})

})



 module.exports= router
