/**
 * Created by alex on 5/24/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({extended : false});
var router = express.Router();

var availtimeHandler=require('./handler/availTimeHandler');
var logger = require('./logger.js');
var myMongo = require('./crud/dbConnect.js');

// for development
// if(process.env.NODE_ENV ==='development') {
//     router.use(function (req, res, next) {
//         logger.info('LOGGED req.method: %s, req.url: %s, req.path: %s, POST body: %s, Routing Parameters: %s, and GET QueryString: %s ', req.method, req.url, req.path, req.body, JSON.stringify(req.params), JSON.stringify(req.query));
//         next();
//     });
// }

router.route('/openAvailTime')
    .get(function(req, res, next){
        logger.info("I've got the GET request for openAvailTime");
        res.send('Got a GET request');
        //next(new Error('GET handler not implemented'));
    })
    .post(jsonParser, availtimeHandler.saveAvailTime);
        // function(req, res){
        // logger.info("I've got the POST request for openAvailTime");
        // if(!req.body) return res.sendStatus(400);
        //
        // logger.info("the received PostData is : " + JSON.stringify(req.body));
        //
        // myMongo.langExDB.collection("availableSchedules").insertOne(req.body, function(err, result){
        //     if(err) throw new Error("Failed to insert a schedule : " + JSON.stringify(req.body));
        //
        //     logger.info("Inserted a schedule : " + JSON.stringify(req.body));
        // });
        //
        // res.send('Got a POST request');
    // });


    // .put(function(req, res, next) {
    //     next(new Error('not implemented'));
    // })
    // .delete(function(req, res, next) {
    //     next(new Error('not implemented'));
    // });

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