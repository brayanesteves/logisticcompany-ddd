const mysql = require('mysql');

const dbConnect_MySQL = mysql.createConnection({
        host: 'localhost',
        user: 'root',
    password: '1234',
    database: 'MIPSS_',
        port: '3306'
});

dbConnect_MySQL.connect(err => {
    if(err) {
        console.error('Error DB: ', err);
        return;
    } else {
        console.info(' DB OK');
    }
});

module.exports = dbConnect_MySQL;