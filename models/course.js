var mongoose = require('mongoose');

const Section = require('./section')
var Course =  mongoose.Schema({
    courseId: {
        type: Number,
        index: true,
        required: [true, 'course id is required']
    },

    totalSeats :  {
        type    : Number,
        required: [true, 'Total number of seats  is required']
    },

    sections : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'section'
        }
    ],

    enrolledStudents : {
        type : [Number]
    }
});

// User.plugin(passportLocalMongoose);



module.exports = mongoose.model('course', Course);
