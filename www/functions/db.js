const { Pool } = require('pg');
require('dotenv').config();

// Konfiguracja połączenia z bazą PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: 'webaria.company',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

module.exports = pool;