/**
 * Created by alex on 4/20/16.
 */
'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports.mongoDBinit = function(callback){
    MongoClient.connect('mongodb://127.0.0.1:27017/timeExchange', function (err, db) {
        module.exports.timeExchangeDB = db;
        
        callback(err);
    });
};

/**
 * will reuse connection if already created
 */
// function connect(callback) {
//     if (myDb === undefined) {
//         MongoClient.connect('mongodb://127.0.0.1:27017/timeExchange', function (err, db) {
//             if (err) {
//                 return callback(err);
//             }
//
//             myDb = db;
//             callback(null, db);
//         });
//     } else {
//         callback(null, myDb);
//     }
// }

/**
 * Use the db connection from our connect()
 */
// function doCount(err, db) {
//     if (err) { return console.log('errrrrrrrr!'); }
//     db.collection('smurfs').count({'color':'red'}, function afterCount(err, count) {
//         if (err) { return console.log('merror xmas'); }
//         console.log('There was ' + count + ' smurf(s)');
//     });
// }
//
// connect(doCount);


// var MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect('mongodb://localhost:27017/timeExchange', function(err, db) {
//     if(err) {
//         throw err;
//     }
//     db.collection('availableTime').find().toArray(function(err, result) {
//         if(err) {
//             throw err;
//         }
//
//         console.log(result);
//     });
// });

// var assert = require('assert');
//
// // Connection URL
// var url = 'mongodb://localhost:27017/myproject';
// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");
//
//     db.close();
// });

