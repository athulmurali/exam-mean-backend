
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const keys = require('../../config/keys')

var express = require('express');
var router = express.Router();
console.log("loading api/users")



const validateToken=(req,res,next)=>{
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, keys.jwt.secret, function(err, decoded) {
        if (err) {
            console.log(err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }


        else{
            req.decoded = decoded
            next();
        }

    });
}

// POST
// /api/register
// Creates a new user in the mongo database and logs them in
router.post('/register',(req,res,next)=>{

    console.log(req.body)

    var currentUser = req.body

    User.findOne(   {$or:[   {_id: "5b562f1a9bdf5108d8c4cb1e"},
            {_id: "5b562f1a9bdf5108d8c4cb1d"}]}
    ).then((receivedUser) => {
        if (receivedUser) {
            console.log("user already exists ! ");
        }

        else {

            console.log("attempting to create new user and save. ")
            console.log(currentUser)
            new User(currentUser).save().then((newUser) => {
                console.log("newUser created ")
                console.log(newUser)
                res.send(newUser);
            }).catch((err)=>{
                console.log("Error :...")
                console.log(err)
                res.status(409).send({message : err.toString()})
            })
        }
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
    console.log("decoded : ", req.decoded)
    res.send({message : "Profile accessed!"})
})


// PUT
// /api/profile
// Updates the profile of the currently logged in user

router.put('/profile', validateToken,(req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
})



// DELETE
// /api/profile
// Removes the profile of the currently logged in user
router.delete('/profile', validateToken,(req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
})



module.exports = router;
