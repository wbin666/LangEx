/**
 * Created by alex on 5/24/16.
 */
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    console.log('LOGGED req.method: %s, req.url: %s, and req.path: %s.', req.method, req.url, req.path);
    next();
});

router.route('/availtime')
    .get(function(req, res){
        res.send('Got a GET request');
    })
    .post(function(req, res){
        res.send('Got a POST request');
    });

// router.get('/hello', function(req, res) {
//     var responseText = 'Hello Alex';
//     responseText += 'Requested at : ' + req.requestTime + '';
//     res.send(responseText);
// });
//
// router.post('/availtime', function(req, res){
//     res.send('Got a POST request');
// });
//
// router.put('/user', function(req, res) {
//     res.send('Got a PUT request at /user');
// });
//
// router.delete('/user', function(req, res) {
//     res.send('Got a DELETE request at /user');
// });

module.exports = router;