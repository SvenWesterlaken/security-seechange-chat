const dotenv = require('dotenv');

result = dotenv.config();

const env = {
  port: process.env.PORT || 1337,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbDatabase: process.env.DB_DATABASE || 'seechat',
};

// For thijs to copy into .env
// const env = {
//     port: process.env.PORT || 1337,
//     dbHost: process.env.DB_HOST || 'ds161520.mlab.com',
//     dbPort: process.env.DB_PORT || '61520',
//     dbUser: process.env.DB_USER || 'thijsvanmarle',
//     dbPassword: process.env.DB_PASSWORD || 'Welkom123',
//     dbDatabase: process.env.DB_DATABASE || 'seechat',
// };

const link = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase;


env.truYou_api = process.env.TRUYOU_API || 'localhost';
env.truYou_api_port = process.env.TRUYOU_API_PORT || 3000;

env.mongo = {
  host: process.env.MONGO_HOST || 'mongodb://127.0.0.1',
  database: process.env.MONGO_DB || 'seechat',
  test: process.env.MONGO_TEST || 'seechat-test',
  options: {
    poolSize: 10,
    user: process.env.MONGO_USER || '',
    pass: process.env.MONGO_PASS || ''
  }
};

module.exports = env, link;
