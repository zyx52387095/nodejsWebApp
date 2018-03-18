'use strict';
const express = require('express');
const router = express.Router();

const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({ extended: false });
const user = require('../controllers/users.controller');

router.use(function (req, res, next) {
    if(!req.session.username){
        res.send('you need to login first')
        //return res.redirect('/login');
        res.redirect('/login');
    }
    next()
})

//router.route('/').get(user.home);

/* GET users listing. */
//.get('/', function (req, res) {
//    res.send('respond with a resource');
//});

//router.get('/', user.home);

router.route('/').post(urlencodedparser, user.insert)
    .get(user.home);

router.get('/findall', user.findall);
router.get('/findall/summary', user.summary);
router.route('/:objid').get(user.load)
    .delete(user.delete);

router.delete('/hk/:objid', user.del_hk);
router.post('/update/:objid', urlencodedparser, user.updt);
router.get('/sid/:sid', user.findbysid);


module.exports = router;
