


const User = require('../../models/user')

var express = require('express');
var router = express.Router();
console.log("loading api/users")


// POST
// /api/register
// Creates a new user in the mongo database and logs them in


// POST
// /api/login
// Finds the user in the mongo database and logs them in
router.post('/login', (req,res,next) => {

    console.log("Current path:  "  + req.originalUrl)
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

router.get('/profile', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
})


// PUT
// /api/profile
// Updates the profile of the currently logged in user

router.put('/profile', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
})



// DELETE
// /api/profile
// Removes the profile of the currently logged in user
router.delete('/profile', (req,res,next) => {
    console.log("Current path:  "  + req.originalUrl)
})



module.exports = router;
