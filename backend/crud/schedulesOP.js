/**
 * Created by alex on 6/8/16.
 */
'use strict';

var myMongo = require('./crud/dbConnect.js');

function insertSchedule(db, schData, callback){
    db.collection("availSchedules").insertOne(schData, function(err, result){
        if(err) throw new Error("Failed to insert a schedule : " + JSON.stringify(schData));

        callback(result);
    });
}