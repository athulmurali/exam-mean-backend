var express = require('express');
var router = express.Router();

const User = require('../models/user')
/* GET users listing. */
router.get('/hello', function(req, res, next) {

    res.send(JSON.stringify({ a: 1 }));
});



router.post('/register', function(req, res, next) {

    console.log(req.body)


    const currentUser = {
        username: "avxass",
        email: "athulmurali@gmail.com",
        firstName: "Athul",
        lastName: "Muralidharan",
        password: "abcd1234",
        phone:123456,
        dob: Date.now()
    }

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
                res.send(currentUser);
            }).catch((err)=>{
              console.log("Error :...")
              console.log(err)
            })
        }
    })


})

module.exports = router;
