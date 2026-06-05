const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'lateron_db',
  password: 'Rifqi123',
  port: 5432,
});

module.exports = pool;