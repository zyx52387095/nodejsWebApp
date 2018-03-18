
const loginData = require("../models/login.model");

const insert = function (req, res) {
    //password confirmtion check
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }
    //take body as data
    if (req.body.email &&
        req.body.username &&
        req.body.password
    ) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,

        }
        //password confirm check


        //use schema.create to insert data into the db
        loginData.create(userData, function (err, user) {
            if (err) {
                //error message returned in a different way?
                return next(err);

            } else {
                //add session user.id
                //req.session.userId = user._id;
                return res.redirect('/login');
            }
        });
    }
}
const home = function (req, res) {
    const ret = {};
    res.render("register", { data: ret });
}


//password match check
const passwordMatchcheck = function (req, res, next) {
    loginData.authenticate(req.body.username, req.body.password, function (error, user) {
        if (error || !user) {
            var err = new Error('Wrong username or password.');
            err.status = 401;
            return next(err);
        } else {
            req.session.user=user;
            //add user to session
            //req.session.userId = user._id;
            return res.redirect('/feedback');
        }
    })
};




module.exports = { "addUser": insert, "home": home, "passwordMatchcheck": passwordMatchcheck };