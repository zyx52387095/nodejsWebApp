'use strict';
var express = require('express');
var router = express.Router();

const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({ extended: false });
const register = require('../controllers/register.controller');



//to login page
router.get('/', function (req, res) {
    res.render("login");
});


router.route('/').post(urlencodedparser, register.passwordMatchcheck);

router.get('/register', function (req, res) {
    res.render("register");
});

router.route('/register').post(urlencodedparser, register.addUser);

//Get /logout when logout button clicked, currently not used
router.get('/logout', function (req, res, next) {
    if (req.session) {
        //delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

//middle ware that requires login for certain pages.
var requiresLogin = function(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}


module.exports = router;