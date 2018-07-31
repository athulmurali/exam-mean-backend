
const  url = require('url');


var express = require('express');
var router = express.Router();

const Course = require('../models/course')
/* GET users listing. */
router.get('/hello', function(req, res, next) {

    res.send({ courseId: "cs1234" , totalSeats: 40});
});



router.put('/', function (req,res,next) {
    // console.log(req.params)

    Course.findOneAndUpdate({ courseId: req.body.courseId },
                            { $inc: { totalSeats: 1 } },
                            {new: true },
        function(err, response) {
        if (err) {
            res.send({message : err.toString()})
        }
        else if(!response){
            res.status(403)
            res.send({message : "No such course exists"})

        }

        else {
            console.log(response)
            res.send(response)

        }

    })

    // res.status(402)
    // res.send({message : "error !empty"})


})


router.get('/', function (req,res,next){

    Course.find().then(result=>{
        console.log(result)
        res.send(result)
    }).catch(err=>{
        throw err;
        console.log(err)
        res.status(403)
        res.send({message : err.toString()})

    })


})


const courseRouter = require('./course')
router.use('/course', courseRouter)
module.exports = router;
