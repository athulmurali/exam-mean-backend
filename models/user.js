const   mongoose = require('mongoose');
const   Schema = mongoose.Schema;
const   bcrypt = require('bcrypt');
const   SALT_WORK_FACTOR = 10;

// var passportLocalMongoose = require('passport-local-mongoose');

const Roles = Object.freeze({
    Admin           : 'admin',
    Student         : 'student',
    Faculty         : 'faculty',
});



const UserSchema = new Schema({
    username: {
        type: String,
        unique : true,
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
    // timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }

    enrolledSections    : [{type : mongoose.Schema.Types.ObjectId,
                            ref : 'section'}],
    role : {
        type: String,
        enum: Object.values(Roles),
    }

});

Object.assign(UserSchema.statics, {Roles});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


UserSchema.pre('save', function(next) {
    var user = this;

    var err = new Error('User pre save error : Duplication in enrolledSections.' +
        'Student already registered with this section');

    let tempSet = new Set(user.enrolledSections.map(enrolledSection=>{
        return enrolledSection.toString() }));


        if (tempSet.size !== user.enrolledSections.length)
        {
            console.log(err)
            next(err)

        }
    next();
});


UserSchema.methods.removeSectionId= function(sectionIdToUnroll,cb){

    console.log("UserSchema.methods.removeSectionId:......")
    const user = this;
    let unrolledSectionList = user.enrolledSections.filter((enrolledSectionId)=>{
        console.log(enrolledSectionId.toString() != sectionIdToUnroll.toString())
        return enrolledSectionId.toString() != sectionIdToUnroll.toString()
    })
    console.log('unrolled list : ')
    console.log(unrolledSectionList)
    user.enrolledSections =  unrolledSectionList;
    user.save().then(result => cb(result)).catch(err=>cb(err));

}

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

// User.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', UserSchema);
