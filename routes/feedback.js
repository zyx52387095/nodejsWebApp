'use strict';
const express = require('express');
const router = express.Router();

const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({ extended: false });
const feedbacks = require('../controllers/feedback.controller');

router.get('/', function (req, res) {
    res.render("feedback", { a: req.session.user.username });
});

router.post('/', function(req, res){
    //res.render("thankyou",{ a: req.session.user.username });
    feedbacks.updt
});


module.exports = router;