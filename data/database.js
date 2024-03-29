﻿// database.js

(function (database) {
    var mongodb = require("mongodb");
    //var mongoUrl = "mongodb://localhost:27017/theBoard";
    var mongoUrl = "mongodb://psdev:psdev@ds051170.mongolab.com:51170/theboard";
    var theDb = null;

    database.getDb = function(next) {
        if (!theDb) {
            //connect to the database
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        notes: db.collection("notes"),
                        users: db.collection("users")
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }
    };

})(module.exports);