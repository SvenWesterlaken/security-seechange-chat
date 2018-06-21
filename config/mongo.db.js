const mongoose = require('mongoose');
const config = require('./env/env');

mongoose.connect(`${config.mongo.host}/${config.mongo.database}`, config.mongo.options).catch(err => console.warn('Could not connect to MongoDB'));

const connection = mongoose.connection
    .once('open', () => console.log('Connected to ' + config.mongo.database))
    .on('error', (err) => console.log(err));

module.exports = connection;
