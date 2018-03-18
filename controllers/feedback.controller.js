const feedbacks = require("../models/login.model");


const updt = function(req, res){
    if(req.body.feedback){
        var currentUser = req.session.user.username;
        var newFeedback = req.body.feedback;    
    const ret = {};
    feedbacks.update({username:currentUser},{$set:{feedback:newFeedback}},function(err,feedback){
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "feedback submitted"
        }
        res.render("thankyou", { fb: newFeedback });
        //res.redirect('/feedback/thankyou');
    });
}}

const update = function(req, res){
    if(req.body.feedback){
        var currentUser = req.session.user.username;
        var newFeedback = req.body.feedback;    

        feedbacks.findOneAndUpdate({username:currentUser},{$set:{feedback:newFeedback}},function(err,feedback){
            if (err) {
                res.send(err.message)
                //ret.msg = err.message;
            } else {
                //ret.msg = "feedback submitted"
            }
            //res.render("thankyou");
            //res.redirect('/feedback/thankyou');
        });
        res.render("thankyou");
    }}


const home = function (req, res) {
    const ret = {};
    res.render("feedback", { data: ret });
}

module.exports = { "update": update, "home":home, "updt":updt };