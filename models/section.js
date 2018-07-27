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



Section.pre('save',function(next){

    var section = this;


    if (!!section.enrolledStudents  && section.enrolledStudents.length > section.totalSeats){
        const error = new Error('No seats left! Cannot enroll  in this section. ')
        console.log(error)
        next(error)
    }
    else next();
})




Section.methods.enrollStudent = function(studentId, next) {
    var section = this;


    if (!!section.enrolledStudents  && section.enrolledStudents.length > section.totalSeats){
        const error = new Error('No seats left! Cannot enroll  in this section. ')
        console.log(error)
        next(error)
    }
    else if(!!section.enrolledStudents  &&
        section.enrolledStudents.indexOf(studentId) > -1 )
    {
        const error = new Error('Section validation : Student already enrolled in section ')
        console.log(error)
        next(error)
    }
    else{
        section.enrolledStudents.push(studentId)
        section.save().then(savedSection =>{
            next(null,savedSection)
        }).catch(err=>next(err))

    }


};



Section.methods.unenrollStudent = function(studentId, next) {
    var section = this;

    console.log(section, studentId)

    if(!section.enrolledStudents  ||
        section.enrolledStudents.indexOf(studentId) <= -1 )
    {
        const error = new Error('Section validation : Student already unenrolled ')
        console.log(error)
        next(error)
    }

    else{
        const filteredList =  section.enrolledStudents.filter((currentStudentId)=>{
            return currentStudentId.toString() != studentId.toString()
        })

        section.enrolledStudents = filteredList
        section.save().then(savedSection =>{
            next(null,savedSection)
        }).catch(err=>next(err))
    }
};



module.exports = mongoose.model('section', Section);
