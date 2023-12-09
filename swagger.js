const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [
  path.resolve(__dirname, './swagger/swaggerInstall.js'),
  path.resolve(__dirname, './swagger/swaggerUsuario.js'),
  path.resolve(__dirname, './swagger/swaggerVinho.js'),

];

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Adega de Vinhos',
      version: '1.0.0',
      description: 'API para gerenciamento de vinhos em adega',
    },
  },
  apis: endpointsFiles,
};

const swaggerSpec = swaggerJsdoc(options);

fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2));

console.log('Documentação gerada com sucesso!');

