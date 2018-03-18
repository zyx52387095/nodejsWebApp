const feedbacks = require("../models/login.model");


const updt = function (req, res) {
    if (req.body.feedback
    ) {
        var userData = {
            feedback: req.body.feedback
        }
    const ret = {};
    feedbacks.findByIdAndUpdate(req.session.username, req.body, function (err, feedback) {
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "feedback submitted"
        }
        //res.render("thankyou", { data: ret });
        res.redirect('/feedback/thankyou');
    });
}}

const update = function(req, res){
    if(req.body.feedback){
        var currentUser = req.session.user.username;
        var newFeedback = req.body.feedback;    
    const ret = {};
    feedbacks.findOneAndUpdate({username:currentUser},{$set:{feedback:newFeedback}},function(err,feedback){
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "feedback submitted"
        }
        res.render("thankyou", { fb: newFeedback });
        //res.redirect('/feedback/thankyou');
    });
}}



const home = function (req, res) {
    const ret = {};
    res.render("feedback", { data: ret });
}

module.exports = { "update": update, "home":home };