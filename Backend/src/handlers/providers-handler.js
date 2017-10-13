const co = require('co');
var mongojs = require('mongojs');
var db = mongojs(global.config.db);
var collection_providers = db.collection('providers');

var api_providers = {
    listAll: function (request, reply) {
        return co(function* () {
            try {
                collection_providers.find((err, data) => {

                    if (typeof err !== "undefined" && err !== null) {
                        return reply({ err }).code(500).type('application/json');
                    }

                    return reply(data).code(200).type('application/json');
                });
            } 
            catch (e) {
                console.error('Error in api_providers(listAll) handler:', e);
                return reply(e).code(500).type('application/json');
            }
        });
    },

    findById: function (request, reply) {
        return co(function* () {
            try {
                collection_providers.findOne({_id: mongojs.ObjectId(request.params.id)}, (err, data) => {

                    if (typeof err !== "undefined" && err !== null) {
                        return reply({ err }).code(500).type('application/json');
                    }

                    if (!data) {
                        return reply({ code: 404, message: "Provider not found"}).code(404).type('application/json');
                    }

                    return reply(data).code(200).type('application/json');
                });
            } 
            catch (e) {
                console.error('Error in api_providers(findById) handler:', e);
                return reply(e).code(500).type('application/json');
            }
        });
    },

    create: function (request, reply) {
        return co(function* () {
            try {
                var provider = request.payload;
                collection_providers.save(provider, (err, data) => {

                    if (typeof err !== "undefined" && err !== null) {
                        return reply({ err }).code(500).type('application/json');
                    }

                    return reply(provider).code(200).type('application/json');
                });
            } 
            catch (e) {
                console.error('Error in api_providers(create) handler:', e);
                return reply(e).code(500).type('application/json');
            }
        });
    },

    update: function (request, reply) {
        return co(function* () {
            try {
                collection_providers.update({_id: mongojs.ObjectId(request.params.id)}, {$set: request.payload}, function (err, data) {

                    if (typeof err !== "undefined" && err !== null) {
                        return reply({ err }).code(500).type('application/json');
                    }

                    if (!data) {
                        return reply({ code: 404, message: "Provider not found"}).code(404).type('application/json');
                    }

                    return reply(data).code(200).type('application/json');
                });

            } 
            catch (e) {
                console.error('Error in api_providers(update) handler:', e);
                return reply(e).code(500).type('application/json');
            }
        });
    },

    delete: function (request, reply) {
        return co(function* () {
            try {
                collection_providers.remove({_id: mongojs.ObjectId(request.params.id)}, function (err, data) {

                    if (typeof err !== "undefined" && err !== null) {
                        return reply({ err }).code(500).type('application/json');
                    }

                    if (!data) {
                        return reply({ code: 404, message: "Provider not found"}).code(404).type('application/json');
                    }

                    return reply({ code: 200, message: "Provider deleted"}).code(200).type('application/json');
                });
            } 
            catch (e) {
                console.error('Error in api_providers(delete) handler:', e);
                return reply(e).code(500).type('application/json');
            }
        });
    }

};

module.exports = api_providers;
