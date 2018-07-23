var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    username: {
        type: String,
         required: [true, 'user name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    firstName: {
        type: String,
        required: [true, 'first name is required']
    },

    lastName: {
        type: String,
        required: [true, 'last name is required']
    },

    password: {
        type: String,
        required: [true, 'password is required']
    },

    phone:  {
            type    : Number,
            required: [true, 'phone number is required']
    },
    dob : Date,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);
