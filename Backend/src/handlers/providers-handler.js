var mongojs = require('mongojs');
var db = mongojs(global.config.db);
var collection_providers = db.collection('providers');

var api_providers = {
    listAll: function (request, reply) {
        try {
            collection_providers.find((err, data) => {

                if (err) {
                    return reply({ err }).code(500);
                }

                return reply(data).code(200);
            });
        } 
        catch (e) {
            console.error('Error in api_providers(listAll) handler:', e);
            return reply(e).code(500);
        }
    },

    findById: function (request, reply) {
        try {
            collection_providers.findOne({_id: mongojs.ObjectId(request.params.id)}, (err, data) => {

                if (err) {
                    return reply({ err }).code(500);
                }

                if (!data) {
                    return reply({ code: 404, message: "Provider not found"}).code(404);
                }

                return reply(data).code(200);
            });
        } 
        catch (e) {
            console.error('Error in api_providers(findById) handler:', e);
            return reply(e).code(500);
        }
    },

    create: function (request, reply) {
        try {
            var provider = request.payload;
            collection_providers.save(provider, (err, data) => {

                if (err) {
                    return reply({ err }).code(500);
                }

                var provider_uri = request.info.host + '/provider/' + provider._id;
                return reply({ uri: provider_uri}).code(200);
            });
        } 
        catch (e) {
            console.error('Error in api_providers(create) handler:', e);
            return reply(e).code(500);
        }
    },

    update: function (request, reply) {
        try {
            collection_providers.update({_id: mongojs.ObjectId(request.params.id)}, {$set: request.payload}, function (err, data) {

                if (err) {
                    return reply({ err }).code(500);
                }

                if (!data) {
                    return reply({ code: 404, message: "Provider not found"}).code(404);
                }

                return reply(data).code(200);
            });

        } 
        catch (e) {
            console.error('Error in api_providers(update) handler:', e);
            return reply(e).code(500);
        }
    },

    delete: function (request, reply) {
        try {
            collection_providers.remove({_id: mongojs.ObjectId(request.params.id)}, function (err, data) {

                if (err) {
                    return reply({ err }).code(500);
                }

                if (!data) {
                    return reply({ code: 404, message: "Provider not found"}).code(404);
                }

                return reply({ code: 200, message: "Provider deleted"}).code(200);
            });
        } 
        catch (e) {
            console.error('Error in api_providers(delete) handler:', e);
            return reply(e).code(500);
        }
    }

};

module.exports = api_providers;
