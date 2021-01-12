const mysql = require('mysql');
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
    var sql = "SELECT * FROM user"
    connection.query(sql, function (err, results) {
      if (err) {
        console.log(err.code + "\n" + err.sqlMessage);
        resolve(err);
      }
      else {
        resolve(results);
      }
    });
  });
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
          resolve(err);
        }
        else if (err.code === "ER_BAD_DB_ERROR") {
          console.log(`Bad database name!`);
          resolve(err);
        }
        else {
          console.log("Other error!\n" + err);
          resolve(err);
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
