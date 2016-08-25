/**
 * Created by alex on 4/20/16.
 */
'use strict';

var express = require('express');

var port = process.env.PORT || 3000;
var logger=require('./../util/logger.js');
var apiRoutes=require('./timemanagersrv/timeManagerApiRoutes.js');

var myMongo = require('./dbConnect.js');

// var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
// var authenticateRoutes = require('./authenticateRoutes.js');
//
// // Configure the local strategy for use by Passport.
// //
// // The local strategy require a `verify` function which receives the credentials
// // (`username` and `password`) submitted by the user.  The function must verify
// // that the password is correct and then invoke `cb` with a user object, which
// // will be set at `req.user` in route handlers after authentication.
// passport.use(new localStrategy(
//     {
//         usernameField: 'email',
//         passwordField: 'passwd'
//     },
//     function(username, password, cb) {
//         db.users.findByUsername(username, function(err, user) {
//             if (err) { return cb(err); }
//             if (!user) { return cb(null, false, { message: 'Incorrect username.' }); }
//             if (user.password != password) { return cb(null, false, { message: 'Incorrect password.' }); }
//             return cb(null, user);
//         });
//     }));
//
//
// // Configure Passport authenticated session persistence.
// //
// // In order to restore authentication state across HTTP requests, Passport needs
// // to serialize users into and deserialize users out of the session.  The
// // typical implementation of this is as simple as supplying the user ID when
// // serializing, and querying the user record by ID from the database when
// // deserializing.
// passport.serializeUser(function(user, cb) {
//     cb(null, user.id);
// });
//
// passport.deserializeUser(function(id, cb) {
//     db.users.findById(id, function (err, user) {
//         if (err) { return cb(err); }
//         cb(null, user);
//     });
// });


var app =express();



//for all environment
app.use(require('morgan')('combined')); // or app.use(require('express-bunyan-logger')());  // more details when comparing to morgan

app.use(require('cookie-parser')());
//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
// app.use(passport.initialize());
// app.use(passport.session());
//
// app.use('/auth', authenticateRoutes);
app.use('/api', apiRoutes);

app.use(express.static(__dirname + '/../frontend'));  //app.use('/static',express.static(__dirname + '/../frontend'));

//the fix for angularjs routing and express routing
//http://stackoverflow.com/questions/20396900/angularjs-routing-in-expressjs?rq=1
//http://stackoverflow.com/questions/37052697/angularjs-and-express-routing-separation
//http://stackoverflow.com/questions/24032603/angularjs-routing-on-an-express-4-0-backend-api?rq=1
//http://stackoverflow.com/questions/29936224/page-reload-fails-when-using-angular-ui-router-with-html5-mode-enabled?noredirect=1
app.all('/*', function(req, res) {
    res.sendFile('/frontend/index.html', {'root': __dirname + '/..'});
});

//It’s best to just exit and have your service manager/monitor restart the process.
process.on('uncaughtException', function (er) {
    logger.fatal({err: er}, "the application is going down for the uncaughtException.");
    process.exit(1);
});

//Attention: define error-handling middleware last, after other app.use() and routes calls;
//development only
//if(process.env.NODE_ENV ==='development') {
if(app.get('env') === 'development') {
    app.use(require('errorhandler'));
    //app.use(require('express-bunyan-logger').errorLogger());
}

myMongo.mongoDBinit(function(err) {
    if(err) {
        logger.error({err: err}, "App failed to get started because it failed to connect to database");
    }else{
        logger.info("Connected to MongoDB database : " + myMongo.langExDB.databaseName);

        app.listen(port, function() {
            logger.info("This env is for " + process.env.NODE_ENV);
            logger.info("LangExchange app listening on port : " + port);
        });
    }
});

//It’s best to just exit and have your service manager/monitor restart the process.
// var nodemailer = require('nodemailer')
// var transport = nodemailer.createTransport('SMTP', { // [1]
//     service: "Gmail",
//     auth: {
//         user: "gmail.user@gmail.com",
//         pass: "userpass"
//     }
// })
//
// if (process.env.NODE_ENV === 'production') { // [2]
//     process.on('uncaughtException', function (er) {
//         console.error(er.stack) // [3]
//         transport.sendMail({
//             from: 'alerts@mycompany.com',
//             to: 'alert@mycompany.com',
//             subject: er.message,
//             text: er.stack // [4]
//         }, function (er) {
//             if (er) console.error(er)
//             process.exit(1) // [5]
//         })
//     })
// }