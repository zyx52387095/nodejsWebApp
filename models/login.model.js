const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');




const loginschema = new schema({
    username: {
        type: String,
        required: true, /* built in validator  */
        minlength: 3,/* built in validator  */
        //unique: true, /* index */
        unique: true 
    },
    password: {
        type: String,
        required: true,/* built in validator  */
        minlength: 3, /* built in validator  */
        //validate: [stronly, 'non alpha char not allowed'] 
    },
    email: {
        type: String,
        required: true,/* built in validator  */
        minlength: 3, /* built in validator  */
        //validate: [stronly, 'non alpha char not allowed'] 
    },
    feedback: {
        type: String,
    }

});

loginschema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

//authenticate input against database????????????????
loginschema.statics.authenticate = function (username, password, callback) {
    Login.findOne({ username: username })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
}

//module.exports = mongoose.model("login", loginschema);

var Login = mongoose.model("login", loginschema);
module.exports = Login;