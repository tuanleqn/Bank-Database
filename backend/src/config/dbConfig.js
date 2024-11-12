const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bank'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Đã kết nối đến MySQL');
});

module.exports = db;
