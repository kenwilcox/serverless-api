const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function (context, req) {
    MongoClient.connect(process.env.CosmosDBURL, { auth: auth }, (err, database) => {
        if (err) throw err;
        let hero = ({ id, name, saying } = req.body);
        context.log("hero.id:" + hero.id);
        context.log("hero.name:" + hero.name);
        context.log("hero.saying:" + hero.saying);
        var db = database.db(process.env.CosmosDB);
        db.collection(process.env.CosmosDBCollection).insertOne(
            {
                id: hero.id,
                name: hero.name,
                saying: hero.saying
            }, 
            (err, result) => {
                if (err) throw err;
                context.res = {
                    body: hero
                };
                database.close();
                context.done();
            });
    });
};