const mysql = require('mysql')
const dotenv = require('dotenv').config({ path: __dirname + '../../../.env' });

const connection = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Tabela user
const showUsers = () => {
  return new Promise(function (resolve) {
    connection.query('SELECT * FROM user', function (error, results) {
      if (error) throw error;
      resolve(results);
    });
  })
}

const createUser = (body) => {
  return new Promise(function (resolve) {
    const username = body.name;

    var sql = "INSERT INTO user (username) VALUES (?)";
    var values = username;

    connection.query(sql, [values], function (err) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log(`Username ${values} already exists. Choose a different one!`);
          resolve(`Username ${values} already exists. Choose a different one!`);
        }
        else if (err.code === "ER_BAD_DB_ERROR") {
          console.log(`Bad database name!`);
          resolve("Bad database name!");
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
