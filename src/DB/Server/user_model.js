const mysql = require('mysql')
const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password: '',
  port: 3306,
});

const getUsers = () => {
  return new Promise(function(resolve) {
    connection.query('SELECT * FROM user', function (error, results) {
      if (error) throw error;
      resolve(results);
    });
  }) 
}

module.exports = {
  getUsers,
}
