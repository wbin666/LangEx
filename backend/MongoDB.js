/**
 * Created by alex on 4/20/16.
 */
'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
    if(err) {
        throw err;
    }
    db.collection('mammals').find().toArray(function(err, result) {
        if(err) {
            throw err;
        }

        console.log(result);
    });
});
