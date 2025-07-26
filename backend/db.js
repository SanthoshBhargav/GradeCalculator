const { MongoClient } = require('mongodb');

let dbConnection;
let MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/";

module.exports = {
    connectToDb: (cb) =>{
        console.log("Connecting to DB");
        MongoClient.connect(`${MONGO_URL}/SemCredits`)
        .then((client) =>{
            dbConnection = client.db();
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
    },
    getDb: () => dbConnection,
};