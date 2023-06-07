const { Pool } = require('pg')

const config = {
    user: 'root',
    host: '',
    database: 'mipss_',
    password: '1234',
    port: 5432,
}
const pool = new Pool(config)

module.exports = pool;