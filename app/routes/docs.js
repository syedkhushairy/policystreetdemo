const swaggerJsdoc = require('swagger-jsdoc');

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Policy Demo',
      version: '1.0.0',
      description: 'Use management system',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'Info@SmartBear.com',
      },
    },
    components: {
      securitySchemes: {
        api_key: {
          type: 'apiKey',
          name: 'api_key',
          in: 'header',
        },
        petstore_auth: {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: 'http://example.org/api/oauth/dialog',
              scopes: {
                'write:pets': 'modify pets in your account',
                'read:pets': 'read your pets',
              },
            },
          },
        },
        bearer: {
          type: 'http',
          scheme: 'bearer',
        },
        JWT: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3500/api/v1',
      },
    ],
  },
  apis: [
    './app/models/users.js',
    './app/models/auth.js',
    './app/models/profile.js',
    './app/routes/api/users.js',
    './app/routes/api/auth.js',
    './app/routes/api/profile.js',
  ],
};
const specs = swaggerJsdoc(options);

module.exports = specs;
