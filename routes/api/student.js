const express = require('express')
const router = express.Router();

const validateStudent=(req,res,next)=>{
    console.log("validating student ")
    if(true) next()
    else res.status(403).send({message : "studentId validation error"})
}



//
// POST
// /api/student/:sid/section/:kid
// Enrolls student sid into section kid
router.post('/:sid/section/:kid',validateStudent, (req,res,next)=>{
    console.log(req.originalUrl)
    res.status(501).send({message : "Feature in development"})

})

//
// GET
// /api/student/:sid/section
// Retrieves all the sections a student is enrolled in
router.get('/:sid/section/:kid',validateStudent, (req,res,next)=>{
    console.log(req.originalUrl)
    res.status(501).send({message : "Feature in development"})
})


//
// DELETE
// /api/student/:sid/section/:kid
// Un-enrolls a student sid from section kid
router.delete('/:sid/section/:kid',validateStudent, (req,res,next)=>{
    console.log(req.originalUrl)
    res.status(501).send({message : "Feature in development"})

})



 module.exports= router
