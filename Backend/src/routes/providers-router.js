var path = require('path');
var api_providers = require('../handlers/providers-handler.js');

module.exports = [
    {
        method: 'GET',
        path: '/providers',
        handler: api_providers.listAll,
        config: {
            tags: ['api'],
            description: 'The purpose of this service is to list all the providers'
        }
    },
    {
        method: 'GET',
        path: '/providers/{id}',
        handler: api_providers.findById,
        config: {
            tags: ['api'],
            description: 'The purpose of this service is to get a specific provider'
        }
    },
    {
        method: 'POST',
        path: '/providers',
        handler: api_providers.create,
        config: {
            tags: ['api'],
            description: 'The purpose of this service is to create a new provider'
        }
    },
    {
        method: 'PATCH',
        path: '/providers/{id}',
        handler: api_providers.update,
        config: {
            tags: ['api'],
            description: 'The purpose of this service is to update a provider'
        }
    },
    {
        method: 'DELETE',
        path: '/providers/{id}',
        handler: api_providers.delete,
        config: {
            tags: ['api'],
            description: 'The purpose of this service is to delete a provider'
        }
    }

];
