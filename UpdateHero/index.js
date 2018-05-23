const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function (context, req) {
    MongoClient.connect(process.env.CosmosDBURL, { auth: auth }, (err, database) => {
        if (err) throw err;
        const db = database.db(process.env.CosmosDB);
        let hero = ({ id, name, saying } = req.body);
        console.log("hero.id:" + hero.id);
        console.log("hero.name:" + hero.name);
        console.log("hero.saying:" + hero.saying);
        let heroId = req.params.id;
        db.collection(process.env.CosmosDBCollection).findOneAndUpdate(
            { id: heroId },
            { $set: { id: hero.id, name: hero.name, saying: hero.saying } },
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