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
    servers: [
      {
        url: 'http://localhost:3500/api/v1',
      },
    ],
  },
  apis: [
    './app/models/users.js',
    './app/models/auth.js',
    './app/routes/api/users.js',
    './app/routes/api/auth.js',
  ],
};
const specs = swaggerJsdoc(options);

module.exports = specs;
