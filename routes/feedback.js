'use strict';
const express = require('express');
const router = express.Router();

const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({ extended: false });
const feedbacks = require('../controllers/feedback.controller');

router.get('/', function (req, res) {
    res.render("feedback");
});

router.post('/', function(req, res){
    res.render("thankyou")
});

router.get('/thankyou', function(req, res){
    res.render("thankyou")
});


router.route('/thankyou').post(urlencodedparser, feedbacks.update);

module.exports = router;