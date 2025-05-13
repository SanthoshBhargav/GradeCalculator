const { MongoClient } = require('mongodb');

let dbConnection;
let MONGO_URL = 'mongodb+srv://santhoshbhargav:49lvx3c9@semcredits.wxfjjgd.mongodb.net';

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