const users = require("../models/user.model");

//using save function
const save = function (req, res) {
    //add user to DB
    const ret = {};
    //data will be taken from body
    const newuser = new users(req.body);
    newuser.save(function (err, retobj) {
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "User added"
        }
        res.render("user", { data: ret });
    });

}

//using insert function
const insert = function (req, res) {
    //add user to DB
    const ret = {};
    //data will be taken from body
    users.create(req.body, function (err, retobj) {
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "User added"
        }
        res.render("user", { data: ret });
    });

}
const home = function (req, res) {
    const ret = {};
    res.render("user", { data: ret });
}

const findall = function (req, res) {
    users.find({}, function (err, retobj) {
        let ret = {};
        ret.users = retobj;
        res.render("userlist", { data: ret });
    });
}

const summary = function (req, res) {
    //similar to findall, with specific fields to select
    users.find({}, 'firstname lastname', function (err, retobj) {
        let ret = {};
        ret.users = retobj;
        res.render("userlist", { data: ret });
    });
}

const load = function (req, res) {
    const ret = {};
    users.findById(req.params.objid, function (err, retobj) {
        if (err) {
            ret.msg = err.message;
            res.render("user", { data: ret });
        } else {
            res.render("user", { data: retobj });
        }
    });
}
const del = function (req, res) {
    const ret = {};
    users.findByIdAndRemove(req.params.objid, function (err, obj) {
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "removed user"
        }
        res.json({ "msg": ret.msg });
    });
}

//use document.remove method which will cause 'pre' hook to be called
const del_hk = function (req, res) {
    const ret = {};
    users.findById(req.params.objid, function (err, retobj) {
        if (err) {
            ret.msg = err.message;
        } else {
            retobj.remove(function (err) {
                if (err) {
                    ret.msg = err.message;
                } else {
                    ret.msg = "removed user with hook";
                }
                res.json({ "msg": ret.msg });
            });
        }
    });
}

const updt = function (req, res) {
    const ret = {};
    users.findByIdAndUpdate(req.params.objid, req.body, function (err, user) {
        if (err) {
            ret.msg = err.message;
        } else {
            ret.msg = "updated user"
        }
        res.render("user", { data: ret });
    });
}

const findbysid = function (req, res) {
    const ret = {};
    //using statics method on the model - as helper method 
    users.findByStudentId(req.params.sid, function (err, retobj) {
        if (err) {
            ret.msg = err.message;
            res.render("user", { data: ret });
        } else {
            //calling instance method (defined in model) just to test invocation
            retobj.tester();
            res.render("user", { data: retobj });
        }
    });
}

module.exports = {
    "insert": insert, "home": home, "findall": findall, "summary": summary, "load": load,
    "delete": del, "updt": updt, "del_hk": del_hk, "findbysid": findbysid
}
