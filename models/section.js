const mongoose = require('mongoose')

var Section =  mongoose.Schema({
    totalSeats : Number,
    title : {
        type : String
    },
    enrolledStudents :[{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})


module.exports = mongoose.model('section', Section);
