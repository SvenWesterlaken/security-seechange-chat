const dotenv = require('dotenv');
const env = {
    port: process.env.PORT || 1337,
    dbHost: process.env.DB_HOST || 'ds161520.mlab.com',
    dbPort: process.env.DB_PORT || '61520',
    dbUser: process.env.DB_USER || 'thijsvanmarle',
    dbPassword: process.env.DB_PASSWORD || 'Welkom123',
    dbDatabase: process.env.DB_DATABASE || 'seechat',
};

result = dotenv.config();

const link = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase;


env.truYou_api = process.env.TRUYOU_API || 'localhost';
env.truYou_api_port = process.env.TRUYOU_API_PORT || 3000;

module.exports = {
    env,
    link
};