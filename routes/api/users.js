
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const keys = require('../../config/keys')

var express = require('express');
const validateToken = require("../../middlewares/auth").validateToken;
var router = express.Router();
console.log("loading api/users")




// POST
// /api/register
// Creates a new user in the mongo database and logs them in
router.post('/register',(req,res,next)=>{

    console.log(req.body)

    const currentUser = req.body

    console.log("attempting to create new user and save. ")
    console.log(currentUser)
    new User(currentUser).save().
    then((newUser) => {
        console.log("newUser created ")
        console.log(newUser)
        // res.send(newUser);

        var token = jwt.sign({ id: newUser._id }, keys.jwt.secret, {
            expiresIn: 24*60*60*1000 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
        // res.send(user)


    }).catch((err)=>{
        console.log("Error :...")
        console.log(err)
        res.status(409).send(err)
            })
})





// POST
// /api/login
// Finds the user in the mongo database and logs them in
router.post('/login', (req,res,next) => {

    console.log("Current path:  "  + req.originalUrl)

    console.log(req.body)
    const username =req.body.username
    User.findOne({username : username}).then((user)=>{

        if(user)
        {
            user.comparePassword(req.body.password, (err,isMatch)=>{

                if (err)  res.status(403).send({message : "authentication failed!"})
                else if (!isMatch) res.status(403).send({message : "authentication failed!"})
                else {

                    var token = jwt.sign({ id: user._id }, keys.jwt.secret, {
                        expiresIn: 24*60*60*1000 // expires in 24 hours
                    });
                    res.status(200).send({ auth: true, token: token });
                    // res.send(user)

                }

            }) ;

        }

        else  res.status(403).send({message : "authentication failed!"})

    })



})




// POST
// /api/logout
// Logs out the currently logged in user

router.post('/logout', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
})


// GET
// /api/profile
// Retrieves the profile of the currently logged in user

router.get('/profile', validateToken,(req,res,next) => {


    console.log("Current path:  "  + req.originalUrl)
    console.log("decoded : ",   req.decoded)
    res.send(req.user)

})


// PUT
// /api/profile
// Updates the profile of the currently logged in user

router.put('/profile', validateToken,(req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)

    req.user.set(req.body)

    console.log("user : to be changed as ");
    console.log(req.user)

    console.log();
    req.user.save().then((savedUser)=>{
        console.log("saved user :")
        console.log(savedUser)
        return res.send(savedUser)
    }).catch(err=>res.status(403).send({message : err.toString()}))


})


// DELETE
// /api/profile
// Removes the profile of the currently logged in user
router.delete('/profile', validateToken,(req,res,next) => {

    console.log("Current path:  "  + req.originalUrl)
    console.log("attempting  : remove user ")


        req.user.remove().
        then((result)=>{
            if(result) console.log(result)
            res.send(result);
        }).
        catch(err=>{res.status(403).send({message : err.toString()})})

})



// GET
// isUserIdTaken
router.get('/isUserIdAvailable/:username',(req,res,next)=>{

    console.log("username check: " + req.params.username)
    User.findOne({username: req.params.username}).then(user=>{
        if(user){
            return res.status(409).send({error : "Already taken!"})

        }
        else{
            return res.send({message : "available"})
        }
    })

})

module.exports = router;
