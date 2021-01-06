const mysql = require('mysql')
const dotenv = require('dotenv');
dotenv.config();
const database_port = process.env.database_port;

const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password: '',
  port: database_port,
});


console.log(`Your port is ${database_port}`);


// Tabela user
const showUsers = () => {
  return new Promise(function(resolve) {
    connection.query('SELECT * FROM user', function (error, results) {
      if (error) throw error;
      resolve(results);
    });
  }) 
}

const createUser = (body) => {
  return new Promise(function(resolve) {
    const username = body.name;

    var sql = "INSERT INTO user (username) VALUES (?)";
    var values = username;

    connection.query(sql, [values], function(err) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log(`Username ${values} already exists. Choose a different one!`);
          resolve(`Username ${values} already exists. Choose a different one!`);
        }
        else {
          throw err;
        } 
      }
      else {
        console.log(`A new user has been added: ${values}`);
        resolve(`A new user has been added: ${values}`);
      }
      
    });
  });
}

module.exports = {
  showUsers,
  createUser,
}
