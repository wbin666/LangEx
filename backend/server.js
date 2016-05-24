/**
 * Created by alex on 4/20/16.
 */
var express = require('express');
var app =express();
var port = process.env.PORT || 3000;
var routes=require('./routes.js');

// var requestTime = function (req, res, next) {
//     req.requestTime = Date.now();
//     next();
// };

// var myLogger = function (req, res, next) {
//     console.log('LOGGED req.method: %s, req.url: %s, and req.path: %s.', req.method, req.url, req.path);
//     next();
// };

//app.use(myLogger);
//app.use(requestTime);

//app.use('/static',express.static(__dirname + '/../frontend'));
app.use(express.static(__dirname + '/../frontend'));
console.log("__dirname is : " + __dirname);

app.use('/', routes);

app.listen(port, function() {
    console.log("Example app listening on port : " + port);
});