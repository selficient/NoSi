var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/selficientTest';
// Use connect method to connect to the server
function connect(callback){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        callback(db);
        db.close();
    });
}

function insert(dbName, item ,callback) {
    connect(db => {
        let collection = db.collection(dbName);
        collection.insertOne(item, function(err, result) {
            callback(result);
        });
    });
}

function find(dbName, query, callback){
    connect(db =>{
        let collection = db.collection(dbName);
        collection.find(query).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
        });
    });
}

function update(dbName, query, newObj, callback){
    connect(db=>{
        let collection = db.collection(dbName);
        collection.updateOne(query, newObj, (err, docs) => {
            if(!err){
                callback("success");
            }
        });
    });
}
module.exports.insert = insert;
module.exports.find = find;
module.exports.update = update;
