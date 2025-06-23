const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bansal@12',
  database: 'user_auth',
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

module.exports = db;
