const MongoClient = require('mongodb').MongoClient;
const auth = require('../shared/index');
module.exports = function (context, req) {
    MongoClient.connect(process.env.CosmosDBURL, { auth: auth }, (err, database) => {
        if (err) throw err;
        const db = database.db(process.env.CosmosDB);
        let hero = ({ id, name, saying } = req.body);
        context.log("hero.id:" + hero.id);
        context.log("hero.name:" + hero.name);
        context.log("hero.saying:" + hero.saying);
        let heroId = req.params.id;
        db.collection(process.env.CosmosDBCollection).findOneAndDelete(
            { id: heroId },            
            (err, result) => {
                if (err) throw err;
                context.res = {
                    body: {message:'Hero deleted successfully!'}
                };
                database.close();
                context.done();
            });
    });
};