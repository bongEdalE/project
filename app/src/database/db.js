const mysql = require('mysql');
const db =mysql.createConnection({
    host : 'db-esq31.pub-cdb.ntruss.com',
    user : 'danny415890',
    password : 'bg9mt1zw@',
    database : 'donghyun',
    multipleStatements: true,
})

db.connect();

module.exports = db;
