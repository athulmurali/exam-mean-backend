var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');


var Course = new Schema({
    courseId: {
        type: String,
        required: [true, 'course id is required']
    },

    totalSeats :  {
        type    : Number,
        required: [true, 'Total number of seats  is required']
    },

    enrolledStudents : {
        type : [Number]
    }
});

// User.plugin(passportLocalMongoose);


module.exports = mongoose.model('course', Course);
