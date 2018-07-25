const   mongoose = require('mongoose');
const   Schema = mongoose.Schema;
const   bcrypt = require('bcrypt');
const   SALT_WORK_FACTOR = 10;

// var passportLocalMongoose = require('passport-local-mongoose');


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

    enrolledSections    : {type : [Number] ,default : []}
});

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



UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



// User.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', UserSchema);
