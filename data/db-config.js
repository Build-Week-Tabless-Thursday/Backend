const knex = require('knex');
const secrets = require('../secrets/secrets.js');

const environment = secrets.environment || 'development';

const knexFile = require('../knexfile.js');

const config = knexFile[environment];

module.exports = knex(config);