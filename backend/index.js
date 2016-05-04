/**
 * Created by alex on 4/20/16.
 */
var express = require('express');
var app =express();


var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};


var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};


app.use(express.static(__dirname + '/../frontend'));
console.log("__dirname is : " + __dirname);

app.use(myLogger);
app.use(requestTime);

app.get('/', function(req, res) {
    var responseText = 'Hello Alex';
    responseText += 'Requested at : ' + req.requestTime + '';
    res.send(responseText);
});

app.post('/', function(req, res){
   res.send('Got a POST request');
});

app.put('/user', function(req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/user', function(req, res) {
    res.send('Got a DELETE request at /user');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});