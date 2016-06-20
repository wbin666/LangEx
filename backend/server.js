/**
 * Created by alex on 4/20/16.
 */
'use strict';

var express = require('express');
var port = process.env.PORT || 3000;
var logger=require('./logger.js');
var routes=require('./routes.js');
var myMongo = require('./crud/dbConnect.js');

var morgan = require('morgan');
var errorHandler = require('errorhandler');

var app =express();



//for all environment
app.use(morgan('combined')); // or app.use(require('express-bunyan-logger')());  // more details when comparing to morgan
app.use(express.static(__dirname + '/../frontend'));  //app.use('/static',express.static(__dirname + '/../frontend'));

app.use('/', routes);

//It’s best to just exit and have your service manager/monitor restart the process.
process.on('uncaughtException', function (er) {
    logger.fatal({err: er}, "the application is going down for the uncaughtException.");
    process.exit(1);
});

//Attention: define error-handling middleware last, after other app.use() and routes calls;
//development only
//if(process.env.NODE_ENV ==='development') {
if(app.get('env') === 'development') {
    app.use(errorHandler);
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