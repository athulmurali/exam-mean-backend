var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');


var Course = new Schema({
    courseId: {
        type: Number,
        index: true,
        required: [true, 'course id is required']
    },

    totalSeats :  {
        type    : Number,
        required: [true, 'Total number of seats  is required']
    },

    sections : {
        type :
            [{
                title               : {type : String},
                totalSeats          : {type : Number},
                enrolledStudents    : {type : [Number] }

            }
        ]

    },

    enrolledStudents : {
        type : [Number]
    }
});

// User.plugin(passportLocalMongoose);



module.exports = mongoose.model('course', Course);
