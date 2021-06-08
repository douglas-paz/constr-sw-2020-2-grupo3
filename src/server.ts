import express from 'express';
import cors from 'cors';
import routes from './routes';
import database from './database/database';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));
app.use(routes);

const ENV = process.env.NODE_ENV || 'development';
console.log(`ENV: ${ENV}`);

const MONGODB_URL = process.env.MONGODB_URL || '0.0.0.0';
database(MONGODB_URL);

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on: http://0.0.0.0:${port}`);
});

require('express-swagger-generator')(app)({
  swaggerDefinition: {
    info: {
      description: 'API de Avaliações',
      title: 'Swagger',
      version: '1.0.0',
    },
    basePath: '',
    produces: [],
    schemes: ['http', 'https'],
  },
  basedir: __dirname,
  files: ['./routes.ts'],
});
