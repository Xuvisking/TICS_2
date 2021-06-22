require('dotenv').config();
const { Pool } = require('pg');

const dbConecction = async () => {
    try {
        const pool = new Pool({
            host: 'localhost',
            user: 'postgres',
            password: process.env.DATABASEPASSWORD,
            database: process.env.DATABASE,
            port: process.env.DATABASEPORT
        });
        return pool;
    } catch (error) {
        console.log(error);
        throw new Error('Error en la bd');
    }
};

module.exports = {
    dbConecction
};