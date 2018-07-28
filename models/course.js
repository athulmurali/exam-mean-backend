var mongoose = require('mongoose');

var Course =  mongoose.Schema({
    courseId: {
        type: Number,
        index: true,
        required: [true, 'course id is required'],
        unique: true
    },
    sections : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'section'
        }
    ],

});

// User.plugin(passportLocalMongoose);



module.exports = mongoose.model('course', Course);
