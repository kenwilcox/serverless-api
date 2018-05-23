const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function(context, req) {
    context.log('Javascript HTTP trigger function processed a request.');
    MongoClient.connect(process.env.CosmosDBURL, {auth: auth}, (err, database) => {
        if (err) throw err;
        console.log('Connected successfully');
        const db = database.db(process.env.CosmosDB);
        db.collection(process.env.CosmosDBCollection).find().toArray((err, result) => {
            if (err) throw err;
            console.log('This is a happy moment');
            result.forEach(hero => delete hero._id);
            context.res ={
                //status: 200,
                headers: {
                    "Content-Type": "text/json",
                },
                body: result
            };
            database.close();
            context.done();
        });
    });
};