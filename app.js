'use strict';
const debug = require('debug');
const express = require('express');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const session = require('express-session');


//config files env or prod
const env = process.env.DEPLOY || "dev";
const conf = require('./config/' + env + ".json");

const mongoose = require('mongoose');
const routes = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const feedback = require('./routes/feedback');


const app = express();

app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));

// view engine setup to ejs.
app.set('view engine', 'ejs');
//
app.use("/public", express.static(__dirname+'/public'));

//Create the database connection
mongoose.connect(conf.dburl);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/feedback', feedback);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//session
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));


app.listen(conf.port);

//var server = app.listen(app.get('port'), function () {
//    debug('Express server listening on port ' + server.address().port);
//});

console.log("app started on port ", conf.port);