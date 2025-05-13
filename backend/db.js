const { MongoClient } = require('mongodb');

let dbConnection;
let MONGO_URL = 'mongodb+srv://GSB:Qwertyuiop@semcredits.wxfjjgd.mongodb.net';

module.exports = {
    connectToDb: (cb) =>{
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