const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const User = require('../models/user')

module.exports={
    validateToken : (req,res,next)=>{
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, keys.jwt.secret, function(err, decoded) {
            if (err) {
                console.log(err)
                // next(err)
                return res.status(401).send({error : err.toString()})
            }
            else{
                req.decoded = decoded

                User.findOne({_id:decoded.id}).
                then((user)=>{
                    if(user)
                    {
                        console.log("user from token : ")
                        console.log(user)
                        req.user= user
                        next() }
                    else
                    {
                        err = new Error("JWT -  No such user")
                        return res.status(401).send({error : err.toString()})

                    }
                }).
                catch((err)=>{
                    // next(err);
                    return res.status(401).send({error : err.toString()})
                })
            }

        });
    }

}

