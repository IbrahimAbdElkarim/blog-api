const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const glob = require('glob');

// Define the pattern for the route files
const routePattern = './src/**/*/**/*Routes.js';

// Get all files matching the pattern
const routeFiles = glob.sync(routePattern);
const url = process.env.BASE_URL || `http://localhost:3030`;

const options = {
  definition: {
    openapi: '3.0.0',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    servers: [
      {
        url
      }
    ]
  },
  apis: [...routeFiles]
};

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.get('/api-docs/api.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
