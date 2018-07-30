const express = require('express')
const router = express.Router();
const userModel = require('../../models/user')
const Course = require('../../models/user')

const Section = require('../../models/section')


const validateStudent=(req,res,next)=>{
    console.log("validating student ")

    const studentId = req.params.sid;

    userModel.findOne( {username : studentId}).then((student)=>{


        console.log("finding student by Id ");
        console.log(student)
        req.user = student;
        if(student) next()
        else res.status(403).send({message : "studentId validation error"})
    })

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
// /api/student/:sid/section/:kid
// Enrolls student sid into section kid
router.post('/:sid/section/:sectionId',
    validateStudent,
    validateSectionId,
    (req,res,next)=>{
    console.log(req.originalUrl)


    var student = req.user;
    var section = req.section;


    student.enrolledSections.push(section._id)


    section.enrollStudent(student._id,(err,savedSection)=>{
            if(err)
                res.status(403).send({message: err.toString()})
            else{
                console.log(savedSection)

                student.save().then((student)=> {
                    console.log("student saved successfully")
                    console.log(student)
                    res.send(student)

                }).catch(err=>{
                        res.status(403).send({message : err.toString()})
                    })

            }

        })

})

//
// GET
// /api/student/:sid/section
// Retrieves all the sections a student is enrolled in
router.get('/:sid/section',
    validateStudent,
    (req,res,next)=>{
    console.log(req.originalUrl)


    var enrolledSections =[];
        userModel.findOne({_id: req.user._id}).populate('enrolledSections').exec
        (function (err, populatedUser ){
                if(err)
                {
                    res.status(403).send(enrolledSections);

                }

               enrolledSections = populatedUser.enrolledSections;
                res.status(200).send(enrolledSections);

            }
        )

        console.log(enrolledSections)

})


//
// DELETE
// /api/student/:sid/section/:kid
// Un-enrolls a student sid from section kid
router.delete('/:sid/section/:sectionId',validateStudent,validateSectionId,(req,res,next)=>{
    console.log(req.originalUrl)
    const sectionId = req.section._id
    const student = req.user;
    const section = req.section;

    const tempSectionList = student.enrolledSections


    console.log("tempSectionList")
    console.log(tempSectionList)



    student.removeSectionId(sectionId, (result)=>{
        if(result)
        {
            console.log(result)
            section.unenrollStudent(student._id,(err,savedSection)=>{
                if(err)
                {
                    res.status(403).send({message :err.toString()})
                }
                else{
                    console.log(savedSection)
                    console.log(student)

                    res.status(200).send({student})


                }

            })
        }
        else {
            res.status(403).send({message :result.toString()})
        }

    })



    //
    // const filteredSectionList = tempSectionList.
    // filter(tempSectionId=>{return tempSectionId.toString() != sectionId.toString() } )
    // console.log("filtered list")
    // console.log(filteredSectionList)

    // student.enrolledSections = filteredSectionList
    // student.save().then((student)=>{
    //     console.log(student)
    //     section.unenrollStudent(student._id,(err,savedSection)=>{
    //         if(err)
    //         {
    //             res.status(403).send({message :err.toString()})
    //         }
    //         else{
    //             console.log(savedSection)
    //             console.log(student)
    //
    //             res.status(200).send({student})
    //
    //
    //         }
    //
    //     })
    // })


})



 module.exports= router
