require('dotenv').config();
const {promisify} = require('util');
const { Pool } = require('pg');


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '9184747',
    database: 'SCChileDB',
    port: 5432
});


pool.query = promisify(pool.query);

module.exports = pool;